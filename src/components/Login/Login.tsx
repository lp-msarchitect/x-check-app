import React, { useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const clientId = '140ee27ef8df8ece846a';
const proxyUrl = 'https://x-check-app.herokuapp.com/authenticate/';

const Login = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      setIsLoading(true);
      const newUrl = url.split('?code=');
      window.history.pushState({}, '', newUrl[0]);

      const code = newUrl[1];

      fetch(`${proxyUrl}${code}`)
        .then((res) => res.json())
        .then(({ token }) => {
          fetch(`https://api.github.com/user`, {
            headers: { Authorization: `token ${token}` },
          })
            .then((res) => res.json())
            .then((userData) => {
              localStorage.setItem('isLoggedIn', JSON.stringify(true));
              localStorage.setItem('githubId', JSON.stringify(userData.login));
              setIsLoading(false);
            });
        });
    }
  }, []);

  return (
    <>
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
