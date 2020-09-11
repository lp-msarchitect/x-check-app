import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Descriptions, List, Comment, Button } from 'antd';
import './SingleReview.scss';
import { AppReduxState } from '../../models/redux-models';
import { Review, Task, TaskItem } from '../../models/data-models';
import { getReviews, getTasks } from '../../actions';
import calcTotalScore from '../../utils/calcTotalScore';
import StateTag from '../StateTag/StateTag';

const SingleReview = (): JSX.Element => {
  const { reviewId } = useParams<{ reviewId: string }>();

  type State = Review[];
  type AppDispatch = ThunkDispatch<State, void, AnyAction>;

  const reviews = useSelector<AppReduxState, Review[]>(
    (state) => state.reviews
  );
  const tasks = useSelector<AppReduxState, Task[]>((state) => state.tasks);

  const [review, setReview] = useState<Review | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews());
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const thisReview = reviews.find((element) => element.id === reviewId);
    setReview(thisReview || null);
  }, [reviews, reviewId]);

  useEffect(() => {
    if (review && tasks) {
      const thisTask = tasks.find((element) => element.id === review.task);
      setTask(thisTask || null);
    }
  }, [review, tasks]);

  return (
    <Descriptions title="Review Info" layout="vertical" bordered>
      <Descriptions.Item label="Task" span={2}>
        {task && task.title}
      </Descriptions.Item>
      <Descriptions.Item label="State" span={1}>
        {review && <StateTag state={review.state} />}
      </Descriptions.Item>
      <Descriptions.Item label="Author" span={1}>
        {review && review.author}
      </Descriptions.Item>
      <Descriptions.Item label="Reviewer" span={1}>
        {review && review.reviewer}
      </Descriptions.Item>
      <Descriptions.Item label="Total Score" span={1}>
        {review && calcTotalScore(review.grade)}
      </Descriptions.Item>
      <Descriptions.Item label="Detailed Score" span={3}>
        <List itemLayout="horizontal">
          {task &&
            review &&
            task.items.map((item: TaskItem) => {
              if (review.grade.items[item.id]) {
                return (
                  <List.Item className="single-review-item">
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                    <div>{review.grade.items[item.id].score}</div>
                    {review.grade.items[item.id].comment && (
                      <Comment
                        actions={[
                          <Button type="primary" size="small">
                            Dispute
                          </Button>,
                        ]}
                        author={review.reviewer}
                        avatar={`https://github.com/${review.reviewer}.png?size=40`}
                        content={<p>{review.grade.items[item.id].comment}</p>}
                      />
                    )}
                  </List.Item>
                );
              }
              return null;
            })}
        </List>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default SingleReview;
