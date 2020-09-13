import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewRequest } from '../../actions';
import { Auth, ReviewRequest } from '../../models/data-models';
import { ReviewRequestsAppState, TasksState } from '../../models/redux-models';
import RequestReview from '../RequestReview/RequestReview';
import ReviewRequestsTable from '../ReviewRequestsTable/ReviewRequestsTable';

export interface ReviewRequestsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  auth: Auth;
  tasks: TasksState;
  reviewRequests: ReviewRequestsAppState;
}

const ReviewRequests = (props: ReviewRequestsProps): JSX.Element => {
  const [showSubmit, setShowSubmit] = useState(false);
  const { auth, tasks, reviewRequests } = props;
  const dispatch = useDispatch();

  const onModalBtnsClick = (): void => {
    setShowSubmit(!showSubmit);
  };

  const onSubmitReviewRequest = (values: Record<string, any>): void => {
    const request: ReviewRequest = {
      id: '',
      crossCheckSessionId: null,
      author: auth.githubId,
      task: values.task,
      prUrl: values['pr-url'],
      demoUrl: values['demo-url'],
      state: 'DRAFT',
      selfGrade: null,
    };
    dispatch(addReviewRequest(request));
  };

  return (
    <div>
      <Button type="primary" onClick={onModalBtnsClick}>
        Submit request
      </Button>
      <Modal visible={showSubmit} footer={null} onCancel={onModalBtnsClick}>
        <RequestReview
          tasks={tasks}
          onHide={onModalBtnsClick}
          onSubmitClick={onSubmitReviewRequest}
        />
      </Modal>
      <ReviewRequestsTable reviewRequests={reviewRequests} tasks={tasks} />
    </div>
  );
};

export default ReviewRequests;
