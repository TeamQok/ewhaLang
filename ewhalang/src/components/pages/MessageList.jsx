import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUserId, userProfileImage }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.text}
          userId={msg.userId}
          currentUserId={currentUserId}
          createdAt={msg.createdAt}
          isUnread={msg.isUnread}
          userProfileImage={userProfileImage}
        />
      ))}
    </div>
  );
};

export default MessageList;