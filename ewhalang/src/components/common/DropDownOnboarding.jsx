import React, { useState } from "react";
import styled from "styled-components";
import arrowDown from "../../assets/arrowDown.svg";

const DropDownContainer = styled.div`
  width: ${(props) => (props.isLong ? "100%" : "48%")};
  position: relative;
`;

const DropDownHeader = styled.div`
  height: 40px;
  padding: 10px;
  border: none;
  background-color: white;
  border-radius: 12px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 10px; // 화살표 아이콘과의 간격
`;

const DropDownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  border: none;
  border-radius: 12px;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background-color: white;
  box-sizing: border-box;
`;

const ListItem = styled.li`
  list-style: none;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--grey4);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

  &:first-child {
    border-top: none;
  }
`;

const ListItemText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
`;

const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const DropDownOnboarding = ({
  options,
  isLong = false,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <DropDownContainer isLong={isLong}>
      <DropDownHeader onClick={toggling} isPlaceholder={!selectedOption}>
        <HeaderText>{selectedOption || placeholder}</HeaderText>
        <ArrowIcon src={arrowDown} alt="arrow down" />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={option}>
                <ListItemText>{option}</ListItemText>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default DropDownOnboarding;
