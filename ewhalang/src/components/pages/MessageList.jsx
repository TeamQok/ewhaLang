import React from 'react';
import Message from './Message';
import DateSeparator from './DateSeparator';

const MessageList = ({ messages, currentUserId, userProfileImage }) => {
  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(msg => {
      const date = new Date(msg.timestamp).toLocaleDateString('ko-KR');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div style={{ overflow: 'hidden' }}>
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <React.Fragment key={date}>
          <DateSeparator date={date} />
          {msgs.map((msg) => (
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;
