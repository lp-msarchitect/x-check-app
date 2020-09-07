import { User, Task } from './data-models';

export interface AppReduxState {
  tasks: Task[];
  users: User[];
}

export type actions = 'GET_TASKS' | 'GET_USERS';
