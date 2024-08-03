import React from 'react';
import styled from 'styled-components';

const UserOptionalInformation = ({ hobby, introduction }) => {
  const optionalInfo = [
    { label: '취미 및 관심사', value: hobby || '없음' },
    { label: '자기소개', value: introduction || '없음' },
  ];

  return (
    <InformationSection>
      {optionalInfo.map((info, index) => (
        <InfoItem key={index} label={info.label} value={info.value} />
      ))}
    </InformationSection>
  );
};

const InformationSection = styled.div`
  margin: 0 24px 24px;
`;

const InfoItem = ({ label, value }) => {
  const isIntroduction = label === '자기소개';
  return (
    <Item isIntroduction={isIntroduction}>
      <Label>{label}</Label>
      <Value isIntroduction={isIntroduction}>{value}</Value>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  flex-direction: ${({ isIntroduction }) => (isIntroduction ? 'column' : 'row')};
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  min-height: 24px;
`;

const Label = styled.span`
  font-weight: 600;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: var(--grey1);
  text-align: ${({ isIntroduction }) => (isIntroduction ? 'left' : 'right')};
  margin-top: ${({ isIntroduction }) => (isIntroduction ? '8px' : '0')};
  width: ${({ isIntroduction }) => (isIntroduction ? '100%' : 'auto')};
    word-break: ${({ isIntroduction }) => (isIntroduction ? 'break-word' : 'normal')};
`;

export default UserOptionalInformation;