// src/components/pages/LanguageProficiencyInfo.jsx

import React from 'react';
import styled from 'styled-components';

const Levels = [
  { level: '기초', color: 'var(--sub3)' },
  { level: '중급', color: 'var(--sub2)' },
  { level: '상급', color: '#86E8C7' },
  { level: '원어민', color: '#40C79A' },
];

const LanguageLevelInfo = () => {
  return (
    <Wrapper>
      <Title>언어 숙련도</Title>
      <LevelWrapper>
        {Levels.map(({ level, color }) => (
          <LevelItem key={level}>
            <ColorCircle color={color} />
            <LevelText>{level}</LevelText>
          </LevelItem>
        ))}
      </LevelWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 24px;
  display: flex;
`;

const Title = styled.span`
  font-size: 11px;
  font-weight: 600;
  margin-right: 10px;
`;

const LevelWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LevelItem = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ColorCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 4px;
`;

const LevelText = styled.span`
  font-size: 11px;
`;

export default LanguageLevelInfo;
