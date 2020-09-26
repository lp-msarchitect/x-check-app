import React,{useEffect, useState} from 'react';
import { Collapse,Button } from 'antd';
import { AnyAction } from 'redux';
import {
  AppReduxState,
  ReviewsState,
  TasksState,
  SessionsState
} from '../../models/redux-models';
import { Review, CrossCheckSession } from '../../models/data-models';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getSession} from '../../actions';
import StateTag from '../StateTag/StateTag';
import { pbkdf2 } from 'crypto';

const { Panel } = Collapse;

type AppDispatch = ThunkDispatch<ReviewsState, void, AnyAction>;

const Sessions = (): JSX.Element => {

  const sessions = useSelector<AppReduxState, SessionsState>((state) => state.sessions);


  const dispatch: AppDispatch = useDispatch();

  

  useEffect(() => {
    dispatch(getSession());
    
  }, [dispatch]);

  const [sessionsArr, setSessionsArr] = useState<CrossCheckSession[]>([]);

  useEffect(() => {
    setSessionsArr(Object.values(sessions));
  }, [sessions]);

  function callback(key:any) {
    console.log('click')
  }

  const panels = sessionsArr.map((session) =>{
    console.log(sessions)
    console.log(session)
    return (
        <Panel
        header={session.id}
        key={session.id}
        extra={<StateTag state={session.state} />}
        >

          <p>Start date:{session.startDate}</p>
          <p>Deadline:{session.endDate}</p>
          <p>Coefficient:{session.coefficient}</p>

        </Panel>
    )
      
    })
  

  return (
    <div className='sessions'>
      <Button type="primary">Primary Button</Button>
      <Collapse  onChange={callback}>
        {panels}
      </Collapse>
    </div>
  );
};

export default Sessions;
