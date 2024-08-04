import React from 'react';
import styled from 'styled-components';

const UserCoreInformation = ({ nickname, country, layout = 'detail' }) => {
  return (
    <CoreInfoWrapper layout={layout}>
      <UserNickname layout={layout}>{nickname}</UserNickname>
      {layout === 'list' && <Separator>|</Separator>}
      <UserCountry layout={layout}>{country}</UserCountry>
    </CoreInfoWrapper>
  );
};

const CoreInfoWrapper = styled.div`
  display: ${({ layout }) => (layout === 'list' ? 'flex' : 'block')};
  align-items: ${({ layout }) => (layout === 'list' ? 'center' : 'initial')};
  text-align: ${({ layout }) => (layout === 'list' ? 'left' : 'center')};
  gap: ${({ layout }) => (layout === 'list' ? '0.25em' : '0')};
  margin-top: ${({ layout }) => (layout === 'list' ? '4px' : '0')};
  min-height: ${({ layout }) => (layout === 'list' ? '24px' : '0')};
  font-size: ${({ layout }) => (layout === 'list' ? '14px' : '16px')};
`;

const UserNickname = styled.div`
  font-weight: 600;
  margin-bottom: ${({ layout }) => (layout === 'list' ? '0' : '8px')};
`;

const Separator = styled.span`
  color: var(--grey3);
  font-weight: 600;
`;

const UserCountry = styled.span`
  font-weight: 600;
  ${({ layout }) =>
    layout === 'detail' &&
    `
    display: inline-block;
    height: 27px;
    border-radius: 5px;
    background-color: #CAF3E5;
    color: var(--main);
    padding: 0 10px;
    line-height: 27px;
    white-space: nowrap;
  `}
`;

export default UserCoreInformation;