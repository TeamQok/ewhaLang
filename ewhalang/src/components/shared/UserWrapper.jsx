import React from 'react';
import styled from 'styled-components';

// 메인 컴포넌트
const UserWrapper = ({ user }) => {
  return (
    <Wrapper>
      <UserImageWrapper user={user} />
      <UserInformationWrapper user={user} />
    </Wrapper>
  );
};

// 사용자 이미지, 닉네임, 국적을 포함하는 컴포넌트
const UserImageWrapper = ({ user }) => {
  return (
    <ImageWrapper>
      <UserProfileImage src={user.profilePicture} alt={user.nickname} />
      <UserNickname>{user.nickname}</UserNickname>
      <UserCountry>{user.country}</UserCountry>
    </ImageWrapper>
  );
};

// 사용자 정보를 포함하는 컴포넌트
const UserInformationWrapper = ({ user }) => {
  return (
    <InformationWrapper>
      <RequiredInformation user={user} />
      <OptionalInformation user={user} />
    </InformationWrapper>
  );
};

// 필수 정보 컴포넌트
const RequiredInformation = ({ user }) => {
  const formatLanguages = (languages) => {
    return languages.map(lang => `${lang.language}(${lang.level})`).join('\n');
  };

  const requiredInfo = [
    { label: '성별', value: user.gender },
    { label: '출생년도', value: user.birthdate },
    { label: '전공', value: user.major },
    { label: '사용 가능 언어', value: formatLanguages(user.languages) },
  ];

  return (
    <InformationSection>
      {requiredInfo.map((info, index) => (
        <InfoItem key={index} label={info.label} value={info.value} />
      ))}
    </InformationSection>
  );
};

// 선택 정보 컴포넌트
const OptionalInformation = ({ user }) => {
  const optionalInfo = [
    { label: '취미 및 관심사', value: user.hobby || '없음' },
    { label: '자기소개', value: user.introduction || '없음' },
  ];

  return (
    <InformationSection>
      {optionalInfo.map((info, index) => (
        <InfoItem key={index} label={info.label} value={info.value} />
      ))}
    </InformationSection>
  );
};

// 정보 항목 컴포넌트
const InfoItem = ({ label, value }) => {
    const isLanguage = label === '사용 가능 언어';
    const isIntroduction = label === '자기소개';
    return (
      <Item isIntroduction={isIntroduction} isLanguage={isLanguage}>
        <Label>{label}</Label>
        {isIntroduction ? (
          <IntroductionValue>{value}</IntroductionValue>
        ) : isLanguage ? (
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

// 스타일드 컴포넌트
const Wrapper = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const UserProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 18px;
`;

const UserNickname = styled.div`
    height: 24px;
`;

const UserCountry = styled.div`
  display: inline-block;
  height: 27px;
  border-radius: 5px;
  background-color: #CAF3E5;
  color: var(--main);
  padding: 0 10px;
  line-height: 27px; // 수직 중앙 정렬을 위해 추가
`;

const InformationWrapper = styled.div`
  padding-top: 32px;
  margin-top: 32px;
  border-top: 1px solid var(--grey4);
`;

const InformationSection = styled.div`
  margin: 0 24px 20px;
  &:not(:last-child) {
    margin-bottom: 32px; /* 다음 섹션과의 간격을 32px로 설정 */
    border-bottom: 3px solid var(--grey4);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ isIntroduction, isLanguage }) => (isIntroduction || isLanguage ? 'flex-start' : 'center')};
  margin-bottom: 16px;
  min-height: 24px;
  flex-direction: ${({ isIntroduction }) => (isIntroduction ? 'column' : 'row')};
`;

const Label = styled.span`
  font-weight: 600;
  flex-shrink: 0;
`;

const Value = styled.span`
  color: var(--grey1);
  text-align: right;
`;

const IntroductionValue = styled(Value)`
  margin-top: 8px;
  text-align: left;
  width: 100%;
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


export default UserWrapper;