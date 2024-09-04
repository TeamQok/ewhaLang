import React from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import { LongButton, ButtonType } from '../common/LongButton';
import searchIcon from '../../assets/searchIcon.svg';
import resetIcon from '../../assets/reset.svg';
import { useTranslation } from 'react-i18next';

const SelectIcon = ({ isSelected }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke={isSelected ? "var(--sub1)" : "var(--grey1)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SelectionPopup = ({
  isOpen,
  onClose,
  title,
  items,
  selectedItems,
  toggleItem,
  searchTerm,
  setSearchTerm,
  showSearch,
  fullScreen,
  onApply,
  onReset
}) => {
  const { t } = useTranslation();

  const handleApply = () => {
    onApply(selectedItems);
    onClose();
  };

  console.log(searchTerm);

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title} fullScreen={fullScreen}>
      <StickyContainer>
        {showSearch && (
          <SearchInputWrapper>
            <SearchInput 
              placeholder={t("placeholder.searchCountry")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="Search" />
          </SearchInputWrapper>
        )}
      </StickyContainer>
      <ItemList>
        {items.map((item) => (
          <Item key={item.key} onClick={() => toggleItem(item.key)} isSelected={selectedItems.includes(item.key)}>
            <SelectIconWrapper>
              <SelectIcon isSelected={selectedItems.includes(item.key)}/>
            </SelectIconWrapper>
            <span>{item.value}</span>
          </Item>
        ))}
      </ItemList>
      <ButtonWrapper>
        {!fullScreen && (
          <ResetButton onClick={onReset}>
            <img src={resetIcon} alt="Reset" />
            <span>{t("filters.reset")}</span>
          </ResetButton>
        )}
        <LongButton type={ButtonType.GREEN} onClick={handleApply}>
        {t("filters.select")}
        </LongButton>
      </ButtonWrapper>
    </Popup>
  );
}

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
  display: flex;
  gap: 10px;
`;

const ResetButton = styled.button`
  min-width: 45px;
  min-height: 45px;
  border: 0.5px solid var(--grey3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  img {
    width: 16px;
    height: 16px;
  }
  span {
    padding-top: 2px;
    font-size: 11px;
    width: 29px;
  }
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