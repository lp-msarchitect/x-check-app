import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';
import { Review, TaskScore, Task } from '../../models/data-models';
import { getReviews, getTasks } from '../../actions';
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

  const sortNames = (a: Review, b: Review): number => {
    const A = a.author.toUpperCase();
    const B = b.author.toUpperCase();
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 1;
  };

  const sortTitles = (a: Review, b: Review): number => {
    const A = tasks.find((element) => {
      return element.id === a.task;
    });
    const B = tasks.find((element) => {
      return element.id === b.task;
    });
    if (A && B) {
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
    }
    return 1;
  };

  const renderTags = (state: string): JSX.Element => {
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
  };

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

  const sortScores = (a: Review, b: Review): number => {
    return calcTotalScore(a.grade) - calcTotalScore(b.grade);
  };

  const renderTaskTitle = (taskId: string): JSX.Element | null => {
    const currentTask = tasks.find((element) => {
      return element.id === taskId;
    });
    if (currentTask) {
      return <Link to={`/tasks/${taskId}`}>{currentTask.title}</Link>;
    }
    return null;
  };

  return (
    <div className="reviews">
      <Table dataSource={reviews}>
        <Table.Column
          key="task"
          title="Task"
          dataIndex="task"
          render={renderTaskTitle}
          sorter={sortTitles}
        />
        <Table.Column
          key="author"
          title="Author"
          dataIndex="author"
          sorter={sortNames}
        />
        <Table.Column
          key="reviewer"
          title="Reviewer"
          dataIndex="reviewer"
          sorter={sortNames}
        />
        <Table.Column
          key="state"
          title="State"
          dataIndex="state"
          render={renderTags}
        />
        <Table.Column
          key="grade"
          title="Score"
          dataIndex="grade"
          render={calcTotalScore}
          sorter={sortScores}
        />
      </Table>
    </div>
  );
};

export default Reviews;
