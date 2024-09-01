import * as S from './ChattingPage.style';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { collection, onSnapshot, getDocs, doc, addDoc, getDoc, updateDoc, increment, writeBatch } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import Topbar from '../components/layout/Topbar';
import MessageList from '../components/pages/MessageList';
import InputArea from '../components/pages/InputArea';
import { Nickname, Separator, Country } from '../components/pages/ChatList.style';
import ShortDropDown from '../components/shared/ShortDropDown';
import Modal from '../components/common/Modal';
import { useTranslation } from 'react-i18next';
import { RESIGNED_USER } from '../constants';

const ChattingPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const [isNewChat, setIsNewChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [isResignedUser, setIsResignedUser] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const [isChatOutModalOpen, setIsChatOutModalOpen] = useState(false);
  const [isChatOutConfirmOpen, setIsChatOutConfirmOpen] = useState(false);
  const [isResignedUserModalOpen, setIsResignedUserModalOpen] = useState(false);
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
    if (chatId === 'new') {
      setIsNewChat(true);
      const { otherUser: newOtherUser, loggedUser } = location.state;
      setOtherUser(newOtherUser);
      setCurrentUser(loggedUser);
      setOtherUserId(newOtherUser.userId);
      setLoading(false);
    } else {
      let unsubscribe = () => {};
      const fetchChatData = async () => {
        if (chatId && currentUser && !isResignedUser) {
          try {
            const chatDoc = await getDoc(doc(firestore, "chats", chatId));
            if (chatDoc.exists()) {
              const data = chatDoc.data();
              setChatData(data);
  
              const newOtherUserId = data.participantsId.find(id => id !== currentUser.id);
              setOtherUserId(newOtherUserId);
  
              if (newOtherUserId === RESIGNED_USER.id) {
                setOtherUser({ ...RESIGNED_USER, nickname: t('user.unknown') });
                setIsResignedUser(true);
              } else {
                const otherUserInfo = data.participantsInfo[newOtherUserId];
                setOtherUser(otherUserInfo);
                setIsResignedUser(false);
              }
    
              const messagesRef = collection(firestore, `chats/${chatId}/messages`);
              unsubscribe = onSnapshot(messagesRef, async (snapshot) => {
                const batch = writeBatch(firestore);
                let messagesData = snapshot.docs.map(doc => {
                  const messageData = doc.data();
                  if (messageData.senderId !== currentUser.id && !messageData.isRead) {
                    batch.update(doc.ref, { isRead: true });
                  }
                  return { id: doc.id, ...messageData };
                });
    
                await batch.commit();
    
                const userDeletedDate = data.deletedDate[currentUser.id];
                if (userDeletedDate) {
                  messagesData = messagesData.filter(msg => 
                    new Date(msg.timestamp) > new Date(userDeletedDate)
                  );
                }
    
                messagesData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                setMessages(messagesData);
    
                // 채팅 페이지에 들어왔을 때만 unreadCount를 초기화합니다.
                await updateDoc(doc(firestore, "chats", chatId), {
                  [`unreadCounts.${currentUser.id}`]: 0
                });
              });
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
  
      // 컴포넌트가 언마운트될 때 실행될 클린업 함수
      return () => {
        unsubscribe();
      };
    }
  }, [chatId, location]);


  //새 메시지가 추가될 때 스크롤 최하단으로 이동
  useEffect(() => {
    const messageContainer = document.querySelector('.message-list-container');
    if(messageContainer){
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);


  if (loading || !currentUser) {
    return <div>{t("common.loading")}</div>;
  }

  const handleSendMessage = async (text) => {
    if (!currentUser) return;
  
    const newMessage = {
      senderId: currentUser.id,
      content: text,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    console.log(newMessage);
  
    try {
      if (chatId === 'new') {
        // 새 채팅 문서 생성
        const newChatData = {
          participantsId: [currentUser.id, otherUserId],
          participantsInfo: {
            [currentUser.id]: {
              userId: currentUser.id,
              nickname: currentUser.nickname,
              profileImg: currentUser.profileImg,
              country: currentUser.country
            },
            [otherUserId]: otherUser
          },
          lastMessage: newMessage,
          unreadCounts: {
            [currentUser.id]: 0,
            [otherUserId]: 1
          },
          deletedDate: {
            [currentUser.id]: null,
            [otherUserId]: null
          }
        };

        const newChatRef = await addDoc(collection(firestore, "chats"), newChatData);
  
        // 새 채팅에 첫 메시지 추가
        await addDoc(collection(firestore, `chats/${newChatRef.id}/messages`), newMessage);

        // 채팅 문서 업데이트
        await updateDoc(doc(firestore, "chats", newChatRef.id), {
          [`unreadCounts.${otherUserId}`]: increment(1),
          lastMessage: newMessage
        });

        setChatData(newChatData);
  
        // URL 업데이트
        navigate(`/chats/${newChatRef.id}`, { replace: true });

        if(isNewChat){
          setIsNewChat(false);
        }
      } else {
        // 기존 채팅에 메시지 추가
        await addDoc(collection(firestore, `chats/${chatId}/messages`), newMessage);
  
        // 채팅 문서 업데이트
        await updateDoc(doc(firestore, "chats", chatId), {
          [`unreadCounts.${otherUserId}`]: increment(1),
          lastMessage: newMessage
        });
      }
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
            <Country>{t(`nationality.${otherUser.country}`)}</Country>
          </S.Title>
        } left={"back"} right="dot" rightonClick={handleDotClick} />
        <S.MessageListContainer className="message-list-container">
          {!isNewChat && (
            <MessageList messages={messages} currentUserId={currentUser.id} userProfileImage={otherUser.profileImg} chatData={chatData} />
          )}
        </S.MessageListContainer>
      </S.ContentWrapper>
      {!isNewChat && (
        <ShortDropDown options={options} onSelect={handleSelect} isOpen={isDropDownOpen} />
      )}
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
      <Modal
        isOpen={isResignedUserModalOpen}
        guideText={t("messages.resignedUserInform")}
        confirmText={t("common.confirm")}
        onConfirm={() => {
          setIsChatOutModalOpen(false);
          setIsChatOutConfirmOpen(true);
        }}
        isSingleButton={true}
      ></Modal>
      <S.InputAreaContainer>
        <InputArea onSendMessage={handleSendMessage} disabled={isResignedUser} placeholder={isResignedUser ? t("placeholder.unknownUser") : null} />
      </S.InputAreaContainer>
    </S.Wrapper>
  );
};

export default ChattingPage;