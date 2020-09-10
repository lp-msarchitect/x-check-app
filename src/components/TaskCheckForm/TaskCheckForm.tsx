import React from 'react';
import { Task } from '../../models/data-models';
import CheckTask from './CheckTask/CheckTask';
import './TaskCheckForm.scss';

interface SingleTaskProps {
  singleTask: Task;
}

const TaskCheckForm = ({ singleTask }: SingleTaskProps): JSX.Element => {
  return (
    <div className="task-check-form">
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
      <p className="criteria">Task criteria or description</p>
      {singleTask.items.map((elem) => {
        return <CheckTask taskItem={elem} key={elem.id} />;
      })}
    </div>
  );
};

export default TaskCheckForm;
