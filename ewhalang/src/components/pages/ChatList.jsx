import React, { useState, useEffect } from 'react';
// import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
// import { db, auth } from '../firebase'; // Firebase 설정 파일 경로에 맞게 수정
import ChatBox from './ChatBox';
import * as S from './ChatList.style';
import chatMockData from '../../_mock/chatMockData'

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const loggedInUserId = 'user1';
  // const currentUser = auth.currentUser;

  useEffect(() => {
    // 로그인 유저가 참여하고 있는 채팅만 필터링
    const filteredChatList = chatMockData.filter(chat =>
      chat.participants.some(participant => participant.userId === loggedInUserId)
    );

    // 최신순으로 정렬
    const sortedChatList = filteredChatList.sort((a, b) => 
      new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
    );
    setChatList(sortedChatList);

    // 아래의 Firebase 관련 코드는 주석 처리
    /*
    const fetchChatList = async () => {
      if (!currentUser) return;

      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userChannels = userSnap.data().channels || [];
        
        const channelsQuery = query(
          collection(db, 'channel'),
          where('id', 'in', userChannels)
        );

        const channelSnapshots = await getDocs(channelsQuery);
        
        const chats = [];
        for (const channelDoc of channelSnapshots.docs) {
          const channelData = channelDoc.data();
          const otherUserId = channelData.participants.find(id => id !== currentUser.uid);
          
          const otherUserRef = doc(db, 'users', otherUserId);
          const otherUserSnap = await getDoc(otherUserRef);
          const otherUserData = otherUserSnap.data();

          chats.push({
            channelId: channelDoc.id,
            otherUser: {
              uid: otherUserId,
              nickname: otherUserData.nickname,
              country: otherUserData.country,
              profilePicture: otherUserData.profilePicture,
            },
            lastMessage: channelData.lastMessage,
          });
        }

        setChatList(chats);
      }
    };

    fetchChatList();
    */
    }, [loggedInUserId]);

  return (
    <S.ListContainer>
    {chatList.map((chat) => (
      <ChatBox key={chat.channelId} chat={chat} loggedInUserId={loggedInUserId} />
    ))}
  </S.ListContainer>
  );
};

export default ChatList;