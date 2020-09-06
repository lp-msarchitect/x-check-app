import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

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
            .then((txt) => {
              console.log(txt);
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
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
        >
          Login via GitHub
        </a>
      )}
    </>
  );
};

export default Login;
