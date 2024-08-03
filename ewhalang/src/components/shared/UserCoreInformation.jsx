import React from 'react';
import styled from 'styled-components';

const UserCoreInformation = ({ nickname, country }) => {
  return (
    <CoreInfoWrapper>
      <UserNickname>{nickname}</UserNickname>
      <UserCountry>{country}</UserCountry>
    </CoreInfoWrapper>
  );
};

const CoreInfoWrapper = styled.div`
  text-align: center;
`;

const UserNickname = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

const UserCountry = styled.span`
  display: inline-block;
  height: 27px;
  border-radius: 5px;
  background-color: #CAF3E5;
  color: var(--main);
  padding: 0 10px;
  line-height: 27px;
  white-space: nowrap;
`;

export default UserCoreInformation;