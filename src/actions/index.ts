import * as ACTIONS from '../constants/actions';
import { actionType } from '../models/actions';
import DataService from '../services/data-service';

const dataService = new DataService();

const getTasks = (): actionType => {
  return {
    type: ACTIONS.GET_TASKS,
    payload: {},
  };
};

const getUsers = () => async (dispatch, getState): Promise<void> => {
  dataService
    .getAllUsers()
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_USERS,
        payload: {
          res: body,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export { getTasks, getUsers };
