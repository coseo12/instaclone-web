import React from 'react';
import { isLoggedInVar } from '../apollo';

const Home = () => {
  const logout = () => {
    isLoggedInVar(false);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Log out now!</button>
    </div>
  );
};

export default Home;
