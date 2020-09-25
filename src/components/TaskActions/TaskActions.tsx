import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Auth, Task, TaskState } from '../../models/data-models';
import './TaskActions.scss';
import { AppReduxState, TasksState } from '../../models/redux-models';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { deleteTask } from '../../actions/actions';
import { useHistory } from 'react-router-dom';

interface TaskActionsProps {
  task: Task;
}

type AppDispatch = ThunkDispatch<TasksState, void, AnyAction>;

const TaskActions = ({ task }: TaskActionsProps): JSX.Element => {
  const auth = useSelector<AppReduxState, Auth>((state) => state.auth);

  const dispatch: AppDispatch = useDispatch();
  const handleDeleteTask = () => {
    dispatch(deleteTask(task.id!));
  };

  const history = useHistory();
  const handleEditTask = () => {
    console.log(task.id);
    history.push(`/edit-task/${task.id!}`);
  };

  return (
    <div className="task-actions">
      {auth.roles.includes('student') && (
        <Button type="primary" size="small">
          Submit
        </Button>
      )}
      {(auth.roles.includes('author') ||
        auth.roles.includes('coursemanager')) && (
        <>
          {task.state === 'DRAFT' && (
            <>
              <Button type="primary" size="small" onClick={handleEditTask}>
                Edit
              </Button>
              <Button type="primary" size="small">
                Publish
              </Button>
            </>
          )}
          <Button size="small">Archive</Button>
          <Button size="small" danger onClick={handleDeleteTask}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default TaskActions;
