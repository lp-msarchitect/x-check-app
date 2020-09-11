import { User, Task, Auth } from './data-models';

export interface AppReduxState {
  tasks: Task[];
  users: User[];
  auth: Auth;
}

export type actions = 'GET_TASKS' | 'GET_USERS';
