import { Button } from 'antd';
import React from 'react';
import { TaskState } from '../../models/data-models';

interface CreateTaskActionsProps {
  onTaskSubmit: (state: TaskState) => void;
}

const CreateTaskActions = ({
  onTaskSubmit,
}: CreateTaskActionsProps): JSX.Element => {
  return (
    <>
      <Button
        className="create-task-publish"
        type="primary"
        onClick={(): void => onTaskSubmit('PUBLISHED')}
      >
        Submit task
      </Button>
      <Button type="default" onClick={(): void => onTaskSubmit('DRAFT')}>
        Save draft
      </Button>
    </>
  );
};

export default CreateTaskActions;
