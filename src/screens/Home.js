import React from 'react';
import { logUserOut } from '../apollo';

const Home = () => {
  const logout = () => {
    logUserOut();
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Log out now!</button>
    </div>
  );
};

export default Home;
