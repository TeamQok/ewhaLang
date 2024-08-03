// ChatBox.jsx
import React from 'react';
import PropTypes from 'prop-types';
import * as S from './ChatList.style';
import UserImage from '../shared/UserImage';

const ChatBox = ({ chat }) => {
    const formatTime = (date) => {
        return new Intl.DateTimeFormat('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(date);
      };

  return (
    <S.ChatItemWrapper>
        <UserImage profilePicture={chat.otherUser.profilePicture} alt={chat.otherUser.nickname} width={68} height={68}/>
      <S.ChatInfo>
        <S.UserInfoWrapper>
          <S.Nickname>{chat.otherUser.nickname}</S.Nickname>
          <S.Separator>|</S.Separator>
          <S.Country>{chat.otherUser.country}</S.Country>
        </S.UserInfoWrapper>
        <S.LastMessage>{chat.lastMessage.text}</S.LastMessage>
      </S.ChatInfo>
      <S.ChatTime>
        {formatTime(chat.lastMessage.createdAt)}
      </S.ChatTime>
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