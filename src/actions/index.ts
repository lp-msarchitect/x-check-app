import { AnyAction } from 'redux';
import * as ACTIONS from '../constants/actions';
import DataService from '../services/data-service';
import { User } from '../models/data-models';

const dataService = new DataService();

export const loginUser = (userObj: User) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const { githubId, roles } = userObj;
  const user: User = await dataService.getSingleUser(githubId);
  console.log('user from json-server', user);
  if (!user) {
    await dataService.addUser({
      githubId,
      roles,
    });
  } else {
    await dataService.putUser(userObj);
  }
  dispatch({
    type: ACTIONS.LOGIN,
    payload: { ...userObj },
  });
};

export const logoutUser = (): AnyAction => {
  localStorage.removeItem('githubId');
  return {
    type: ACTIONS.LOGOUT,
  };
};

export const authChooseUserRole = (userObj: User): AnyAction => {
  return {
    type: ACTIONS.LOGIN_CHOSE_ROLE,
    payload: { ...userObj },
  };
};

export const githubUserFetch = (code: string) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dispatch({ type: ACTIONS.LOGIN_STARTED });
  const githubId: string = await dataService.getGitHubLogin(code);
  console.log('githubId', githubId);

  // const user: User = await dataService.getSingleUser(githubId);
  // if (!user) {
  //   await dataService.setUser({
  //     githubId,
  //     roles: ['student'],
  //   });
  // }
  localStorage.setItem('githubId', githubId);
  dispatch(authChooseUserRole({ githubId, roles: ['student'] }));
};

export const postUserFetch = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const githubId = localStorage.getItem('githubId') || '';
  if (githubId) {
    const user: User = await dataService.getSingleUser(githubId);
    if (user) {
      dispatch({
        type: ACTIONS.LOGIN,
        payload: { githubId, roles: user.roles },
      });
    }
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

export const getReviews = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getAllReviews()
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_REVIEWS,
        payload: {
          res: body,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
