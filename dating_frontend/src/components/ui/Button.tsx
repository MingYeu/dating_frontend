import styled from 'styled-components';
import React from 'react'

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  background-color: #1890ff;
  height: 4rem;
  width: 14rem;
  border-radius: 3px;
  span {
    height: 2rem;
  }
  
  span:first-child {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 2rem;
    height: 1.7rem;
  }
  span:last-child {
    margin-right: .2rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  text: string;
};

const CustomButton: React.FC<ButtonProps> = ({ children, text }) => {
  return (
    <StyledButton>
      <span>
        {children}
      </span>
      <span>{text}</span>
    </StyledButton>
  );
};

export default CustomButton;