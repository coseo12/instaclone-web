import React from 'react';
import styled from 'styled-components';
import { darkModeVar } from '../apollo';
// import { isLoggedInVar } from '../apollo';

const Title = styled.h1`
  color: ${props => props.theme.fontColor};
`;

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`;

const Login = () => {
  // const login = () => {
  //   isLoggedInVar(true);
  // };

  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>to dark!</button>
      <button onClick={() => darkModeVar(false)}>to light!</button>
    </Container>
  );
};

export default Login;
