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

  it('should succesfully create and delete task and return corresponding actions', async () => {
    const task = {
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
});
