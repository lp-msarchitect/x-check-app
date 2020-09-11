import { combineReducers, AnyAction } from 'redux';
import keyBy from 'lodash.keyby';
import * as ACTIONS from '../constants/actions';
import { ReviewsState, TasksState, UsersState } from '../models/redux-models';

const tasksReducer = (state = {}, action: AnyAction): TasksState => {
  switch (action.type) {
    case ACTIONS.GET_TASKS:
      if (action.payload) {
        return keyBy(action.payload.res, 'id') as TasksState;
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

export default combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  reviews: reviewsReducer,
});
