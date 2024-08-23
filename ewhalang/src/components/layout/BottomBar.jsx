import styled from "styled-components";
import chatGrey from "../../assets/chatGrey.svg";
import mypageGrey from "../../assets/mypageGrey.svg";
import userGrey from "../../assets/userGrey.svg";
import { useNavigate } from "react-router-dom";
import mypageGreen from "../../assets/mypageGreen.svg";
import chatGreen from "../../assets/chatGreen.svg";
import userGreen from "../../assets/userGreen.svg";
import { useState, useEffect } from 'react';
import { getUnreadCount } from '../common/UnreadCountManager';

const BottomBar = ({ isOnFriend, isOnChat, isOnMypage }) => {
  const navigate = useNavigate();
  const [friend, setFriend] = useState(false);
  const [mypage, setMypage] = useState(false);
  const [chat, setChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const goFriends = () => {
    navigate("/users");
    setFriend(true);
    setMypage(false);
    setChat(false);
  };

  const goChat = () => {
    navigate("/chats");
    setChat(true);
    setFriend(false);
    setMypage(false);
  };

  const goMypage = () => {
    navigate("/mypage");
    setMypage(true);
    setChat(false);
    setFriend(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUnreadCount(getUnreadCount());
    };

    // 초기 unreadCount 설정
    setUnreadCount(getUnreadCount());

    // 로컬 스토리지 변경 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Item onClick={goFriends}>
          {friend || isOnFriend ? (
            <img src={userGreen} />
          ) : (
            <img src={userGrey} />
          )}
        </Item>
        <Item onClick={goChat}>
          {chat || isOnChat ? <img src={chatGreen} /> : <img src={chatGrey} />}
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </Item>
        <Item onClick={goMypage}>
          {mypage || isOnMypage ? (
            <img src={mypageGreen} />
          ) : (
            <img src={mypageGrey} />
          )}
        </Item>
      </Wrapper>
    </>
  );
};

export default BottomBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding-bottom: 30px;
  border-top: 0.5px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);
  background-color: white;
`;

const Item = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  position: relative;
`;

const UnreadBadge = styled.div`
  position: absolute;
  top: 3px;
  right: 0px;
  background-color: var(--main);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
`;
