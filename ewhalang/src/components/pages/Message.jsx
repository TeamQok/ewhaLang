import React from 'react';
import styled from 'styled-components';
import UserImage from '../shared/UserImage';

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


const Message = ({ text, userId, currentUserId, createdAt, isUnread, userProfileImage }) => {
  const isCurrentUser = userId === currentUserId;

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <MessageContainer isCurrentUser={isCurrentUser}>
    {!isCurrentUser && <UserImage profilePicture={userProfileImage} alt="User profile" width={40} height={40}/>}
    <MessageContent isCurrentUser={isCurrentUser}>
    <MessageBubble isCurrentUser={isCurrentUser}>
        {text}
      </MessageBubble>
      <MessageInfo isCurrentUser={isCurrentUser}>
          {formatTime(createdAt)}
          {isUnread && <span style={{ color: 'var(--sub1)' }}>1</span>}
      </MessageInfo>
    </MessageContent>
    </MessageContainer>
  );
};

export default Message;