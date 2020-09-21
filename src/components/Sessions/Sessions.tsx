import React,{useEffect} from 'react';
import { Collapse } from 'antd';
import { AnyAction } from 'redux';
import {
  AppReduxState,
  ReviewsState,
  TasksState,
} from '../../models/redux-models';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getReviews, getTasks } from '../../actions';

const { Panel } = Collapse;
type AppDispatch = ThunkDispatch<ReviewsState, void, AnyAction>;

const Sessions = (): JSX.Element => {




  const dispatch: AppDispatch = useDispatch();

  const tasks = useSelector<AppReduxState, TasksState>((state) => state.tasks);

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getTasks());
  }, [dispatch]);

  function callback(key:any) {
    console.log(key);
  }

  return (
    <div>
    <Collapse  onChange={callback}>

      <Panel header="This is panel header 1" key='1'>
        <p>das</p>
      </Panel>
      
    </Collapse>,
    </div>
  );
};

export default Sessions;
