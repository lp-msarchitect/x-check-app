import React, { useState, useEffect } from 'react';
import { User } from '../../models/data-models';
import DataService from '../../services/data-service';

const Students = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  const items = users.map((item: User) => {
    return <div key={item.githubId}>{item.githubId}</div>;
  });

  useEffect(() => {
    const dataService = new DataService();
    dataService
      .getAllUsers()
      .then((body) => {
        setUsers(body || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div>
        <div>Students</div>
        <div>{items}</div>
      </div>
    </div>
  );
};

export default Students;
