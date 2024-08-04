import * as S from './ChattingPage.style'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/layout/Topbar';
import MessageList from '../components/pages/MessageList';
import InputArea from '../components/pages/InputArea';
import BottomBar from '../components/layout/BottomBar';
import { messageMockData } from '../_mock/messageMockData';
import { Nickname, Separator, Country } from '../components/pages/ChatList.style'
import ShortDropDown from '../components/shared/ShortDropDown';
import Modal from '../components/common/Modal';

const ChattingPage = () => {
  const [messages, setMessages] = useState(messageMockData);
  const currentUserId = 'user1'; // 현재 로그인한 사용자 ID
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const [isChatOutModalOpen, setIsChatOutModalOpen] = useState(false);
  const [isChatOutConfirmOpen, setIsChatOutConfirmOpen] = useState(false);

  const navigate = useNavigate();

  //상대방 정보
  const otherUser = {
    nickname: 'John Doe',
    country: '미국',
    profilePicture: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MjhfMyAg%2FMDAxNzE5NTczNzg3NjYx.lRK9pY8J_VEfzNiL3qHMPwmcNdBL65aD9lKn23Wjf0Ug.aylqzl8DULXmKE8Pn0XUpLCZED42qGLVXhz6ZFcV47sg.JPEG%2FIMG_0544.jpg&type=sc960_832'
  };
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

  const options = ['채팅방 나가기', '신고하기'];

  const handleDotClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelect = (option) => {
    setIsDropDownOpen(false);

    if(option === '채팅방 나가기'){
      setIsChatOutModalOpen(true);
    } else if(option === '신고하기'){
      setIsReportModalOpen(true);
    }
  };

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <Topbar title={
          <S.Title>
            <Nickname>{otherUser.nickname}</Nickname>
            <Separator>|</Separator>
            <Country>{otherUser.country}</Country>
          </S.Title>
        } left={"back"} right="dot" rightonClick={handleDotClick} />
        <S.MessageListContainer>
          <MessageList messages={messages} currentUserId={currentUserId} userProfileImage={otherUser.profilePicture} />
        </S.MessageListContainer>
      </S.ContentWrapper>
      <ShortDropDown options={options} onSelect={handleSelect} isOpen={isDropDownOpen} />
      <Modal
        isOpen={isReportModalOpen}
        guideText="신고 사유를 작성해주세요."
        confirmText="작성완료"
        onConfirm={() => {
          setIsReportModalOpen(false);
          setIsReportConfirmOpen(true);
        }}
        isSingleButton={true}
        showTextInput={true}
      />
      <Modal
        isOpen={isReportConfirmOpen}
        guideText="신고를 완료했습니다."
        confirmText="확인"
        onConfirm={() => {
          setIsReportConfirmOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      <Modal
        isOpen={isChatOutModalOpen}
        guideText="채팅방을 정말 나가시겠습니까?"
        confirmText="예"
        cancelText="아니오"
        onConfirm={() => {
          setIsChatOutModalOpen(false);
          setIsChatOutConfirmOpen(true);
        }}
        onCancel={() => {
          setIsChatOutModalOpen(false);
        }}
        isSingleButton={false}
        showTextInput={false}
      />
      <Modal
        isOpen={isChatOutConfirmOpen}
        guideText="채팅방 나가기를 완료했습니다."
        confirmText="확인"
        onConfirm={() => {
          setIsChatOutConfirmOpen(false);
          navigate('/chats');
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      <S.InputAreaContainer>
          <InputArea onSendMessage={handleSendMessage} />
        </S.InputAreaContainer>
    </S.Wrapper>
  );
};

export default ChattingPage;