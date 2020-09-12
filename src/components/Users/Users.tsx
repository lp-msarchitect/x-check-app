import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUsers } from '../../actions';
import { AppReduxState, UsersState } from '../../models/redux-models';
import { User } from '../../models/data-models';

type State = UsersState;
type AppDispatch = ThunkDispatch<State, void, AnyAction>;

const Students = (): JSX.Element => {
  const users = useSelector<AppReduxState, UsersState>((state) => state.users);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const items = Object.values(users).map((item: User) => {
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
