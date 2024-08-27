import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LanguageLevelInfo = () => {
  const { t } = useTranslation();

  const Levels = [
    { level: 'basic', color: 'var(--sub3)' },
    { level: 'intermediate', color: 'var(--sub2)' },
    { level: 'advanced', color: '#86E8C7' },
    { level: 'native', color: '#40C79A' },
  ];

  return (
    <Wrapper>
      <Title>{t('userList.langLevel')}</Title>
      <LevelWrapper>
        {Levels.map(({ level, color }) => (
          <LevelItem key={level}>
            <ColorCircle color={color} />
            <LevelText>{t(`userList.${level}`)}</LevelText>
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