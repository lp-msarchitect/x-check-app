import { combineReducers, AnyAction } from 'redux';
import { Task, User } from '../models/data-models';
import * as ACTIONS from '../constants/actions';

const userAuthReducer = (
  state = { githubId: '', roles: [] },
  action: AnyAction
): User => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        githubId: action.payload.githubId,
        roles: action.payload.roles,
      } as User;
    case ACTIONS.LOGOUT:
      return { githubId: '', roles: [] } as User;
    default:
      return state;
  }
};

const tasksReducer = (state = [], action: AnyAction): Task[] => {
  switch (action.type) {
    case ACTIONS.GET_TASKS:
      if (action.payload) {
        return action.payload.res as Task[];
      }
      return state;
    default:
      return state;
  }
};

const usersReducer = (state = [], action: AnyAction): User[] => {
  switch (action.type) {
    case ACTIONS.GET_USERS:
      if (action.payload) {
        return action.payload.res as User[];
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
});
