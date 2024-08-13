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
  const [loading, setLoading] = useState(true);
  const currentUserId = 'user1'; // 현재 로그인한 사용자 ID
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
          const chatDoc = await getDoc(doc(firestore, "chats", chatId));
          if (chatDoc.exists()) {
            const data = chatDoc.data();
            setChatData(data);

            const messagesSnapshot = await getDocs(collection(firestore, `chats/${chatId}/messages`));
            if (!messagesSnapshot.empty) {
              const batch = writeBatch(firestore);
              const messagesData = messagesSnapshot.docs.map(doc => {
                const messageData = doc.data();
                if (messageData.senderId !== currentUserId && !messageData.isRead) {
                  batch.update(doc.ref, { isRead: true });
                }
                return messageData;
              });
              await batch.commit();

              messagesData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
              setMessages(messagesData);

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
    return <div>Loading...</div>;
  }

  if (!chatData) {
    return <div>Chat not found.</div>;
  }

  const otherUserId = chatData.participantsId.find(id => id !== currentUserId);
  const otherUser = chatData.participantsInfo[otherUserId];

  const handleSendMessage = async (text) => {
    const newMessage = {
      messageId: Date.now().toString(),
      senderId: currentUserId,
      content: text,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    try {
      await addDoc(collection(firestore, `chats/${chatId}/messages`), newMessage);

      await updateDoc(doc(firestore, "chats", chatId), {
        [`unreadCounts.${otherUserId}`]: increment(1),
        lastMessage: newMessage
      });
  
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

  const leaveChat = async (chatId, currentUserId) => {
    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        isDeleted: true
      });
    } catch (error) {
      console.error("Error leaving chat:", error);
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
        guideText="채팅방을 나가면 채팅 목록 및 대화 내용이 삭제되고 복구할 수 없어요. 채팅방에서 정말 나가시겠습니까?"
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
          leaveChat(chatId, currentUserId)
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