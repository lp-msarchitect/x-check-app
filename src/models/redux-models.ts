import { User, Task } from './data-models';

export interface AppReduxState {
  tasks: Task[];
  users: User[];
  auth: User;
}

export type actions = 'GET_TASKS' | 'GET_USERS';
