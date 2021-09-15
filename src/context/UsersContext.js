import React, {createContext, useReducer} from 'react';
import users from '../data/users';

export default UsersContext = createContext({});
const actions = {
  createUser(state, action) {
    const user = action.payload;
    user.id = Math.random();
    return {...state, users: [...state.users, user]};
  },
  deleteUser(state, action) {
    const user = action.payload;
    return {...state, users: state.users.filter(u => u.id !== user.id)};
  },
  updateUser(state, action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.map(u => (u.id === user.id ? user : u)),
    };
  },
};
export const UsersProvider = props => {
  const initialState = {users};
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UsersContext.Provider value={{state, dispatch}}>
      {props.children}
    </UsersContext.Provider>
  );
};
