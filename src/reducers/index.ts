import { combineReducers } from 'redux';
import { Task } from '../models/data-models';
import * as ACTIONS from '../constants/actions';
import { actionType } from '../models/actions';

const tasksReducer = (state = [], action: actionType): Task[] => {
  switch (action.type) {
    case ACTIONS.GET_TASKS:
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer,
});
