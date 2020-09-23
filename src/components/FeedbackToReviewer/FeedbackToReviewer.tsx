import React from 'react';
import { Comment } from 'antd';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { Review } from '../../models/data-models';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import { addFeedbackToReview } from '../../actions';

const FeedbackToReviewer = ({ review }: { review: Review }): JSX.Element => {
  type State = Review[];
  type AppDispatch = ThunkDispatch<State, void, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const handleAddFeedback = (message: string): void => {
    dispatch(addFeedbackToReview(message, review));
  };

  return (
    <>
      {review.authorFeedback &&
        review.authorFeedback.map((text) => {
          return (
            <Comment
              key={text}
              author={review.author}
              avatar={`https://github.com/${review.author}.png?size=40`}
              content={<p>{text}</p>}
            />
          );
        })}
      <FeedbackForm onSubmit={handleAddFeedback} />
    </>
  );
};

export default FeedbackToReviewer;
