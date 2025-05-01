import React from "react";
import styled from "styled-components";

const Button2 = ({ text, width, createPrivateRoom, loading }) => {
  return (
    <StyledWrapper onClick={createPrivateRoom}>
      <button className={width}>{text}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    background-color: #f3f7fe;
    color: #3b82f6;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    width: 120px;
    height: 40px;
    transition: 0.3s;
  }

  button:hover {
    background-color: #3b82f6;
    box-shadow: 0 0 0 5px #3b83f65f;
    color: #fff;
  }
`;

export default Button2;
