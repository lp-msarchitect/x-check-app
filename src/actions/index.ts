import { AnyAction } from 'redux';
import * as ACTIONS from '../constants/actions';
import DataService from '../services/data-service';
import { Task, User } from '../models/data-models';

const dataService = new DataService();

export const loginUser = (userObj: User) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const { githubId, roles } = userObj;
  try {
    const user: User = await dataService.getSingleUser(githubId);
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
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while login.',
      },
    });
  }
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
  try {
    dispatch({ type: ACTIONS.LOGIN_STARTED });
    const githubId: string = await dataService.getGitHubLogin(code);

    localStorage.setItem('githubId', githubId);
    dispatch(authChooseUserRole({ githubId, roles: ['student'] }));
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while login.',
      },
    });
  }
};

export const postUserFetch = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  try {
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
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while loading user.',
      },
    });
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
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading tasks.',
        },
      });
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
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading users.',
        },
      });
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
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading reviews.',
        },
      });
    });
};

export const createTask = (task: Task) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .addTask(task)
    .then((body) => {
      dispatch({
        type: ACTIONS.CREATE_TASK,
        payload: {
          res: body,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while adding task.',
        },
      });
    });
};
