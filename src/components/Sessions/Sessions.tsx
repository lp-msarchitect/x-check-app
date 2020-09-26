import React,{useEffect, useState} from 'react';
import { Collapse,Button, Pagination,Modal  } from 'antd';
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

  const userAndReviewers = () =>{

  }
  const [visible, setVisible] = useState(false)
  

  const showModal = (e:Event) => {
    console.log(e.target)
    setVisible(true)
  };

  const handleOk = () => {
    setVisible(false)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const panels = sessionsArr.map((session) =>{
    console.log(sessions)
    console.log(session)
    const userAndReviewers = session.attendees;
    const users = userAndReviewers.map((user,idUser) =>{
      
      return (
        <div key={idUser} onClick = {showModal}>
          {user.githubId} 
        </div>
      )
    })
    
    
    
    return (
        <Panel
        header={session.id}
        key={session.id}
        extra={<StateTag state={session.state} />}
        >

          <div>Start date:{session.startDate}</div>
          <div>Deadline:{session.endDate}</div>
          <div>Coefficient:{session.coefficient}</div>
          <div >Students:<a >{users}</a></div>
          <Modal
            title="Reviewers"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            
          >
            
          </Modal>
          <Button type="primary">Edit</Button>
          <Pagination className='' defaultCurrent={1} total={1} />
        </Panel>
    )
      
    })
  

  return (
    <div className='sessions'>
      <Button type="primary">Add session</Button>
      <Collapse  onChange={callback}>
        {panels}
        
      </Collapse>
      
    </div>
  );
};

export default Sessions;
