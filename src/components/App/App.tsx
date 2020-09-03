import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Users from '../Users/Users';
import Home from '../Home/Home';
import Tasks from '../Tasks/Tasks';
import ReviewRequests from '../ReviewRequests/ReviewRequests';
import Reviews from '../Reviews/Reviews';
import Sessions from '../Sessions/Sessions';
import Navbar from '../Navbar/Navbar';
import './App.css';
import { UserRole } from '../../models/data-models';

const App = (): JSX.Element => {
  const [role, setRole] = useState<UserRole>('student');
  const { Header, Content } = Layout;

  const handleRoleChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    setRole(event.currentTarget.value as UserRole);
  };

  return (
    <div>
      <div>
        <select value={role} onChange={handleRoleChange}>
          <option value="author">Author</option>
          <option value="student">Student</option>
          <option value="supervisor">Supervisor</option>
          <option value="coursemanager">Course Manager</option>
        </select>
      </div>
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Navbar role={role} />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Switch>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/tasks">
                <Tasks />
              </Route>
              <Route path="/review-requests">
                <ReviewRequests />
              </Route>
              <Route path="/reviews">
                <Reviews />
              </Route>
              <Route path="/sessions">
                <Sessions />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
