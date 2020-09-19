import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReviewRequest } from '../../actions';
import { Auth, ReviewRequest } from '../../models/data-models';
import {
  AppReduxState,
  ReviewRequestsAppState,
  TasksState,
} from '../../models/redux-models';
import RequestReview from '../RequestReview/RequestReview';
import ReviewRequestsTable from '../ReviewRequestsTable/ReviewRequestsTable';

const ReviewRequests = (): JSX.Element => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [showSelfCheck, setShowSelfCheck] = useState(false);

  const auth = useSelector<AppReduxState, Auth>(
    (state) => state.auth,
    shallowEqual
  );

  const tasks = useSelector<AppReduxState, TasksState>(
    (state) => state.tasks,
    shallowEqual
  );

  const reviewRequests = useSelector<AppReduxState, ReviewRequestsAppState>(
    (state) => state.reviewRequests,
    shallowEqual
  );

  const dispatch = useDispatch();

  const onSubmitRequestBtnClick = (): void => {
    setShowSubmit(true);
  };

  const onCancel = (): void => {
    setShowSubmit(false);
    setShowSelfCheck(false);
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
    setShowSelfCheck(true);
  };

  return (
    <div>
      <Button type="primary" onClick={onSubmitRequestBtnClick}>
        Submit request
      </Button>
      <Modal visible={showSubmit} footer={null} onCancel={onCancel}>
        <RequestReview
          tasks={tasks}
          onHide={onCancel}
          onSubmitClick={onSubmitReviewRequest}
        />
      </Modal>
      <Modal visible={showSelfCheck} footer={null} onCancel={onCancel}>
        SelfCheck
      </Modal>
      <ReviewRequestsTable reviewRequests={reviewRequests} tasks={tasks} />
    </div>
  );
};

export default ReviewRequests;
