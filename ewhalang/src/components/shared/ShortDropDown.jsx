import React from 'react';
import styled from 'styled-components';

const ShortDropDown = ({ options, onSelect, isOpen }) => {
  if (!isOpen) return null;

  return (
    <DropDownContainer>
      <DropDownList>
        {options.map((option, index) => (
          <ListItem key={index} onClick={() => onSelect(option)}>
            {option}
          </ListItem>
        ))}
      </DropDownList>
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: absolute;
  min-width: 116px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  top: 45px; // Topbar 아래에 위치하도록 설정
  right: 0; // 오른쪽 정렬
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  height: 52px;
  padding: 8px 33px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f8f8f8;
  }

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export default ShortDropDown;