import { combineReducers, AnyAction } from 'redux';
import keyBy from 'lodash.keyby';
import { Auth, Dispute, Review, Task } from '../models/data-models';
import * as ACTIONS from '../constants/actions';
import {
  DisputesState,
  ErrorState,
  ReviewsState,
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

const addOneTaskToStore = (task: Task, state: TasksState): TasksState => {
  return keyBy(
    {
      ...state,
      [task.id!]: task,
    },
    'id'
  ) as TasksState;
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
        return addOneTaskToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.GET_SINGLE_TASK:
      if (action.payload) {
        return addOneTaskToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.UPDATE_TASK:
      if (action.payload) {
        return addOneTaskToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.DELETE_TASK:
      if (action.payload) {
        const taskId: string = action.payload;
        let { [taskId]: omit, ...rest } = state as TasksState;
        return keyBy(rest, 'id');
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

const addOneReviewToStore = (
  review: Review,
  state: ReviewsState
): ReviewsState => {
  return keyBy(
    {
      ...state,
      [review.id]: review,
    },
    'id'
  ) as ReviewsState;
};

const reviewsReducer = (state = {}, action: AnyAction): ReviewsState => {
  switch (action.type) {
    case ACTIONS.GET_REVIEWS:
      if (action.payload) {
        return keyBy(action.payload.res, 'id') as ReviewsState;
      }
      return state;
    case ACTIONS.GET_SINGLE_REVIEW:
      if (action.payload) {
        return addOneReviewToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.CHANGE_REVIEW:
      if (action.payload) {
        return addOneReviewToStore(action.payload.res, state);
      }
      return state;
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

const addOneDisputeToStore = (
  dispute: Dispute,
  state: DisputesState
): DisputesState => {
  return keyBy(
    {
      ...state,
      [dispute.reviewId]: dispute,
    },
    'reviewId'
  ) as DisputesState;
};

const disputesReducer = (state = {}, action: AnyAction): DisputesState => {
  switch (action.type) {
    case ACTIONS.GET_DISPUTES:
      if (action.payload) {
        return keyBy(action.payload.res, 'reviewId') as DisputesState;
      }
      return state;
    case ACTIONS.ADD_DISPUTE:
      if (action.payload) {
        return addOneDisputeToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.GET_SINGLE_DISPUTE:
      if (action.payload) {
        return addOneDisputeToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.ACCEPT_DISPUTE:
      if (action.payload) {
        return addOneDisputeToStore(action.payload.res, state);
      }
      return state;
    case ACTIONS.REJECT_DISPUTE:
      if (action.payload) {
        return addOneDisputeToStore(action.payload.res, state);
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  auth: userAuthReducer,
  reviews: reviewsReducer,
  disputes: disputesReducer,
  error: errorReducer,
});
