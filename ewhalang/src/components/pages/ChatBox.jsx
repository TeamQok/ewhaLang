// ChatBox.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './ChatList.style';
import UserImage from '../shared/UserImage';

const ChatBox = ({ chat, loggedInUserId }) => {
  const navigate = useNavigate();
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
        return new Intl.DateTimeFormat('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(date);
      };

  const otherUser = chat.participants.find(p => p.userId !== loggedInUserId);
  const unreadCount = chat.unreadCounts[loggedInUserId] || 0;

  const handleClick = () => {
    navigate(`/chats/${chat.channelId}`);
};
  
  return (
    <S.ChatItemWrapper onClick={handleClick}>
        <UserImage profilePicture={otherUser.profilePicture} alt={otherUser.nickname} width={68} height={68}/>
      <S.ChatInfo>
        <S.UserInfoWrapper>
          <S.Nickname>{otherUser.nickname}</S.Nickname>
          <S.Separator>|</S.Separator>
          <S.Country>{otherUser.country}</S.Country>
        </S.UserInfoWrapper>
        <S.LastMessage>{chat.lastMessage.content}</S.LastMessage>
      </S.ChatInfo>
      <S.ChatTimeAndUnreadWrapper>
        <S.ChatTime>
          {formatTime(chat.lastMessage.timestamp)}
        </S.ChatTime>
        {unreadCount > 0 && (
          <S.UnreadCount>{unreadCount}</S.UnreadCount>
        )}
      </S.ChatTimeAndUnreadWrapper>
    </S.ChatItemWrapper>
  );
};

ChatBox.propTypes = {
  chat: PropTypes.shape({
    channelId: PropTypes.string.isRequired,
    otherUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    }).isRequired,
    lastMessage: PropTypes.shape({
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChatBox;