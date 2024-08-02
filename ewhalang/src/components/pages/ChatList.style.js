// ChatList.style.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px;
`;

export const ChatItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
`;

export const ChatInfo = styled.div`
  flex: 1;
  margin-left: 24px;
  margin-top: 8px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 4px;
`;

export const Nickname = styled.h3`
  font-size: 16px;
`;

export const Separator = styled.span`
  color: var(--black);
  font-weight: 400;
`;

export const Country = styled.p`
  margin: 0.25rem 0;
  font-size: 16px;
  font-weight: 400;
`;

export const LastMessage = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const ChatTime = styled.div`
  font-size: 11px;
  font-weight: 400;
  color: var(--grey1);
  padding-top: 13px;
  margin-left: 5px;
`;