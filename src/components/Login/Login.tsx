import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Spin, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import { githubUserFetch } from '../../actions';
import { AppReduxState } from '../../models/redux-models';
import { User } from '../../models/data-models';

const clientId = '140ee27ef8df8ece846a';

type AppDispatch = ThunkDispatch<User, void, AnyAction>;

const Login = (): JSX.Element => {
  const { githubId } = useSelector<AppReduxState, User>((state) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const isLoading = false;

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

  return (
    <>
      {githubId ? <Redirect to="/" /> : null}
      {isLoading ? (
        <Spin />
      ) : (
        <Button
          type="primary"
          icon={<GithubOutlined />}
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
        >
          Login via GitHub
        </Button>
      )}
    </>
  );
};

export default Login;
