import { Button } from 'antd';
import React from 'react';
import { TaskState } from '../../models/data-models';

interface CreateTaskActionsProps {
  onTaskSubmit: (state: TaskState) => void;
  onTaskCancel: () => void;
}

const CreateTaskActions = ({
  onTaskSubmit,
  onTaskCancel,
}: CreateTaskActionsProps): JSX.Element => {
  return (
    <>
      <Button
        className="create-task-button"
        type="primary"
        onClick={(): void => onTaskSubmit('PUBLISHED')}
      >
        Submit task
      </Button>
      <Button
        className="create-task-button"
        type="default"
        onClick={(): void => onTaskSubmit('DRAFT')}
      >
        Save draft
      </Button>
      <Button className="create-task-button" danger onClick={onTaskCancel}>
        Cancel
      </Button>
    </>
  );
};

export default CreateTaskActions;
