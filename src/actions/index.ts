import { AnyAction } from 'redux';
import * as ACTIONS from '../constants/actions';
import DataService from '../services/data-service';
import { Dispute, Review, Task, TaskScore, User } from '../models/data-models';

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

export const getSignleTask = (taskId: string) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getSingleTask(taskId)
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_SINGLE_TASK,
        payload: {
          res: body,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading task.',
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

export const getSignleReview = (reviewId: string) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getSingleReview(reviewId)
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_SINGLE_REVIEW,
        payload: {
          res: body,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading review.',
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

export const getDisputes = () => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getAllDisputes()
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_DISPUTES,
        payload: {
          res: body,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading disputes.',
        },
      });
    });
};

export const getSingleDispute = (reviewId: string) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  dataService
    .getSingleDispute(reviewId)
    .then((body) => {
      dispatch({
        type: ACTIONS.GET_SINGLE_DISPUTE,
        payload: {
          res: body,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: ACTIONS.ADD_ERROR,
        error: {
          message: 'There was an error while loading dispute.',
        },
      });
    });
};

export const addDispute = (dispute: Dispute, review: Review) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  try {
    const receivedDispute = await dataService.addDispute(dispute);
    const receivedReview = await dataService.updateReview(review);
    dispatch({
      type: ACTIONS.ADD_DISPUTE,
      payload: {
        res: receivedDispute,
      },
    });
    dispatch({
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: receivedReview,
      },
    });
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while adding dispute.',
      },
    });
  }
};

export const acceptDispute = (dispute: Dispute, review: Review) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const newDispute = { ...dispute, state: 'ACCEPTED' } as Dispute;
  try {
    const receivedDispute = await dataService.updateDispute(newDispute);
    dispatch({
      type: ACTIONS.ACCEPT_DISPUTE,
      payload: {
        res: receivedDispute,
      },
    });
    const newScore: TaskScore = { ...review.grade };
    dispute.items.forEach((disputeItem) => {
      newScore.items[disputeItem.taskItem].score = disputeItem.suggestedScore;
    });
    const newReview = { ...review, grade: newScore } as Review;
    const receivedReview = await dataService.updateReview(newReview);
    dispatch({
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: receivedReview,
      },
    });
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while editing dispute.',
      },
    });
  }
};

export const rejectDispute = (dispute: Dispute, review: Review) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const newDispute = { ...dispute, state: 'REJECTED' } as Dispute;
  try {
    const receivedDispute = await dataService.updateDispute(newDispute);
    dispatch({
      type: ACTIONS.REJECT_DISPUTE,
      payload: {
        res: receivedDispute,
      },
    });
    dispatch({
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: review,
      },
    });
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while editing dispute.',
      },
    });
  }
};

export const addFeedbackToReview = (message: string, review: Review) => async (
  dispatch: (action: AnyAction) => void
): Promise<void> => {
  const newAuthorFeedback = review.authorFeedback
    ? [...review.authorFeedback, message]
    : [message];
  const newReview = { ...review, authorFeedback: newAuthorFeedback };
  try {
    const receivedReview = await dataService.updateReview(newReview);
    dispatch({
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: receivedReview,
      },
    });
  } catch {
    dispatch({
      type: ACTIONS.ADD_ERROR,
      error: {
        message: 'There was an error while adding feedback.',
      },
    });
  }
};
