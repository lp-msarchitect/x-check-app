enum Roles {
  author,
  student,
  supervisor,
  courseManager,
}

export interface User {
  githubId: string;
  roles: Roles[];
}
