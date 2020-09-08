import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUsers } from '../../actions';
import { User } from '../../models/data-models';
import { AppReduxState } from '../../models/redux-models';

type State = User[];
type AppDispatch = ThunkDispatch<State, void, AnyAction>;

const Students = (): JSX.Element => {
  const users = useSelector<AppReduxState, User[]>((state) => state.users);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const items = users.map((item: User) => {
    return <div key={item.githubId}>{item.githubId}</div>;
  });

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
