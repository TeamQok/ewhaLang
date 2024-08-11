import * as S from './ChattingPage.style';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, addDoc, getDoc, updateDoc, increment, writeBatch } from 'firebase/firestore';
import { firestore } from '../firebase';
import Topbar from '../components/layout/Topbar';
import MessageList from '../components/pages/MessageList';
import InputArea from '../components/pages/InputArea';
import { Nickname, Separator, Country } from '../components/pages/ChatList.style';
import ShortDropDown from '../components/shared/ShortDropDown';
import Modal from '../components/common/Modal';

const ChattingPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const currentUserId = 'user3'; // 현재 로그인한 사용자 ID
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const [isChatOutModalOpen, setIsChatOutModalOpen] = useState(false);
  const [isChatOutConfirmOpen, setIsChatOutConfirmOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatData = async () => {
      if (chatId) {
        try {
          // Firestore에서 채팅 데이터 가져오기
          const chatDoc = await getDoc(doc(firestore, "chats", chatId));
          if (chatDoc.exists()) {
            const data = chatDoc.data();
            setChatData(data);

            // Firestore에서 메시지 데이터 가져오기
            const messagesSnapshot = await getDocs(collection(firestore, `chats/${chatId}/messages`));
            if (!messagesSnapshot.empty) {
              const batch = writeBatch(firestore);
              const messagesData = messagesSnapshot.docs.map(doc => {
                const messageData = doc.data();
                // 상대방이 보낸 메시지의 isRead를 true로 변경
                if (messageData.senderId !== currentUserId && !messageData.isRead) {
                  batch.update(doc.ref, { isRead: true });
                }
                return messageData;
              });
              // 배치 업데이트 실행
              await batch.commit();

              // 메시지를 시간 기준 오름차순으로 정렬
              messagesData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
              setMessages(messagesData);

              // unreadCount를 0으로 초기화
              await updateDoc(doc(firestore, "chats", chatId), {
              [`unreadCounts.${currentUserId}`]: 0
              });
            } else {
              setMessages([]);
            }
          } else {
            console.error("No such chat document!");
          }
        } catch (error) {
          console.error("Error fetching chat data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChatData();
  }, [chatId]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!chatData) {
    return <div>Chat not found.</div>; // 채팅 데이터를 찾을 수 없을 때 표시할 컴포넌트
  }

  const otherUser = chatData.participants.find(p => p.userId !== currentUserId);

  const handleSendMessage = async (text) => {
    const newMessage = {
      messageId: Date.now().toString(),
      senderId: currentUserId,
      content: text,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    try {
      // Firestore의 messages 서브컬렉션에 메시지 추가
      await addDoc(collection(firestore, `chats/${chatId}/messages`), newMessage);

      // 상대방의 unreadCount 증가
      // Firestore의 chats 컬렉션의 lastMessage 업데이트
      const otherUserId = otherUser.userId;
      await updateDoc(doc(firestore, "chats", chatId), {
        [`unreadCounts.${otherUserId}`]: increment(1),
        lastMessage: newMessage
      });
  
      // 로컬 상태 업데이트
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
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
          <MessageList messages={messages} currentUserId={currentUserId} userProfileImage={otherUser.profilePhoto} />
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
