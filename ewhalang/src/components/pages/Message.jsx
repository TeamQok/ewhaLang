import React from "react";
import styled from "styled-components";
import UserImage from "../shared/UserImage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.isCurrentUser ? "flex-end" : "flex-start"};
  margin-bottom: ${(props) => (props.showTime ? "20px" : "4px")};
  align-items: flex-end;
  gap: 8px;
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isCurrentUser ? "row-reverse" : "row")};
  align-items: flex-end;
  gap: 6px;
`;

const MessageBubble = styled.div`
  max-width: 60vw;
  font-size: 16px;
  word-break: break-word;
  border-radius: 16px;
  padding: 10px;
  background-color: ${(props) =>
    props.isCurrentUser ? "var(--sub1)" : "var(--grey5)"};
  color: ${(props) => (props.isCurrentUser ? "var(--white)" : "var(--black)")};
  white-space: pre-wrap;
`;

const MessageInfo = styled.div`
  font-size: 11px;
  text-align: ${(props) => (props.isCurrentUser ? "right" : "left")};
  display: flex;
  flex-direction: column-reverse;
  color: var(--grey1);
  min-width: 12.5vw;
`;

const Message = ({
  content,
  senderId,
  currentUserId,
  timestamp,
  isRead,
  userProfileImage,
  showTime,
}) => {
  const isCurrentUser = senderId === currentUserId;
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(Date.parse(timestamp))) {
      console.error("Invalid timestamp:", timestamp);
      return "";
    }
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(i18n.language, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const handleImageClick = () => {
    navigate(`/users/${senderId}`);
  };

  return (
    <MessageContainer isCurrentUser={isCurrentUser} showTime={showTime}>
      {!isCurrentUser ? (
        showTime ? (

          <UserImage 
            profilePicture={userProfileImage} 
            alt="User profile" 
            width={40} 
            height={40} 
            onClick={handleImageClick}
          />
        ) : (
          <ImagePlaceholder />
        )
      ) : (
        <ImagePlaceholder />
      )}
      <MessageContent isCurrentUser={isCurrentUser}>
        <MessageBubble isCurrentUser={isCurrentUser}>
          {content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </MessageBubble>
        <MessageInfo isCurrentUser={isCurrentUser}>
          {showTime && formatTime(timestamp)}
          {!isRead && isCurrentUser && (
            <span style={{ color: "var(--sub1)" }}>1</span>
          )}
        </MessageInfo>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
