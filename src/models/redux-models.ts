<<<<<<< HEAD
=======
import { User, Task, Auth, Review, ReviewRequest, Dispute } from './data-models';
>>>>>>> develop

import { User, Task, Auth, Review, CrossCheckSession as Session } from './data-models';

export type actions = 'GET_TASKS' | 'GET_USERS' | 'GET_REVIEWS' | 'GET_SESSIONS'

export type ReviewsState = {
  [dynamic: string]: Review;
};

export type TasksState = {
  [dynamic: string]: Task;
};

export type UsersState = {
  [dynamic: string]: User;
};

<<<<<<< HEAD
export type SessionsState = {
  [dinamic:string]: Session
}
=======
export type ReviewRequestsAppState = {
  [dynamic: string]: ReviewRequest;
};

export type DisputesState = {
  [dynamic: string]: Dispute;
};
>>>>>>> develop

export type ErrorState = null | string;

export interface AppReduxState {
  tasks: TasksState;
  users: UsersState;
  reviews: ReviewsState;
  disputes: DisputesState;
  auth: Auth;
  reviewRequests: ReviewRequestsAppState;
  error: ErrorState;
  sessions: SessionsState;
}
