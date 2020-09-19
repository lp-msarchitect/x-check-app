import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addReviewRequest } from '../../actions';
import { Auth, ReviewRequest, Task } from '../../models/data-models';
import {
  AppReduxState,
  ReviewRequestsAppState,
  TasksState,
} from '../../models/redux-models';
import RequestReview from '../RequestReview/RequestReview';
import ReviewRequestsTable from '../ReviewRequestsTable/ReviewRequestsTable';
import TaskCheckForm from '../TaskCheckForm/TaskCheckForm';

const taskMock: Task = {
  id: 'simple-task-v2',
  title: 'Simple task v2',
  author: 'test',
  state: 'PUBLISHED',
  categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  items: [
    {
      id: 'basic_p1',
      minScore: 0,
      maxScore: 20,
      category: 'Basic Scope',
      title: 'Basic things',
      description: 'You need to make things right, not wrong',
    },
    {
      id: 'extra_p1',
      minScore: 0,
      maxScore: 30,
      category: 'Extra Scope',
      title: 'More awesome things',
      description: 'Be creative and make up some more awesome things',
    },
    {
      id: 'extra_p2',
      minScore: 0,
      maxScore: 50,
      category: 'Extra Scope',
      title: 'Even more awesome things',
      description: 'Be creative and make up some more awesome things',
    },
    {
      id: 'fines_p1',
      minScore: -10,
      maxScore: 0,
      category: 'Fines',
      title: 'App crashes',
      description: 'App causes BSoD!',
    },
  ],
};

const ReviewRequests = (): JSX.Element => {
  const [showSubmit, setShowSubmit] = useState(false);
  const [showSelfCheck, setShowSelfCheck] = useState(false);
  const [selectedTask, setSelectedTask] = useState({} as Task);

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
    setSelectedTask(tasks[values.task]);
    setShowSelfCheck(true);
  };

  return (
    <>
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
      {showSelfCheck ? <TaskCheckForm singleTask={selectedTask} /> : null}
      <ReviewRequestsTable reviewRequests={reviewRequests} tasks={tasks} />
    </>
  );
};

export default ReviewRequests;
