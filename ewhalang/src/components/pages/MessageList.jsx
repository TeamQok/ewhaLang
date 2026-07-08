import React, {forwardRef} from 'react';
import Message from './Message';
import DateSeparator from './DateSeparator';
import UserLeftNotification from './UserLeftNotification';

const MessageList = forwardRef(({ messages, currentUserId, userProfileImage, chatData }, ref) => {
  const otherUserId = chatData.participantsId.find(id => id !== currentUserId);
  const otherUserLeftDate = chatData.deletedDate[otherUserId];

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach(msg => {
      const date = new Date(msg.timestamp);
      if (isNaN(date.getTime())) {
        console.error('Invalid timestamp:', msg.timestamp);
        return;
      }
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
      if (!grouped[dateString]) {
        grouped[dateString] = [];
      }
      grouped[dateString].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  const isSameMinute = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate() &&
           date1.getHours() === date2.getHours() &&
           date1.getMinutes() === date2.getMinutes();
  };

  return (
    <div>
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <React.Fragment key={date}>
          <DateSeparator date={date} />
          {msgs.map((msg, index) => {
            const nextMsg = msgs[index + 1];
            const showTime = !nextMsg || 
                             nextMsg.senderId !== msg.senderId || 
                             !isSameMinute(nextMsg.timestamp, msg.timestamp);
            
            return (
              <React.Fragment key={msg.messageId}>
                <Message
                  id={msg.id}
                  content={msg.content}
                  senderId={msg.senderId}
                  currentUserId={currentUserId}
                  timestamp={msg.timestamp}
                  isRead={msg.isRead}
                  userProfileImage={userProfileImage}
                  showTime={showTime}
                />
                {otherUserLeftDate && new Date(msg.timestamp) < new Date(otherUserLeftDate) && 
                  new Date(msgs[index + 1]?.timestamp || Date.now()) > new Date(otherUserLeftDate) && (
                  <UserLeftNotification />
                )}
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
});

export default MessageList;