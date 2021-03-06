import React from 'react';
import styled from 'styled-components';

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 600;
  }
`;

const Separator = () => {
  return (
    <SSeparator>
      <div></div>
      <span>OR</span>
      <div></div>
    </SSeparator>
  );
};

export default Separator;
