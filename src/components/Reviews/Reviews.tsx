import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { getReviews, getTasks } from '../../actions';
import { Review, TaskScore, Task, ReviewState } from '../../models/data-models';
import { AppReduxState } from '../../models/redux-models';

type State = Review[];
type AppDispatch = ThunkDispatch<State, void, AnyAction>;

const Reviews = (): JSX.Element => {
  const reviews = useSelector<AppReduxState, Review[]>(
    (state) => state.reviews
  );
  const tasks = useSelector<AppReduxState, Task[]>((state) => state.tasks);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getTasks());
  }, [dispatch]);

  /// helper functions
  const calcTotalScore = (grade: TaskScore): number => {
    type ScoreType = { score: number; comment?: string };
    const grades = Object.values(grade.items) as ScoreType[];
    type Score = { score: number; comment?: string };
    const totalScore = grades.reduce<number>(
      (total: number, item: ScoreType) => {
        return (total + item.score) as number;
      },
      0
    );
    return totalScore;
  };

  const compareStrings = (A: string, B: string): number => {
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 1;
  };

  const getTaskTitle = (taskId: string): string | undefined => {
    const task = tasks.find((element) => element.id === taskId);
    return task ? task.title : undefined;
  };

  const createNameFilters = (
    role: 'author' | 'reviewer'
  ): ColumnFilterItem[] => {
    const names: string[] = [];
    reviews.forEach((review) => {
      if (!names.includes(review[role])) {
        names.push(review[role]);
      }
    });
    return names.map((name: string) => {
      return { text: name, value: name } as ColumnFilterItem;
    });
  };

  /// functions for table - sort, render, filter, and filter names
  const sorting = {
    names: (a: Review, b: Review): number => {
      const A = a.author.toUpperCase();
      const B = b.author.toUpperCase();
      return compareStrings(A, B);
    },
    titles: (a: Review, b: Review): number => {
      const A = tasks.find((element) => {
        return element.id === a.task;
      });
      const B = tasks.find((element) => {
        return element.id === b.task;
      });
      if (A && B) {
        return compareStrings(A.title, B.title);
      }
      return 1;
    },
    scores: (a: Review, b: Review): number => {
      return calcTotalScore(a.grade) - calcTotalScore(b.grade);
    },
  };

  const rendering = {
    tag: (state: string): JSX.Element => {
      const tagColor = (): string => {
        switch (state) {
          case 'PUBLISHED':
            return 'blue';
          case 'DISPUTED':
            return 'orange';
          case 'ACCEPTED':
            return 'green';
          case 'REJECTED':
            return 'red';
          default:
            return 'default';
        }
      };
      return (
        <Tag color={tagColor()} key={state}>
          {state}
        </Tag>
      );
    },
    taskTitle: (taskId: string): JSX.Element | null => {
      const currentTask = tasks.find((element) => {
        return element.id === taskId;
      });
      if (currentTask) {
        return <Link to={`/tasks/${taskId}`}>{currentTask.title}</Link>;
      }
      return null;
    },
    score: (grade: TaskScore): number => {
      return calcTotalScore(grade);
    },
  };

  const filters = {
    createTaskFilters: (): ColumnFilterItem[] => {
      const reviewedTasks: string[] = [];
      reviews.forEach((review) => {
        if (!reviewedTasks.includes(review.task)) {
          reviewedTasks.push(review.task);
        }
      });
      const taskTitles = reviewedTasks.map((taskId) => {
        const thisTaskTitle = getTaskTitle(taskId);
        if (thisTaskTitle) {
          return {
            text: thisTaskTitle,
            value: thisTaskTitle,
          } as ColumnFilterItem;
        }
        return {
          text: taskId,
          value: taskId,
        } as ColumnFilterItem;
      });
      return taskTitles;
    },
    createAuthorFilters: (): ColumnFilterItem[] => createNameFilters('author'),
    createReviewerFilters: (): ColumnFilterItem[] =>
      createNameFilters('reviewer'),
    createStateFilters: (): ColumnFilterItem[] => {
      const states: ReviewState[] = [
        'PUBLISHED',
        'DISPUTED',
        'ACCEPTED',
        'REJECTED',
        'DRAFT',
      ];
      return states.map((state: ReviewState) => {
        return {
          text: state,
          value: state,
        } as ColumnFilterItem;
      });
    },
  };

  const filtering = {
    tasks: (value: string | number | boolean, review: Review): boolean => {
      const taskTitle = getTaskTitle(review.task);
      if (taskTitle) {
        return taskTitle.indexOf(value.toString()) !== -1;
      }
      return false;
    },
    authors: (value: string | number | boolean, review: Review): boolean => {
      return review.author.indexOf(value.toString()) !== -1;
    },
    reviewers: (value: string | number | boolean, review: Review): boolean => {
      return review.reviewer.indexOf(value.toString()) !== -1;
    },
    states: (value: string | number | boolean, review: Review): boolean => {
      return review.state.indexOf(value.toString()) !== -1;
    },
  };

  return (
    <div className="reviews">
      <Table dataSource={reviews}>
        <Table.Column
          key="task"
          title="Task"
          dataIndex="task"
          render={rendering.taskTitle}
          sorter={sorting.titles}
          onFilter={filtering.tasks}
          filters={filters.createTaskFilters()}
        />
        <Table.Column
          key="author"
          title="Author"
          dataIndex="author"
          sorter={sorting.names}
          onFilter={filtering.authors}
          filters={filters.createAuthorFilters()}
        />
        <Table.Column
          key="reviewer"
          title="Reviewer"
          dataIndex="reviewer"
          sorter={sorting.names}
          onFilter={filtering.reviewers}
          filters={filters.createReviewerFilters()}
        />
        <Table.Column
          key="state"
          title="State"
          dataIndex="state"
          render={rendering.tag}
          onFilter={filtering.states}
          filters={filters.createStateFilters()}
        />
        <Table.Column
          key="grade"
          title="Score"
          dataIndex="grade"
          render={rendering.score}
          sorter={sorting.scores}
        />
      </Table>
    </div>
  );
};

export default Reviews;
