import { combineReducers, AnyAction } from 'redux';
import { Task, User, Auth } from '../models/data-models';
import * as ACTIONS from '../constants/actions';

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
