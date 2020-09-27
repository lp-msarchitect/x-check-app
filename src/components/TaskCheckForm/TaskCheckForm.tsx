import React, { useState } from 'react';
import { Affix, Button, Form, message } from 'antd';
import { ReviewRequest, Task } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

const fastScoreButtons = [
  'Not completed',
  'Partially completed',
  'Fully completed',
  'Clear',
];

interface SingleTaskProps {
  singleTask: Task;
  onSubmit: Function;
  open: boolean;
  onCancel: Function;
  checkedRequest?: ReviewRequest | null;
}

const TaskCheckForm = ({
  singleTask,
  onSubmit,
  checkedRequest,
  open,
  onCancel,
}: SingleTaskProps): JSX.Element => {
  const [taskScores, setTaskScores] = useState<number[]>(
    new Array(singleTask.items.length).fill(0)
  );
  const [totalScore, setTotalScore] = useState<number>(0);
  const [checkedTaskItems, setCheckedTaskItems] = useState<number>(0);
  const [form] = Form.useForm();
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>(
    new Array(singleTask.items.length).fill(false)
  );

  const success = (): void => {
    message.success('The result submitted');
  };

  const error = (): void => {
    message.error('Fill in all fields');
  };

  const submitHandler = (value: any): void => {
    success();
    onSubmit(value);
  };

  const closeForm = (): void => {
    setTaskScores(new Array(singleTask.items.length).fill(0));
    setTotalScore(0);
    setCheckedTaskItems(0);
    form.resetFields();
    onCancel();
  };

  const clearForm = (): void => {
    setCheckedTasks(
      checkedTasks.map(() => {
        return false;
      })
    );
    setCheckedTaskItems(0);
    setTotalScore(0);
    setTaskScores(new Array(singleTask.items.length).fill(0));
    form.resetFields();
  };

  const selfGrade = checkedRequest ? checkedRequest.selfGrade : null;

  return (
    <div className={open ? 'form-container' : 'form-container disabled'}>
      <Form
        className="task-check-form"
        onFinish={submitHandler}
        onFinishFailed={error}
        form={form}
      >
        <Affix offsetTop={0}>
          <button
            className="close-form"
            onClick={(): void => closeForm()}
            type="button"
            aria-label="Close form button"
          />
          <div className="form-header">
            <h2 className="title">{singleTask.title}</h2>
            <div className="fast-score-buttons">
              <Button
                className={`button Clear`}
                htmlType="button"
                type="default"
                onClick={clearForm}
              >
                Clear
              </Button>
            </div>
            <div className="score-container">
              <p className="progress">
                Checked {checkedTaskItems} out of {singleTask.items.length}
              </p>
              <p className="score-board">Total points: {totalScore}</p>
            </div>
          </div>
        </Affix>
        {singleTask.items.map((elem, id) => {
          return (
            <CheckTask
              taskItem={elem}
              key={elem.id}
              taskScores={taskScores}
              setTaskScores={setTaskScores}
              setTotalScore={setTotalScore}
              checkedTaskItems={checkedTaskItems}
              setCheckedTaskItems={setCheckedTaskItems}
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              itemId={id}
              selfGradeItem={selfGrade ? selfGrade.items[elem.id] : null}
            />
          );
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
