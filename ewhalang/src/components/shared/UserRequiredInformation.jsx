import React from 'react';
import styled from 'styled-components';

const UserRequiredInformation = ({ gender, birthdate, major, languages }) => {
  const formatLanguages = (languages) => {
    return languages.map(lang => `${lang.language}(${lang.level})`).join('\n');
  };

  const requiredInfo = [
    { label: '성별', value: gender },
    { label: '출생년도', value: birthdate },
    { label: '전공', value: major },
    { label: '사용 가능 언어', value: formatLanguages(languages) },
  ];

  return (
    <InformationSection>
      {requiredInfo.map((info, index) => (
        <InfoItem key={index} label={info.label} value={info.value} />
      ))}
    </InformationSection>
  );
};

const InfoItem = ({ label, value }) => {
  const isLanguage = label === '사용 가능 언어';
  return (
    <Item isLanguage={isLanguage}>
      <Label>{label}</Label>
      {isLanguage ? (
        <LanguageValue>
          {value.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </LanguageValue>
      ) : (
        <Value>{value}</Value>
      )}
    </Item>
  );
};

const InformationSection = styled.div`
  margin: 0 24px 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isLanguage }) => (isLanguage ? 'flex-start' : 'center')};
  margin-bottom: 16px;
  min-height: 24px;
`;

const Label = styled.span`
  font-weight: 600;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: var(--grey1);
  text-align: right;
`;

const LanguageValue = styled(Value)`
  color: var(--sub1);
  white-space: pre-line;
  text-align: right;

  & > div {
    margin-top: 8px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export default UserRequiredInformation;