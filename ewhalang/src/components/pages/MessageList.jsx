import React from 'react';
import Message from './Message';

const MessageList = ({ messages, currentUserId, userProfileImage }) => {  
  return (
    <div style={{ overflow: 'hidden' }}>
      {messages.map((msg) => (
        <Message
          key={msg.messageId}
          content={msg.content}
          senderId={msg.senderId}
          currentUserId={currentUserId}
          timestamp={msg.timestamp}
          isRead={msg.isRead}
          userProfileImage={userProfileImage}
        />
      ))}
    </div>
  );
};

export default MessageList;
