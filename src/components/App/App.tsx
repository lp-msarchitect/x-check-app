import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Users from '../Users/Users';
import Home from '../Home/Home';
import './App.css';
import { UserRole } from '../../models/data-models';

const App = (): JSX.Element => {
  const [role, setRole] = useState<UserRole>('student');

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
      <p>Your current role is: {role}</p>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/review-requests">Review Requests</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/sessions">Cross-Check Sessions</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/tasks">
              <Users />
            </Route>
            <Route path="/review-requests">
              <Users />
            </Route>
            <Route path="/reviews">
              <Users />
            </Route>
            <Route path="/sessions">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
