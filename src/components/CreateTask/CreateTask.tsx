import React, { useState } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input } from 'antd';
import {
  Auth,
  Task,
  TaskItem,
  TaskItemCategory,
  TaskState,
} from '../../models/data-models';
import './CreateTask.scss';
import { createTask } from '../../actions';
import { AppReduxState } from '../../models/redux-models';
import CreateTaskAddedItems from '../CreateTaskAddedItems/CreateTaskAddedItems';
import CreateTaskAddOneItem from '../CreateTaskAddOneItem/CreateTaskAddOneItem';
import CreateTaskActions from '../CreateTaskActions/CreateTaskActions';

type AppDispatch = ThunkDispatch<Task, void, AnyAction>;
const scopes = ['Basic Scope', 'Extra Scope', 'Fines'] as TaskItemCategory[];

const CreateTask = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<TaskItem[]>([]);

  const handleChangeItems = (newItems: TaskItem[]): void => {
    setItems(newItems);
  };

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { githubId } = useSelector<AppReduxState, Auth>((state) => state.auth);

  const handleTaskSubmit = (state: TaskState): void => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      author: githubId,
      state,
      categoriesOrder: scopes as TaskItemCategory[],
      items,
    };
    dispatch(createTask(newTask));
    history.push('/tasks');
  };
  return (
    <Form layout="vertical">
      <Form.Item label="Task Title" required>
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e): void => setTitle(e.target.value)}
        />
      </Form.Item>
      <CreateTaskAddOneItem
        items={items}
        onChangeItems={handleChangeItems}
        scopes={scopes}
      />
      <CreateTaskAddedItems items={items} onChangeItems={handleChangeItems} />
      <CreateTaskActions onTaskSubmit={handleTaskSubmit} />
    </Form>
  );
};

export default CreateTask;
