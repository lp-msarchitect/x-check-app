import { User, Task, Auth, Review } from './data-models';

export interface AppReduxState {
  tasks: Task[];
  users: User[];
  auth: Auth;
  reviews: Review[];
}

export type actions = 'GET_TASKS' | 'GET_USERS' | 'GET_REVIEWS';
