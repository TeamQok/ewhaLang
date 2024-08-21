import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';
import ChatBox from './ChatBox';
import * as S from './ChatList.style';
import { useNavigate } from 'react-router-dom';

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
    const fetchChatList = async () => {
      if (!currentUser) return;

      try {
        const chatsRef = collection(firestore, 'chats');
        const q = query(
          chatsRef,
          where("participantsId", "array-contains", currentUser.uid),
          where("isDeleted", "==", false)
        );
        const querySnapshot = await getDocs(q);

        const chats = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            channelId: doc.id,
            ...data
          };
        });

        // 최신순으로 정렬
        const sortedChatList = chats.sort((a, b) => 
          new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
        );

        setChatList(sortedChatList);
      } catch (error) {
        console.error("Error fetching chat list: ", error);
      }
    };

    fetchChatList();
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