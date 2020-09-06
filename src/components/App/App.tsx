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
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = (): JSX.Element => {
  const [role, setRole] = useState<UserRole>('student');
  const { Header, Content } = Layout;

  const handleRoleChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    setRole(event.currentTarget.value as UserRole);
  };

  const isAuth = () => {
    return JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
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
              <Route path="/login">
                <Login />
              </Route>
              <ProtectedRoute
                path="/users"
                isAuth={isAuth()}
                redirectPath="/login"
              >
                <Users />
              </ProtectedRoute>
              <ProtectedRoute
                path="/tasks"
                isAuth={isAuth()}
                redirectPath="/login"
              >
                <Tasks />
              </ProtectedRoute>
              <ProtectedRoute
                path="/review-requests"
                isAuth={isAuth()}
                redirectPath="/login"
              >
                <ReviewRequests />
              </ProtectedRoute>
              <ProtectedRoute
                path="/reviews"
                isAuth={isAuth()}
                redirectPath="/login"
              >
                <Reviews />
              </ProtectedRoute>
              <ProtectedRoute
                path="/sessions"
                isAuth={isAuth()}
                redirectPath="/login"
              >
                <Sessions />
              </ProtectedRoute>
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
