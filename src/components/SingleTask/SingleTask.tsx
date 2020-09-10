import React from 'react';
import { Task, TaskItem } from '../../models/data-models';
import TaskItemCategoryList from '../TaskItemCategoryList/TaskItemCategoryList';
import TaskActions from '../TaskActions/TaskActions';

interface SingleTaskProps {
  singleTask: Task;
  showForm: Function;
}

const SingleTask = ({ singleTask, showForm }: SingleTaskProps): JSX.Element => {
  const [basic, extra, fines]: Array<TaskItem[]> = [[], [], []];
  singleTask.items.forEach((item) => {
    switch (item.category) {
      case 'Basic Scope':
        basic.push(item);
        break;
      case 'Extra Scope':
        extra.push(item);
        break;
      case 'Fines':
        fines.push(item);
        break;
      default:
        basic.push(item);
    }
  });

  return (
    <>
      <p>
        <strong>Author: {singleTask.author}</strong>
      </p>
      <TaskItemCategoryList items={basic} />
      <TaskItemCategoryList items={extra} />
      <TaskItemCategoryList items={fines} />
      <TaskActions taskState={singleTask.state} showForm={showForm} />
    </>
  );
};

export default SingleTask;
