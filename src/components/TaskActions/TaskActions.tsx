import React from 'react';
import { Button } from 'antd';
import { TaskState } from '../../models/data-models';
import './TaskActions.scss';

interface TaskActionsProps {
  taskState: TaskState;
}

const TaskActions = ({ taskState }: TaskActionsProps): JSX.Element => {
  return (
    <div className="task-actions">
      {taskState === 'DRAFT' && (
        <Button type="primary" size="small">
          Edit
        </Button>
      )}
      <Button type="primary" size="small">
        Create Copy
      </Button>
      <Button size="small">Archive</Button>
      <Button size="small" danger>
        Delete
      </Button>
    </div>
  );
};

export default TaskActions;
