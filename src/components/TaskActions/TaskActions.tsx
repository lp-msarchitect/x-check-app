import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { Auth, TaskState } from '../../models/data-models';
import './TaskActions.scss';
import { AppReduxState } from '../../models/redux-models';

interface TaskActionsProps {
  taskState: TaskState;
}

const TaskActions = ({ taskState }: TaskActionsProps): JSX.Element => {
  const auth = useSelector<AppReduxState, Auth>((state) => state.auth);

  return (
    <div className="task-actions">
      {auth.roles.includes('student') && (
        <Button type="primary" size="small">
          Submit
        </Button>
      )}
      {(auth.roles.includes('author') ||
        auth.roles.includes('coursemanager')) && (
        <>
          {taskState === 'DRAFT' && (
            <>
              <Button type="primary" size="small">
                Edit
              </Button>
              <Button type="primary" size="small">
                Publish
              </Button>
            </>
          )}
          <Button size="small">Archive</Button>
          <Button size="small" danger>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default TaskActions;
