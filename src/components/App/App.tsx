import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Students from '../Students/Students';
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
                <Link to="/students">Students</Link>
              </li>
              <li>
                <Link to="/users">Students</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/students">
              <Students />
            </Route>
            <Route path="/users">
              <Students />
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
