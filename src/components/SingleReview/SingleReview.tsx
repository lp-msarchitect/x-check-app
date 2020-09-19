import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Descriptions } from 'antd';
import './SingleReview.scss';
import {
  AppReduxState,
  ReviewsState,
  TasksState,
} from '../../models/redux-models';
import { Review, Task } from '../../models/data-models';
import { getReviews, getTasks } from '../../actions';
import calcTotalScore from '../../utils/calcTotalScore';
import StateTag from '../StateTag/StateTag';
import ReviewScoreDetailed from '../ReviewScoreDetailed/ReviewScoreDetailed';

const SingleReview = (): JSX.Element => {
  const { reviewId } = useParams<{ reviewId: string }>();

  type State = Review[];
  type AppDispatch = ThunkDispatch<State, void, AnyAction>;

  const reviews = useSelector<AppReduxState, ReviewsState>(
    (state) => state.reviews
  );
  const tasks = useSelector<AppReduxState, TasksState>((state) => state.tasks);

  const [review, setReview] = useState<Review | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const thisReview = reviews[reviewId];
    setReview(thisReview || null);
  }, [reviews, reviewId]);

  useEffect(() => {
    if (review && tasks) {
      const thisTask = tasks[review.task];
      setTask(thisTask || null);
    }
  }, [review, tasks]);

  return (
    <Descriptions title="Review Info" layout="vertical" bordered>
      {task && (
        <Descriptions.Item label="Task" span={2}>
          {task.title}
        </Descriptions.Item>
      )}
      {review && (
        <>
          <Descriptions.Item label="State" span={1}>
            <StateTag state={review.state} />
          </Descriptions.Item>
          <Descriptions.Item label="Author" span={1}>
            {review.author}
          </Descriptions.Item>
          <Descriptions.Item label="Reviewer" span={1}>
            {review.reviewer}
          </Descriptions.Item>
          <Descriptions.Item label="Total Score" span={1}>
            {calcTotalScore(review.grade)}
          </Descriptions.Item>
        </>
      )}
      {task && review && (
        <Descriptions.Item label="Detailed Score" span={3}>
          <ReviewScoreDetailed taskItems={task.items} review={review} />
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default SingleReview;
