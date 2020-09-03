/// User
export type UserRole = 'author' | 'student' | 'supervisor' | 'coursemanager';

export interface User {
  githubId: string;
  roles: UserRole[];
}

/// Task
enum TaskState {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}

enum TaskItemCategory {
  'Basic Scope',
  'Extra Scope',
  'Fines',
}

interface TaskItem {
  id: string;
  minScore: number;
  maxScore: number;
  category: TaskItemCategory;
  title: string;
  description: string;
}

export interface Task {
  id: string;
  author: string;
  state: TaskState;
  categoriesOrder: TaskItemCategory[];
  items: TaskItem[];
}

export interface TaskScore {
  task: string;
  items: {
    [dynamic: string]: {
      score: number;
      comment?: string;
    };
  };
}

/// XCheck Session
enum CrossCheckSessionState {
  DRAFT,
  REQUESTS_GATHERING,
  CROSS_CHECK,
  COMPLETED,
}

interface CrossCheckSessionAttendee {
  githubId: string;
  reviewerOf: string[];
}

export interface CrossCheckSession {
  id: string;
  state: CrossCheckSessionState;
  taskId: string;
  coefficient: number;
  startDate: string;
  endDate: string;
  discardMinScore: boolean;
  discardMaxScore: boolean;
  minReiewsAmount: number;
  desiredReviewersAmount: number;
  attendees: CrossCheckSessionAttendee[];
}

/// ReviewRequest
enum ReviewRequestState {
  DRAFT,
  PUBLISHED,
  COMPLETED,
}

export interface ReviewRequest {
  id: string;
  crossCheckSessionId: string | null;
  author: string;
  task: string;
  state: ReviewRequestState;
  selfGrade: TaskScore;
}

/// Review
enum ReviewState {
  DRAFT,
  PUBLISHED,
  DISPUTED,
  ACCEPTED,
  REJECTED,
}

export interface Review {
  id: string;
  requestId: string;
  author: string;
  state: ReviewState;
  grade: TaskScore;
}

/// Dispute
enum DisputeState {
  ONGOING,
  ACCEPTED,
  REJECTED,
}

export interface Dispute {
  reviewId: string;
  state: DisputeState;
  item: string;
  comment: string;
  suggestedScore: number;
}
