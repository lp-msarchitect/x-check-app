import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { ReviewRequestsAppState, TasksState } from '../../models/redux-models';
import StateTag from '../StateTag/StateTag';
import { compareStrings } from '../../utils/helpers';
import { ReviewRequest } from '../../models/data-models';

export interface ReviewRequestsTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  //   auth: Auth;
  //   tasks: TasksState;
  reviewRequests: ReviewRequestsAppState;
  tasks: TasksState;
}

const ReviewRequestsTable = (props: ReviewRequestsTableProps): JSX.Element => {
  const { reviewRequests, tasks } = props;
  const reviewRequestsArr = Object.values(reviewRequests);

  const sorting = {
    strings: (a: ReviewRequest, b: ReviewRequest): number => {
      const A = a.author.toUpperCase();
      const B = b.author.toUpperCase();
      return compareStrings(A, B);
    },
    titles: (a: ReviewRequest, b: ReviewRequest): number => {
      const A = tasks[a.task];
      const B = tasks[b.task];
      if (A && B) {
        return compareStrings(A.title, B.title);
      }
      return 1;
    },
  };

  const rendering = {
    tag: (state: string): JSX.Element => {
      return <StateTag state={state} />;
    },
    taskTitle: (task: string): string => {
      const currentTask = tasks[task];
      return currentTask.title;
    },
    author: (author: string): string => {
      return author;
    },
    url: (url: string): JSX.Element => {
      return <Link to={`${url}`}>{url}</Link>;
    },
  };

  return (
    <Table
      dataSource={reviewRequestsArr}
      rowKey={(review): string => review.id}
    >
      <Table.Column
        key="task"
        title="Task"
        dataIndex="task"
        render={rendering.taskTitle}
        sorter={sorting.titles}
        // onFilter={filtering.tasks}
        // filters={filters.createTaskFilters()}
      />
      <Table.Column
        key="author"
        title="Author"
        dataIndex="author"
        render={rendering.author}
        sorter={sorting.strings}
        // onFilter={filtering.authors}
        // filters={filters.createAuthorFilters()}
      />
      <Table.Column
        key="state"
        title="State"
        dataIndex="state"
        render={rendering.tag}
        sorter={sorting.strings}
        // onFilter={filtering.reviewers}
        // filters={filters.createReviewerFilters()}
      />
      <Table.Column
        key="prUrl"
        title="Pull Request"
        dataIndex="prUrl"
        render={rendering.url}
        // sorter={sorting.names}
        // onFilter={filtering.reviewers}
        // filters={filters.createReviewerFilters()}
      />
      <Table.Column
        key="demoUrl"
        title="Demo"
        dataIndex="demoUrl"
        render={rendering.url}
        // sorter={sorting.names}
        // onFilter={filtering.reviewers}
        // filters={filters.createReviewerFilters()}
      />
    </Table>
  );
};

export default ReviewRequestsTable;
