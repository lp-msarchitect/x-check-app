import { AnyAction } from 'redux';
import * as ACTIONS from '../constants/actions';
import DataService from '../services/data-service';
import { User } from '../models/data-models';

const dataService = new DataService();

const loginUser = (userObj: User): AnyAction => ({
  type: ACTIONS.LOGIN,
  payload: userObj,
});

export const logoutUser = (): AnyAction => {
  localStorage.removeItem('githubId');
  return {
    type: ACTIONS.LOGOUT,
  };
};

export const githubUserFetch = (code: string) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const githubId: string = await dataService.getGitHubLogin(code);
  const user: User = await dataService.getSingleUser(githubId);
  if (!user) {
    await dataService.setUser({
      githubId,
      roles: ['student'],
    });
  }
  localStorage.setItem('githubId', githubId);
  dispatch(loginUser(user));
};

export const postUserFetch = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const githubId = localStorage.getItem('githubId') || '';
  if (githubId) {
    const user: User = await dataService.getSingleUser(githubId);
    dispatch(loginUser(user));
  }
};

export const getTasks = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getAllTasks()
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_TASKS,
        payload: {
          res: body,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUsers = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
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
