import React from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import { LongButton, ButtonType } from '../common/LongButton';
import searchIcon from '../../assets/searchIcon.svg';

const SelectIcon = ({ isSelected }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={isSelected ? "var(--sub1)" : "var(--grey1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AllSelectIcon = ({ isSelected }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.24935 10.0003L8.74935 12.5003L13.7493 7.50033M18.3327 10.0003C18.3327 14.6027 14.6017 18.3337 9.99935 18.3337C5.39698 18.3337 1.66602 14.6027 1.66602 10.0003C1.66602 5.39795 5.39698 1.66699 9.99935 1.66699C14.6017 1.66699 18.3327 5.39795 18.3327 10.0003Z" stroke={isSelected ? "var(--sub1)" : "var(--grey1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SelectionPopup = ({
  isOpen,
  onClose,
  title,
  items,
  selectedItems,
  toggleItem,
  toggleAllItems,
  isAllSelected,
  searchTerm,
  setSearchTerm,
  showSearch
}) => (
  <Popup isOpen={isOpen} onClose={onClose} title={title} fullScreen={false}>
    <StickyContainer>
      {showSearch && (
        <SearchInputWrapper>
          <SearchInput 
            placeholder={`나라를 검색하세요.`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="Search" />
        </SearchInputWrapper>
      )}
      <AllSelectWrapper onClick={toggleAllItems} isSelected={isAllSelected}>
        <SelectIconWrapper>
          <AllSelectIcon isSelected={isAllSelected}/>
        </SelectIconWrapper>
        <span>{isAllSelected ? "전체 선택 해제" : "전체 선택"}</span>
      </AllSelectWrapper>
    </StickyContainer>
    <ItemList>
      {items.map((item) => (
        <Item key={item} onClick={() => toggleItem(item)} isSelected={selectedItems.includes(item)}>
          <SelectIconWrapper>
            <SelectIcon isSelected={selectedItems.includes(item)}/>
          </SelectIconWrapper>
          <span>{item}</span>
        </Item>
      ))}
    </ItemList>
    <ButtonWrapper>
      <LongButton type={ButtonType.GREEN} onClick={onClose}>
        선택 완료
      </LongButton>
    </ButtonWrapper>
  </Popup>
);

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  img {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 31px;
    right: 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 10px 10px 10px 40px;
  margin: 20px 0 13px 0;
  border: 1px solid var(--grey3);
  border-radius: 10px;
  font-size: 16px;
  &::placeholder {
    color: #848484;
  }
`;

const AllSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--grey1);
  height: 48px;
  cursor: pointer;
  color: ${props => props.isSelected ? 'var(--sub1)' : 'var(--grey1)'};
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  margin-bottom: 13px;
`;

const ItemList = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  cursor: pointer;
  color: ${props => props.isSelected ? 'var(--sub1)' : 'var(--grey1)'};
  background-color: ${props => props.isSelected ? 'var(--sub3)' : ''};
  &:not(:last-child) {
    border-bottom: 1px solid var(--grey4);
  }
`;

const ButtonWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  padding: 20px 0;
`;

const SelectIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SelectionPopup;
