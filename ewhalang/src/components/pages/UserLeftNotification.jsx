import React from 'react';
import styled from 'styled-components';

const NotificationWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
  color: #888;
  font-size: 0.9em;
`;

const UserLeftNotification = () => (
  <NotificationWrapper>
    상대방이 채팅방을 나갔습니다.
  </NotificationWrapper>
);

export default UserLeftNotification;