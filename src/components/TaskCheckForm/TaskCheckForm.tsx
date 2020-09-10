import React from 'react';
import { Button, Form, Input } from 'antd';
import { Task } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

interface SingleTaskProps {
  singleTask: Task;
}

const TaskCheckForm = ({ singleTask }: SingleTaskProps): JSX.Element => {
  const validateMessages = {
    required: 'Add task link',
  };

  const onFinish = (values: string): void => {
    console.log(values);
  };

  return (
    <Form
      className="task-check-form"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <div className="task-check-form-header">
        <h2 className="title">{singleTask.id}</h2>
        <div className="score-container">
          <p className="progress">Checked 0 out of 20</p>
          <p className="score-board">
            Total points: <span className="score">0</span>
          </p>
        </div>
      </div>
      <hr />
      <Form.Item
        name={['link']}
        label="Task link"
        rules={[{ required: true }]}
        className="input"
      >
        <Input />
      </Form.Item>
      <p className="criteria">Task criteria or description</p>
      {singleTask.items.map((elem) => {
        return <CheckTask taskItem={elem} key={elem.id} />;
      })}
      <hr />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TaskCheckForm;
