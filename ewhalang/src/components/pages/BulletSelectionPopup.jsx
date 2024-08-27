import React from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import { LongButton, ButtonType } from '../common/LongButton';
import { useTranslation } from 'react-i18next';

const BulletSelectionPopup = ({ isOpen, onClose, title, options, selectedOption, toggleOption, fullScreen, onApply }) => {
  const handleApply = () => {
    onApply(selectedOption);
    onClose();
  };

  const { t } = useTranslation();
  
  return (
    <Popup isOpen={isOpen} onClose={onClose} title={title} fullScreen={fullScreen}>
      <OptionList>
        {options.map((option) => (
          <OptionItem key={option} onClick={() => toggleOption(option)} isSelected={selectedOption === option}>
            <Bullet isSelected={selectedOption === option} />
            <span>{option}</span>
          </OptionItem>
        ))}
      </OptionList>
      <ButtonWrapper>
        <LongButton type={ButtonType.GREEN} onClick={handleApply}>
          {t("filters.select")}
        </LongButton>
      </ButtonWrapper>
    </Popup>
  );
};

const OptionList = styled.div`
  margin: 13px 0 60px 0;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  cursor: pointer;
  padding: 0 20px;
`;

const Bullet = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: ${props => props.isSelected ? 'var(--sub1)' : 'var(--grey4)'};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: calc(100% - 48px);
  bottom: 0;
  background-color: white;
  padding: 20px 0;
`;

export default BulletSelectionPopup;
