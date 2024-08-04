import * as S from './ChattingPage.style'
import React, { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import MessageList from '../components/pages/MessageList';
import InputArea from '../components/pages/InputArea';
import BottomBar from '../components/layout/BottomBar';
import { messageMockData } from '../_mock/messageMockData';

const ChattingPage = () => {
  const [messages, setMessages] = useState(messageMockData);
  const currentUserId = 'user1'; // 현재 로그인한 사용자 ID
  //상대 프로필 이미지
  const userProfileImage = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MjhfMyAg%2FMDAxNzE5NTczNzg3NjYx.lRK9pY8J_VEfzNiL3qHMPwmcNdBL65aD9lKn23Wjf0Ug.aylqzl8DULXmKE8Pn0XUpLCZED42qGLVXhz6ZFcV47sg.JPEG%2FIMG_0544.jpg&type=sc960_832';
  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      userId: currentUserId,
      timestamp: new Date().toLocaleTimeString(),
      isUnread: false
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <Topbar title={"채팅"} />
        <S.MessageListContainer>
          <MessageList messages={messages} currentUserId={currentUserId} userProfileImage={userProfileImage} />
        </S.MessageListContainer>
      </S.ContentWrapper>
      <S.InputAreaContainer>
          <InputArea onSendMessage={handleSendMessage} />
        </S.InputAreaContainer>
    </S.Wrapper>
  );
};

export default ChattingPage;