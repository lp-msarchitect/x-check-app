import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = (): JSX.Element => {
  const logOutHandler = (): void => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('githubId');
  };

  return (
    <Button icon={<LogoutOutlined />} onClick={logOutHandler}>
      Logout
    </Button>
  );
};

export default Logout;
