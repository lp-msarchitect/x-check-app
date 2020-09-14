import React, { useState } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Select, Button } from 'antd';
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

const { TextArea } = Input;
type AppDispatch = ThunkDispatch<Task, void, AnyAction>;

const CreateTask = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState<TaskItem[]>([]);

  const [titleItem, setTitleItem] = useState('');
  const [descriptionItem, setDescriptionItem] = useState('');
  const [categoryItem, setCategoryItem] = useState<TaskItemCategory>(
    'Basic Scope'
  );
  const [minItem, setMinItem] = useState('');
  const [maxItem, setMaxItem] = useState('');

  const { Option } = Select;
  const scopes = ['Basic Scope', 'Extra Scope', 'Fines'];

  const resetItemInfo = (): void => {
    setTitleItem('');
    setDescriptionItem('');
    setCategoryItem('Basic Scope');
    setMinItem('');
    setMaxItem('');
  };

  const handleAddItem = (): void => {
    const minNum = parseInt(minItem, 10);
    const maxNum = parseInt(maxItem, 10);
    const item = {
      id: uuidv4(),
      minScore: !Number.isNaN(minNum) ? minNum : 0,
      maxScore: !Number.isNaN(maxNum) ? maxNum : 0,
      category: categoryItem,
      title: titleItem,
      description: descriptionItem,
    } as TaskItem;
    const newArray = [...items, item];
    setItems(
      newArray.sort((prev, cur) => {
        return scopes.indexOf(prev.category) - scopes.indexOf(cur.category);
      })
    );
    resetItemInfo();
  };

  const handleDeleteItem = (index: number): void => {
    const newItems = items.filter((item, i) => {
      return index !== i;
    });
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
      <Form.Item label="Item Title" required>
        <Input
          placeholder="Item Title"
          value={titleItem}
          onChange={(e): void => setTitleItem(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Item Description">
        <TextArea
          rows={4}
          placeholder="Item Description"
          value={descriptionItem}
          onChange={(e): void => setDescriptionItem(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Item Category">
        <Select
          defaultValue={categoryItem}
          onChange={(e): void => setCategoryItem(e)}
        >
          {scopes.map((scope) => {
            return (
              <Option key={scope} value={scope}>
                {scope}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Score Range">
        <Input
          style={{ width: 100, textAlign: 'center' }}
          placeholder="Min Score"
          value={minItem}
          onChange={(e): void => setMinItem(e.target.value)}
        />
        <Input
          className="site-input-split"
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />
        <Input
          className="site-input-right"
          style={{
            width: 100,
            textAlign: 'center',
          }}
          placeholder="Max Score"
          value={maxItem}
          onChange={(e): void => setMaxItem(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={handleAddItem}
          disabled={titleItem.length < 1}
        >
          Add Item
        </Button>
      </Form.Item>
      <div>
        <h3>Added Items</h3>
        <ul className="added-items">
          {items.length > 0 &&
            items.map((item, index) => {
              const addCategory =
                index === 0 ||
                (index > 0 && item.category !== items[index - 1].category);
              return (
                <React.Fragment key={item.id}>
                  {addCategory && (
                    <li key={item.category}>
                      <strong>{item.category}</strong>
                    </li>
                  )}
                  <li key={item.id}>
                    {index + 1}. {item.title}.{' '}
                    <em>
                      Score: {item.minScore}-{item.maxScore}
                    </em>
                    <div className="create-task-item-desc">
                      {item.description}
                    </div>
                    <Button
                      type="link"
                      onClick={(): void => handleDeleteItem(index)}
                    >
                      delete
                    </Button>
                  </li>
                </React.Fragment>
              );
            })}
        </ul>
      </div>
      <Button
        className="create-task-publish"
        type="primary"
        onClick={(): void => handleTaskSubmit('PUBLISHED')}
      >
        Submit task
      </Button>
      <Button type="default" onClick={(): void => handleTaskSubmit('DRAFT')}>
        Save draft
      </Button>
    </Form>
  );
};

export default CreateTask;
