import React, { useState } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  Auth,
  CrossCheckSession,
  CrossCheckSessionState,
} from '../../models/data-models';
import './SessionActions.scss';
import {
  AppReduxState,
  SessionsState,
  TasksState,
} from '../../models/redux-models';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useHistory } from 'react-router-dom';
import EditSessionForm from '../EditSessionForm/EditSessionForm';

interface SessionActionsProps {
  session: CrossCheckSession;
  tasks: TasksState;
}

type AppDispatch = ThunkDispatch<SessionsState, void, AnyAction>;

const SessionActions = ({
  session,
  tasks,
}: SessionActionsProps): JSX.Element => {
  const auth = useSelector<AppReduxState, Auth>((state) => state.auth);

  const dispatch: AppDispatch = useDispatch();

  const history = useHistory();
  const handleEditSession = () => {
    //// TODO: modal here
    setVisible(true);
  };

  const handleUpdateSessionState = (state: CrossCheckSessionState) => {
    // dispatch(updateSession({ ...session, state }));
  };

  const [visible, setVisible] = useState(false);

  return (
    <div className="session-actions">
      {(auth.roles.includes('author') ||
        auth.roles.includes('coursemanager')) && (
        <>
          {session.state === 'DRAFT' && (
            <>
              <Button type="primary" size="small" onClick={handleEditSession}>
                Edit
              </Button>
              <EditSessionForm
                tasks={tasks}
                session={session}
                onCloseOrSubmit={() => setVisible(false)}
                visible={visible}
              />
              <Button
                type="primary"
                size="small"
                onClick={() => handleUpdateSessionState('REQUESTS_GATHERING')}
              >
                Gather Requests
              </Button>
            </>
          )}
          {session.state === 'REQUESTS_GATHERING' && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleUpdateSessionState('CROSS_CHECK')}
            >
              Start Cross-Check
            </Button>
          )}
          {session.state === 'CROSS_CHECK' && (
            <Button
              size="small"
              type="primary"
              onClick={() => handleUpdateSessionState('COMPLETED')}
            >
              Finish Session
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SessionActions;
