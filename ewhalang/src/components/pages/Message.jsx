import React from 'react';
import styled from 'styled-components';
import UserImage from '../shared/UserImage';
import { useNavigate } from 'react-router-dom';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 20px;
  align-items: flex-end;
  gap: 8px;
  overflow: hidden;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
  align-items: flex-end;
  gap: 6px;
`;

const MessageBubble = styled.div`
  max-width: 60vw;
  font-size: 16px;
  word-break: break-word;
  border-radius: 16px;
  padding: 10px;
  background-color: ${props => props.isCurrentUser ? 'var(--sub1)' : 'var(--grey5)'};
  color: ${props => props.isCurrentUser ? 'var(--white)' : 'var(--black)'};
`;

const MessageInfo = styled.div`
  font-size: 11px;
  text-align: ${props => props.isCurrentUser? 'right' : 'left'};
  display: flex;
  flex-direction: column-reverse;
  color: var(--grey1);
  min-width: 12.5vw;
`;

const Message = ({ content, senderId, currentUserId, timestamp, isRead, userProfileImage }) => {
  const isCurrentUser = senderId === currentUserId;
  const navigate = useNavigate();

  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(Date.parse(timestamp))) {
      console.error('Invalid timestamp:', timestamp);
      return '';
    }
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const handleImageClick = () => {
    navigate(`/users/${senderId}`);
  }

  return (
    <MessageContainer isCurrentUser={isCurrentUser}>
      {!isCurrentUser && <UserImage profilePhoto={userProfileImage} alt="User profile" width={40} height={40} onClick={handleImageClick}/>}
      <MessageContent isCurrentUser={isCurrentUser}>
        <MessageBubble isCurrentUser={isCurrentUser}>
          {content}
        </MessageBubble>
        <MessageInfo isCurrentUser={isCurrentUser}>
          {formatTime(timestamp)}
          {!isRead && isCurrentUser && <span style={{ color: 'var(--sub1)' }}>1</span>}
        </MessageInfo>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
