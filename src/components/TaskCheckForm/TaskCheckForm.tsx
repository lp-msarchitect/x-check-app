import React, { useState } from 'react';
import { Affix, Button, Form } from 'antd';
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
  const [taskScores, setTaskScores] = useState<number[]>(
    new Array(singleTask.items.length).fill(0)
  );
  const [totalScore, setTotalScore] = useState<number>(0);
  const [checkedTaskItems, setCheckedTaskItems] = useState<number>(0);

  const submitHandler = (values: string): void => {
    console.log(values);
    showForm();
  };
  return (
    <div className={displayForm ? 'form-container' : 'form-container disabled'}>
      <Form className="task-check-form" onFinish={submitHandler}>
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
                Checked {checkedTaskItems} out of {singleTask.items.length}
              </p>
              <p className="score-board">Total points: {totalScore}</p>
            </div>
          </div>
        </Affix>
        <p className="criteria">Task criteria or description</p>
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
              itemId={id}
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
