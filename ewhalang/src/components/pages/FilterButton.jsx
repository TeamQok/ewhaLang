import React from 'react';
import styled from 'styled-components';

const FilterButton = ({ text, icon, onClick }) => (
    <StyledFilterButton onClick={onClick}>
      <span>{text}</span>
      <ImageWrapper>
      <img src={icon} alt={text} />
      </ImageWrapper>
    </StyledFilterButton>
  );

  // 스타일드 컴포넌트
const StyledFilterButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
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
`;

const ImageWrapper = styled.div`
width: 16px;
height: 16px;
display: flex;
flex-wrap: wrap;
justify-content: center;
`

export default FilterButton;