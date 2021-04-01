import React from 'react';
import { isLoggedInVar } from '../apollo';

const Login = () => {
  const login = () => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Log in now!</button>
    </div>
  );
};

export default Login;
