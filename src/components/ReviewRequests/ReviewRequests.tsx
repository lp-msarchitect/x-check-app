import { NotificationFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { Auth, Task } from '../../models/data-models';
import { TasksState } from '../../models/redux-models';
import RequestReview from '../RequestReview/RequestReview';

export interface ReviewRequestsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  auth: Auth;
  tasks: TasksState;
}

const ReviewRequests = (props: ReviewRequestsProps): JSX.Element => {
  const [showSubmit, setShowSubmit] = useState(false);
  const { auth, tasks } = props;

  const onModalBtnsClick = (): void => {
    setShowSubmit(!showSubmit);
  };

  return (
    <div>
      <Button type="primary" onClick={onModalBtnsClick}>
        Submit request
      </Button>
      <Modal visible={showSubmit} footer={null} onCancel={onModalBtnsClick}>
        <RequestReview tasks={tasks} onHide={onModalBtnsClick} />
      </Modal>
      <ul>
        <li>Review Request</li>
      </ul>
    </div>
  );
};

export default ReviewRequests;
