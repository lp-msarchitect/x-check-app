import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { TaskItem } from '../../../models/data-models';
import './CheckTask.scss';

const { Option } = Select;
interface TaskItemProps {
  taskItem: TaskItem;
  taskScore: number;
  checkedTaskItems: number;
  setCheckedTaskItems: Function;
  setTaskScore: Function;
}

const CheckTask = ({
  taskItem,
  taskScore,
  setCheckedTaskItems,
  setTaskScore,
  checkedTaskItems,
}: TaskItemProps): JSX.Element => {
  const [prevScore, setPrevScore] = useState(0);

  const selectHandler = (value: number): void => {
    setPrevScore(value);
    setCheckedTaskItems(checkedTaskItems + 1);
    let score = taskScore - prevScore + value;
    if (score < 0) {
      score = 0;
    }
    setTaskScore(score);
  };

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
            add a comment
          </a>
        </div>
        <Form.Item
          name={taskItem.category}
          label={taskItem.category}
          rules={[{ required: true }]}
        >
          {taskItem.category === 'Fines' ? (
            <Select
              placeholder="Select a option"
              allowClear
              onSelect={(value: number): void => selectHandler(value)}
              onClear={(): void => {
                selectHandler(0);
                setCheckedTaskItems(checkedTaskItems - 1);
              }}
            >
              <Option value={taskItem.minScore}>Yes</Option>
              <Option value={taskItem.maxScore}>No</Option>
            </Select>
          ) : (
            <Select
              placeholder="Select a option"
              allowClear
              onSelect={(value: number): void => selectHandler(value)}
              onClear={(): void => {
                selectHandler(0);
                setCheckedTaskItems(checkedTaskItems - 1);
              }}
            >
              <Option value={0}>Not completed</Option>
              <Option value={taskItem.maxScore / 2}>Partially completed</Option>
              <Option value={taskItem.maxScore}>Fully completed</Option>
            </Select>
          )}
        </Form.Item>
      </div>
    </div>
  );
};

export default CheckTask;
