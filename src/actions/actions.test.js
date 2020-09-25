import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/actions';
import * as ACTIONS from '../constants/actions';
import { v4 as uuidv4 } from 'uuid';
import data from '../../db.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('sync action creators', () => {
  it('should create an action to choose user role', () => {
    const user = {
      id: 'whatevernewid',
      githubId: 'ellankz',
      roles: ['student'],
    };
    const expectedAction = {
      type: ACTIONS.LOGIN_CHOSE_ROLE,
      payload: user,
    };
    expect(actions.authChooseUserRole(user)).toEqual(expectedAction);
  });

  it('should create logout action', () => {
    const expectedAction = {
      type: ACTIONS.LOGOUT,
    };
    expect(actions.logoutUser()).toEqual(expectedAction);
  });
});

describe('tasks action creators', () => {
  it('should create GET_TASKS action, when fetching of tasks done', () => {
    const expectedAction = {
      type: ACTIONS.GET_TASKS,
      payload: {
        res: data.tasks,
      },
    };

    const store = mockStore({
      tasks: {},
    });

    return store.dispatch(actions.getTasks()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create a get single task action when fetched one', () => {
    const taskId = 'simple-task-v1';
    const expectedAction = {
      type: ACTIONS.GET_SINGLE_TASK,
      payload: {
        res: data.tasks.find((task) => task.id === taskId),
      },
    };
    const store = mockStore({
      tasks: [],
    });

    return store.dispatch(actions.getSignleTask(taskId)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  const createMockTask = () => {
    return {
      id: uuidv4(),
      title: 'This task is created by test',
      author: 'ellankz',
      state: 'DRAFT',
      categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
      items: [
        {
          id: uuidv4(),
          minScore: 0,
          maxScore: 20,
          category: 'Basic Scope',
          title: 'Initialize',
          description: '',
        },
        {
          id: uuidv4(),
          minScore: 0,
          maxScore: 30,
          category: 'Basic Scope',
          title: 'Add features',
          description: 'some random features',
        },
        {
          id: uuidv4(),
          minScore: -10,
          maxScore: 0,
          category: 'Fines',
          title: "Don't forget anything",
          description: '',
        },
      ],
    };
  };

  it('should succesfully create and delete task and return corresponding actions', async () => {
    const task = createMockTask();
    const expectedActionCreate = {
      type: ACTIONS.CREATE_TASK,
      payload: {
        res: task,
      },
    };
    const expectedActionDelete = {
      type: ACTIONS.DELETE_TASK,
      payload: task.id,
    };
    const store = mockStore({
      tasks: [],
    });
    await store.dispatch(actions.createTask(task));
    await store.dispatch(actions.deleteTask(task.id));
    return expect(store.getActions()).toEqual([
      expectedActionCreate,
      expectedActionDelete,
    ]);
  });

  it('should update task succsfully and return action', async () => {
    const task = createMockTask();
    const updatedTask = { ...task, title: 'WTH', state: 'PUBLISHED' };
    const expectedAction = {
      type: ACTIONS.UPDATE_TASK,
      payload: {
        res: updatedTask,
      },
    };
    const store = mockStore({
      tasks: [],
    });
    await store.dispatch(actions.createTask(task));
    await store.dispatch(actions.updateTask(updatedTask));
    expect(store.getActions()[1]).toEqual(expectedAction);
    return await store.dispatch(actions.deleteTask(updatedTask.id));
  });
});

describe('user action creators', () => {
  it('should get all users', () => {
    const expectedAction = {
      type: ACTIONS.GET_USERS,
      payload: {
        res: data.users,
      },
    };

    const store = mockStore({
      tasks: {},
    });

    return store.dispatch(actions.getUsers()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});

describe('reviews and disputes test suite', () => {
  it('should get all reviews and dispatch an action with result', () => {
    const expectedAction = {
      type: ACTIONS.GET_REVIEWS,
      payload: {
        res: data.reviews,
      },
    };

    const store = mockStore({
      reviews: {},
    });

    return store.dispatch(actions.getReviews()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should get a single review and dispatch an action with result', () => {
    const reviewId = 'rev-id-1';
    const expectedAction = {
      type: ACTIONS.GET_SINGLE_REVIEW,
      payload: {
        res: data.reviews[reviewId],
      },
    };
    const store = mockStore({
      reviews: {},
    });
    return store.dispatch(actions.getSignleReview()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should get all disputes and dispatch an action with result', () => {
    const expectedAction = {
      type: ACTIONS.GET_DISPUTES,
      payload: {
        res: data.disputes,
      },
    };

    const store = mockStore({
      disputes: {},
    });

    return store.dispatch(actions.getDisputes()).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  const createMockDispute = (reviewId) => {
    return {
      id: uuidv4(),
      reviewId: reviewId,
      state: 'ONGOING',
      items: [
        {
          taskItem: 'extra_p1',
          comment: 'You may be wrong',
          suggestedScore: 50,
        },
      ],
      reviewerComments: [],
    };
  };

  const createMockReview = () => {
    return {
      id: uuidv4(),
      requestId: 'rev-req-2',
      author: 'ellankz',
      reviewer: 'thatguy',
      state: 'DISPUTED',
      task: 'simple-task-v2',
      grade: {
        task: 'simple-task-v2',
        items: {
          basic_p1: {
            score: 10,
            comment: 'Yes',
          },
          extra_p1: {
            score: 30,
            comment: 'okay',
          },
          fines_p1: {
            score: 0,
            comment: 'Nope',
          },
        },
      },
      authorFeedback: [],
    };
  };

  it('should create a dispute, change review state and delete the dispute and dispatch actions with results ', async () => {
    const reviewId = 'rev-id-4';
    const review = data.reviews.find((review) => review.id === reviewId);
    const dispute = createMockDispute(reviewId);
    const expectedDisputeAction = {
      type: ACTIONS.ADD_DISPUTE,
      payload: {
        res: dispute,
      },
    };
    const expectedReviewAction = {
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: review,
      },
    };
    const store = mockStore({
      disputes: {},
      reviews: {},
    });
    await store.dispatch(actions.addDispute(dispute, review));
    expect(store.getActions()).toEqual([
      expectedDisputeAction,
      expectedReviewAction,
    ]);
    await store.dispatch(actions.deleteDispute(dispute));
    return expect(store.getActions()).toEqual([
      expectedDisputeAction,
      expectedReviewAction,
      {
        type: ACTIONS.DELETE_DISPUTE,
        payload: reviewId,
      },
    ]);
  });

  it('should get a single dispute by id and dispatch action', () => {
    const reviewId = 'rev-id-4';
    const dispute = data.disputes.find(
      (dispute) => dispute.reviewId === reviewId
    );
    const expectedDisputeAction = {
      type: ACTIONS.GET_SINGLE_DISPUTE,
      payload: {
        res: dispute,
      },
    };
    const store = mockStore({
      disputes: {},
    });
    return store.dispatch(actions.getSingleDispute(reviewId)).then(() => {
      expect(store.getActions()).toEqual([expectedDisputeAction]);
    });
  });

  it('should accept dispute and change dispute state, review score and dispatch actions', async () => {
    const reviewId = 'rev-id-4';
    const review = data.reviews.find((review) => review.id === reviewId);
    const dispute = createMockDispute(reviewId);
    const expectedDispute = { ...dispute, state: 'ACCEPTED' };
    const expectedDisputeAction = {
      type: ACTIONS.ACCEPT_DISPUTE,
      payload: {
        res: expectedDispute,
      },
    };
    const newScore = { ...review.grade };
    dispute.items.forEach((disputeItem) => {
      newScore.items[disputeItem.taskItem].score = disputeItem.suggestedScore;
    });
    const expectedReview = { ...review, grade: newScore };
    const expectedReviewAction = {
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: expectedReview,
      },
    };
    const store = mockStore({
      disputes: {},
      reviews: {},
    });
    await store.dispatch(actions.addDispute(dispute, review));
    await store.dispatch(actions.acceptDispute(dispute, review));
    const storeActions = store.getActions();
    expect(storeActions[1]).toEqual(expectedReviewAction);
    expect(storeActions[2]).toEqual(expectedDisputeAction);
    await store.dispatch(actions.deleteDispute(dispute));
  });

  it('should reject dispute and update review state and dispatch corresponding actions', async () => {
    const reviewId = 'rev-id-4';
    const review = data.reviews.find((review) => review.id === reviewId);
    const dispute = createMockDispute(reviewId);
    const expectedDispute = { ...dispute, state: 'REJECTED' };
    const expectedDisputeAction = {
      type: ACTIONS.REJECT_DISPUTE,
      payload: {
        res: expectedDispute,
      },
    };
    const expectedReviewAction = {
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: review,
      },
    };
    const store = mockStore({
      disputes: {},
      reviews: {},
    });
    await store.dispatch(actions.addDispute(dispute, review));
    await store.dispatch(actions.rejectDispute(dispute, review));
    const storeActions = store.getActions();
    expect(storeActions[1]).toEqual(expectedReviewAction);
    expect(storeActions[2]).toEqual(expectedDisputeAction);
    await store.dispatch(actions.deleteDispute(dispute));
  });
  // TODO: finish disputes test, and login test

  it('should add feedback to review and dispatch corresponding action', async () => {
    const review = data.reviews[0];
    const message = 'This is test generated message.';
    const feedback = review.authorFeedback
      ? [...review.authorFeedback, message]
      : [message];
    const expectedReview = { ...review, authorFeedback: feedback };
    const expectedAction = {
      type: ACTIONS.CHANGE_REVIEW,
      payload: {
        res: expectedReview,
      },
    };
    const store = mockStore({
      reviews: {},
    });
    await store.dispatch(actions.addFeedbackToReview(message, review));
    const storeActions = store.getActions();
    expect(storeActions).toEqual([expectedAction]);
  });
});

describe('auth action creators tests', () => {
  it('logs in user, dispatches an action', async () => {
    const user = data.users[0];
    const expectedAction = {
      type: ACTIONS.LOGIN,
      payload: user,
    };
    const store = mockStore({
      auth: {},
    });
    await store.dispatch(actions.loginUser(user));
    expect(store.getActions()).toEqual([expectedAction]);
  });
});
