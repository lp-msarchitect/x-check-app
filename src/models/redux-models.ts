import { User, Task, Review } from './data-models';

export interface AppReduxState {
  tasks: Task[];
  users: User[];
  reviews: Review[];
}

export type actions = 'GET_TASKS' | 'GET_USERS' | 'GET_REVIEWS';
