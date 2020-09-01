import React, { useState } from 'react';
import { Button } from 'antd';
import useFetch from './utils/useFetch';
import './App.css';

function App() {
  const [response, loading, hasError] = useFetch('http://localhost:3001/users');
  const [users, setUsers] = useState([]);

  const clickHandler = () => {
    setUsers(response || []);
  };

  const items = users.map((item: any) => {
    return <div>{item.githubId}</div>;
  });

  return (
    <div className="App">
      <Button type="primary" onClick={clickHandler}>
        Show Users
      </Button>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : hasError ? (
          <div>Error occured.</div>
        ) : (
          <div>{items}</div>
        )}
      </div>
    </div>
  );
}

export default App;
