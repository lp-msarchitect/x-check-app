import React, { useEffect } from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../ModalWrap/ModalWrap';
import SingleTask from '../SingleTask/SingleTask';
import { AppReduxState, TasksState } from '../../models/redux-models';
import { Task } from '../../models/data-models';
import './Tasks.scss';
import { getTasks } from '../../actions';
import StateBadge from '../StateBadge/StateBadge';

type AppDispatch = ThunkDispatch<TasksState, void, AnyAction>;

const Tasks = (): JSX.Element => {
  const { Panel } = Collapse;

  const tasks = useSelector<AppReduxState, TasksState>((state) => state.tasks);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="tasks">
      <h2>Tasks</h2>
      <Modal />
      <Collapse
        accordion
        expandIcon={({ isActive }): JSX.Element => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {Object.values(tasks).map((item: Task) => {
          return (
            <Panel
              header={item.title}
              key={item.id}
              extra={<StateBadge state={item.state} />}
            >
              <SingleTask singleTask={item} />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default Tasks;
