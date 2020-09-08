import React, { useState } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { User } from '../../models/data-models';

type AppDispatch = ThunkDispatch<User, void, AnyAction>;

const Logout = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const [isRedirect, setIsRedirect] = useState(false);

  const logOutHandler = (): void => {
    dispatch(logoutUser());
    setIsRedirect(true);
  };

  return (
    <>
      {isRedirect ? <Redirect to="/login" /> : null}
      <Button icon={<LogoutOutlined />} onClick={logOutHandler}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
