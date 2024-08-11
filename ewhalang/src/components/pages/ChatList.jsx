import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import ChatBox from './ChatBox';
import * as S from './ChatList.style';
import chatMockData from '../../_mock/chatMockData'

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const loggedInUserId = 'user3';

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        // Firestore에서 모든 채팅 문서 가져오기
        const chatsRef = collection(firestore, 'chats');
        const querySnapshot = await getDocs(chatsRef);

        const chats = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            channelId: doc.id,
            ...data
          };
        });

        // 클라이언트 측에서 로그인한 사용자가 참여하고 있는 채팅 필터링
        const filteredChatList = chats.filter(chat =>
          chat.participants.some(participant => participant.userId === loggedInUserId)
        );

        // 최신순으로 정렬
        const sortedChatList = filteredChatList.sort((a, b) => 
          new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
        );

        setChatList(sortedChatList);
      } catch (error) {
        console.error("Error fetching chat list: ", error);
      }
    };

    fetchChatList();
  }, [loggedInUserId]);

  return (
    <S.ListContainer>
    {chatList.map((chat) => (
      <ChatBox chat={chat} loggedInUserId={loggedInUserId} />
    ))}
  </S.ListContainer>
  );
};

export default ChatList;