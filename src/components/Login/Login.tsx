import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Spin, Button, Select } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { githubUserFetch, loginUser } from '../../actions';
import { AppReduxState } from '../../models/redux-models';
import { Auth, UserRole } from '../../models/data-models';
import './Login.scss';

const { Option } = Select;
const clientId = '140ee27ef8df8ece846a';

type AppDispatch = ThunkDispatch<Auth, void, AnyAction>;

const Login = (): JSX.Element => {
  const { githubId, isLoading, isShowRoleSelector } = useSelector<
    AppReduxState,
    Auth
  >((state) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [role, setRole] = useState('student');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      const newUrl = url.split('?code=');
      window.history.pushState({}, '', newUrl[0]);

      const code = newUrl[1];

      dispatch(githubUserFetch(code));
    }
  }, [dispatch]);

  const handleRoleChange = (value: string): void => {
    setRole(value as UserRole);
  };

  const handlerLoginClick = (): void => {
    const roles: UserRole[] = [];
    roles.push(role as UserRole);

    dispatch(
      loginUser({
        githubId,
        roles,
      })
    );
    setRedirect(true);
  };

  const renderLogin = isShowRoleSelector ? (
    <div className="login__roles">
      <div>Choose your role, {githubId}</div>
      <Select
        value={role}
        onChange={handleRoleChange}
        className="login__select"
      >
        <Option value="author">Author</Option>
        <Option value="student">Student</Option>
        <Option value="supervisor">Supervisor</Option>
        <Option value="coursemanager">Course Manager</Option>
      </Select>
      <Button onClick={handlerLoginClick}>Log In</Button>
    </div>
  ) : (
    <Button
      type="primary"
      icon={<GithubOutlined />}
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
    >
      SignUp via GitHub
    </Button>
  );

  return (
    <div className="login">
      {redirect ? <Redirect to="/" /> : null}
      {isLoading ? <Spin /> : renderLogin}
    </div>
  );
};

export default Login;
