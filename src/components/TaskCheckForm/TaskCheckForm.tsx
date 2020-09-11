import React from 'react';
import { Affix, Button, Form, Input } from 'antd';
import { Task } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

interface SingleTaskProps {
  singleTask: Task;
  displayForm: boolean;
  showForm: Function;
}

const TaskCheckForm = ({
  singleTask,
  displayForm,
  showForm,
}: SingleTaskProps): JSX.Element => {
  const validateMessages = {
    required: 'Add task link',
  };

  const submitHandler = (values: string): void => {
    console.log(values);
    showForm();
  };

  return (
    <div className={displayForm ? 'form-container' : 'form-container disabled'}>
      <Form
        className="task-check-form"
        validateMessages={validateMessages}
        onFinish={submitHandler}
      >
        <Affix offsetTop={0}>
          <button
            className="close-form"
            onClick={(): void => showForm()}
            type="button"
            aria-label="Close form button"
          />
          <div className="form-header">
            <h2 className="title">{singleTask.id}</h2>
            <div className="score-container">
              <p className="progress">
                Checked 0 out of {singleTask.items.length}
              </p>
              <p className="score-board">
                Total points: <span className="score">0</span>
              </p>
            </div>
          </div>
        </Affix>
        <Form.Item
          name={['link']}
          label="Task link"
          rules={[{ required: true }]}
          className="input"
        >
          <Input allowClear />
        </Form.Item>
        <p className="criteria">Task criteria or description</p>
        {singleTask.items.map((elem) => {
          return <CheckTask taskItem={elem} key={elem.id} />;
        })}
        <hr />
        <Button
          type="primary"
          htmlType="submit"
          className="submit-button"
          size="large"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TaskCheckForm;
