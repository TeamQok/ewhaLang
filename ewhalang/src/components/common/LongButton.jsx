import React from 'react';
import styled from 'styled-components';
import ButtonType from './ButtonType';

// 스타일드 컴포넌트로 버튼 스타일 정의
const StyledButton = styled.button`
  width: 345px;
  height: 45px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
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

// LongButton 컴포넌트
const LongButton = ({ type = ButtonType.GREEN, onClick, children }) => {
  return (
    <StyledButton buttonType={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export { LongButton, ButtonType };