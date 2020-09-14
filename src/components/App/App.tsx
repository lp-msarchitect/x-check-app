import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Users from '../Users/Users';
import Home from '../Home/Home';
import Tasks from '../Tasks/Tasks';
import ReviewRequests from '../ReviewRequests/ReviewRequests';
import Reviews from '../Reviews/Reviews';
import SingleReview from '../SingleReview/SingleReview';
import Sessions from '../Sessions/Sessions';
import Navbar from '../Navbar/Navbar';
import CreateTask from '../CreateTask/CreateTask';
import './App.scss';
import { User } from '../../models/data-models';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { postUserFetch } from '../../actions';

type AppDispatch = ThunkDispatch<User, void, AnyAction>;

const App = (): JSX.Element => {
  const { Header, Content } = Layout;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(postUserFetch());
  }, [dispatch]);

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Navbar />
        </Header>
        <Content className="app-content">
          <div className="router-switch-wrap">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <ProtectedRoute path="/users" redirectPath="/login">
                <Users />
              </ProtectedRoute>
              <ProtectedRoute path="/tasks" redirectPath="/login">
                <Tasks />
              </ProtectedRoute>
              <ProtectedRoute path="/create-task" redirectPath="/login">
                <CreateTask />
              </ProtectedRoute>
              <ProtectedRoute path="/review-requests" redirectPath="/login">
                <ReviewRequests />
              </ProtectedRoute>
              <ProtectedRoute path="/reviews/:reviewId" redirectPath="/login">
                <SingleReview />
              </ProtectedRoute>
              <ProtectedRoute path="/reviews" redirectPath="/login">
                <Reviews />
              </ProtectedRoute>
              <ProtectedRoute path="/sessions" redirectPath="/login">
                <Sessions />
              </ProtectedRoute>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
