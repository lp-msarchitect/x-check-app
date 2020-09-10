import React from 'react';
import { Radio } from 'antd';
import { TaskItem } from '../../../models/data-models';
import './CheckTask.scss';

interface TaskItemProps {
  taskItem: TaskItem;
}

const CheckTask = ({ taskItem }: TaskItemProps): JSX.Element => {
  return (
    <div className="task-item">
      <h3 className="title">
        {taskItem.title}
        {taskItem.category === 'Fines' ? null : `: +${taskItem.maxScore}`}
      </h3>
      <hr />
      <div className="task-container">
        <div className="task-max-score">
          <p>Max score</p>
          <p>
            {taskItem.category === 'Fines'
              ? taskItem.minScore
              : taskItem.maxScore}
          </p>
        </div>
        <div className="task-description">
          <p className="task-title">{taskItem.description}</p>
          <a href="##" className="add-feedback">
            add a feedback
          </a>
        </div>
        <Radio.Group className="radio-group">
          <Radio value={1}>
            Not <br />
            completed
          </Radio>
          <Radio value={2}>
            Partially <br />
            completed
          </Radio>
          <Radio value={3}>
            Fully <br />
            completed
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default CheckTask;
