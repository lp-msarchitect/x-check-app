import { User, Task, Auth, Review, Dispute } from './data-models';

export type actions = 'GET_TASKS' | 'GET_USERS' | 'GET_REVIEWS';

export type ReviewsState = {
  [dynamic: string]: Review;
};

export type TasksState = {
  [dynamic: string]: Task;
};

export type UsersState = {
  [dynamic: string]: User;
};

export type DisputesState = {
  [dynamic: string]: Dispute;
};

export type ErrorState = null | string;

export interface AppReduxState {
  tasks: TasksState;
  users: UsersState;
  reviews: ReviewsState;
  disputes: DisputesState;
  auth: Auth;
  error: ErrorState;
}
