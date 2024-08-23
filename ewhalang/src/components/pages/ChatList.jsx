import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';
import ChatBox from './ChatBox';
import * as S from './ChatList.style';
import { useNavigate } from 'react-router-dom';
import { setUnreadCount } from '../common/UnreadCountManager';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const chatsRef = collection(firestore, 'chats');
    const q = query(
      chatsRef,
      where("participantsId", "array-contains", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs
        .map(doc => ({
          channelId: doc.id,
          ...doc.data()
        }))
        .filter(chat => {
          return !chat.deletedDate[currentUser.uid] || 
                 (chat.lastMessage && new Date(chat.lastMessage.timestamp) > new Date(chat.deletedDate[currentUser.uid]));
        });

      const sortedChatList = chats.sort((a, b) => 
        new Date(b.lastMessage?.timestamp || 0) - new Date(a.lastMessage?.timestamp || 0)
      );

      setChatList(sortedChatList);

      // 읽지 않은 메시지 수 계산 및 로컬 스토리지에 저장
      const totalUnread = sortedChatList.reduce((sum, chat) => sum + (chat.unreadCounts?.[currentUser.uid] || 0), 0);
      setUnreadCount(totalUnread);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <S.ListContainer>
      {chatList.map((chat) => (
        <ChatBox 
          key={chat.channelId} 
          chat={chat} 
          loggedInUserId={currentUser.uid} 
        />
      ))}
    </S.ListContainer>
  );
};

export default ChatList;