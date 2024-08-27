import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

const FilterButton = ({ text, icon, onClick, isAllScreen, selectedText }) => {
  const { t } = useTranslation();

  return (
    <StyledFilterButton onClick={onClick} isAllScreen={isAllScreen}>
      <LeftContent>
        <span>{text}</span>
      </LeftContent>
      <RightContent>
        {isAllScreen && <AllText>{selectedText || t("filters.all")}</AllText>}
        {(!isAllScreen && selectedText) ? (
          <SelectedText>{selectedText}</SelectedText>
        ) : (
          <ImageWrapper isAllScreen={isAllScreen}>
            <img src={icon} alt={text} />
          </ImageWrapper>
        )}
      </RightContent>
    </StyledFilterButton>
  );
}

// 스타일드 컴포넌트
const StyledFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  margin: 3px;
  border-radius: 3px;
  gap: 1.5px;
  border: 0;
  background-color: var(--grey5);
  color: var(--grey1);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;

  ${(props) =>
    props.isAllScreen &&
    css`
      background-color: var(--blue);
      color: var(--black);
      font-weight: 400;
      height: 56px;
      font-size: 14px;
      margin: 0 4px;
      padding: 16px;
      width: calc(100vw - 48px);
      border-bottom: 1px solid var(--grey4);
      
      &:last-child {
        border-bottom: none;
      }
    `}
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

const AllText = styled.span`
  color: var(--sub1);
`;

const ImageWrapper = styled.div`
  width: ${props => props.isAllScreen ? '24px' : '16px'};
  height: ${props => props.isAllScreen ? '24px' : '16px'};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 8px;
`;

const SelectedText = styled.span`
  color: var(--sub1);
  font-size: 11px;
  margin-left: 4px;
`;

export default FilterButton;
