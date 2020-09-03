import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserRole } from '../../models/data-models';

interface NavbarProps {
  role: UserRole;
}

const Navbar = ({ role }: NavbarProps): JSX.Element => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      {role !== 'student' && (
        <Menu.Item>
          <Link to="/users">Users</Link>
        </Menu.Item>
      )}
      <Menu.Item>
        <Link to="/tasks">Tasks</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/review-requests">Review Requests</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/reviews">Reviews</Link>
      </Menu.Item>
      {role !== 'student' && (
        <Menu.Item>
          <Link to="/sessions">Cross-Check Sessions</Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
