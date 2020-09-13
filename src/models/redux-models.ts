import { User, Task, Auth, Review, ReviewRequest } from './data-models';

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

export type ReviewRequestsAppState = {
  [dynamic: string]: ReviewRequest;
};

export interface AppReduxState {
  tasks: TasksState;
  users: UsersState;
  reviews: ReviewsState;
  auth: Auth;
  reviewRequests: ReviewRequestsAppState;
}
