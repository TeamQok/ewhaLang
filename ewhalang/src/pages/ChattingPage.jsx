import * as S from './ChattingPage.style';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, onSnapshot, getDocs, doc, addDoc, getDoc, updateDoc, increment, writeBatch } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import Topbar from '../components/layout/Topbar';
import MessageList from '../components/pages/MessageList';
import InputArea from '../components/pages/InputArea';
import { Nickname, Separator, Country } from '../components/pages/ChatList.style';
import ShortDropDown from '../components/shared/ShortDropDown';
import Modal from '../components/common/Modal';
import { useTranslation } from 'react-i18next';

const ChattingPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const [isChatOutModalOpen, setIsChatOutModalOpen] = useState(false);
  const [isChatOutConfirmOpen, setIsChatOutConfirmOpen] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ id: user.uid, ...userDoc.data() });
        } else {
          console.log("No such document!");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchChatData = async () => {
      if (chatId && currentUser) {
        try {
          const chatDoc = await getDoc(doc(firestore, "chats", chatId));
          if (chatDoc.exists()) {
            const data = chatDoc.data();
            setChatData(data);
  
            const messagesRef = collection(firestore, `chats/${chatId}/messages`);
            const unsubscribe = onSnapshot(messagesRef, async (snapshot) => {
              const batch = writeBatch(firestore);
              let messagesData = snapshot.docs.map(doc => {
                const messageData = doc.data();
                if (messageData.senderId !== currentUser.id && !messageData.isRead) {
                  batch.update(doc.ref, { isRead: true });
                }
                return { id: doc.id, ...messageData };
              });
  
              await batch.commit();
  
              // 사용자가 채팅방을 나갔다가 다시 들어온 경우, 나간 시점 이후의 메시지만 필터링
              const userDeletedDate = data.deletedDate[currentUser.id];
              if (userDeletedDate) {
                messagesData = messagesData.filter(msg => 
                  new Date(msg.timestamp) > new Date(userDeletedDate)
                );
              }
  
              messagesData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
              setMessages(messagesData);
  
              await updateDoc(doc(firestore, "chats", chatId), {
                [`unreadCounts.${currentUser.id}`]: 0
              });
            });
  
            return () => unsubscribe();
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
  }, [chatId, currentUser]);

  if (loading || !currentUser) {
    return <div>{t("common.loading")}</div>;
  }

  if (!chatData) {
    return <div>{t("messages.notFound")}</div>;
  }

  const otherUserId = chatData.participantsId.find(id => id !== currentUser.id);
  const otherUser = chatData.participantsInfo[otherUserId];

const handleSendMessage = async (text) => {
  const newMessage = {
    senderId: currentUser.id,
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
  
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

const options = [t("actions.leaveChat"), t("actions.report")];
  const handleDotClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelect = (option) => {
    setIsDropDownOpen(false);

    if(option === t("actions.leaveChat")){
      setIsChatOutModalOpen(true);
    } else if(option === t("actions.report")){
      setIsReportModalOpen(true);
    }
  };

  const leaveChat = async (chatId, currentUserId) => {
    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        [`deletedDate.${currentUserId}`]: new Date().toISOString()
      });
      navigate('/chats');
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
          <MessageList messages={messages} currentUserId={currentUser.id} userProfileImage={otherUser.profileImg} chatData={chatData} />
        </S.MessageListContainer>
      </S.ContentWrapper>
      <ShortDropDown options={options} onSelect={handleSelect} isOpen={isDropDownOpen} />
      <Modal
        isOpen={isReportModalOpen}
        guideText={t("messages.reportReason")}
        confirmText={t("actions.submitReport")}
        onConfirm={() => {
          setIsReportModalOpen(false);
          setIsReportConfirmOpen(true);
        }}
        isSingleButton={true}
        showTextInput={true}
      />
      <Modal
        isOpen={isReportConfirmOpen}
        guideText={t("messages.reportConfirm")}
        confirmText={t("common.confirm")}
        onConfirm={() => {
          setIsReportConfirmOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      <Modal
        isOpen={isChatOutModalOpen}
        guideText={t("messages.leaveChatConfirm")}
        confirmText={t("common.yes")}
        cancelText={t("common.no")}
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
        guideText={t("messages.leaveChatComplete")}
        confirmText={t("common.confirm")}
        onConfirm={() => {
          setIsChatOutConfirmOpen(false);
          leaveChat(chatId, currentUser.id)
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