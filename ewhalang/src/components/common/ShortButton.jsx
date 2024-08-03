import React from 'react';
import styled from 'styled-components';
import ButtonType from './ButtonType'; // ButtonType을 import

const StyledButton = styled.button`
  width: 17vw; // ShortButton의 width
  height: 40px; // ShortButton의 height
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  background-color: ${props => props.buttonType.background};
  color: ${props => props.buttonType.color};
  border: ${props => props.buttonType.border};
`;

const ShortButton = ({ type = ButtonType.GREEN, onClick, children }) => {
  return (
    <StyledButton buttonType={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export { ShortButton };