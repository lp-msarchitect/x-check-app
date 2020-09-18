import { combineReducers, AnyAction } from 'redux';
import keyBy from 'lodash.keyby';
import { Auth, Task, ReviewRequest } from '../models/data-models';
import * as ACTIONS from '../constants/actions';
import {
  ErrorState,
  ReviewsState,
  ReviewRequestsAppState,
  TasksState,
  UsersState,
} from '../models/redux-models';

const userAuthReducer = (
  state = {
    githubId: '',
    roles: [],
    isLoading: false,
    isShowRoleSelector: false,
  },
  action: AnyAction
): Auth => {
  switch (action.type) {
    case ACTIONS.LOGIN_STARTED:
      return { ...state, isLoading: true };
    case ACTIONS.LOGIN_CHOSE_ROLE:
      return {
        ...state,
        githubId: action.payload.githubId,
        isShowRoleSelector: true,
        isLoading: false,
      };
    case ACTIONS.LOGIN:
      return {
        ...state,
        isShowRoleSelector: false,
        isLoading: false,
        githubId: action.payload.githubId,
        roles: action.payload.roles,
      };
    case ACTIONS.LOGOUT:
      return { ...state, githubId: '', roles: [], isLoading: false };
    default:
      return state;
  }
};

const tasksReducer = (state = {}, action: AnyAction): TasksState => {
  switch (action.type) {
    case ACTIONS.GET_TASKS:
      if (action.payload) {
        return keyBy(action.payload.res, 'id') as TasksState;
      }
      return state;
    case ACTIONS.CREATE_TASK:
      if (action.payload) {
        return keyBy(
          {
            ...state,
            [action.payload.res.id]: action.payload.res as Task,
          },
          'id'
        ) as TasksState;
      }
      return state;
    default:
      return state;
  }
};

const usersReducer = (state = {}, action: AnyAction): UsersState => {
  switch (action.type) {
    case ACTIONS.GET_USERS:
      if (action.payload) {
        return keyBy(action.payload.res, 'githubId') as UsersState;
      }
      return state;
    default:
      return state;
  }
};

const reviewsReducer = (state = {}, action: AnyAction): ReviewsState => {
  switch (action.type) {
    case ACTIONS.GET_REVIEWS:
      if (action.payload) {
        return keyBy(action.payload.res, 'id') as ReviewsState;
      }
      return state;
    default:
      return state;
  }
};

const requestsReducer = (
  state = {},
  action: AnyAction
): ReviewRequestsAppState => {
  switch (action.type) {
    case ACTIONS.GET_REVIEW_REQUESTS:
      if (action.payload) {
        return keyBy(action.payload.res, 'id') as ReviewRequestsAppState;
      }
      return state;
    case ACTIONS.ADD_REVIEW_REQUEST:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

const errorReducer = (state = null, action: AnyAction): ErrorState => {
  if (action.type === ACTIONS.ADD_ERROR) {
    return action.error.message;
  }
  if (action.type === ACTIONS.HIDE_ERROR) {
    return null;
  }
  return state;
};

export default combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  auth: userAuthReducer,
  reviews: reviewsReducer,
  reviewRequests: requestsReducer,
  error: errorReducer,
});
