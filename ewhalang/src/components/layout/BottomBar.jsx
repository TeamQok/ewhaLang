import styled from "styled-components";
import chatGrey from "../../assets/chatGrey.svg";
import mypageGrey from "../../assets/mypageGrey.svg";
import userGrey from "../../assets/userGrey.svg";
import { useNavigate } from "react-router-dom";
import mypageGreen from "../../assets/mypageGreen.svg";
import chatGreen from "../../assets/chatGreen.svg";
import userGreen from "../../assets/userGreen.svg";
import { useState } from "react";

const BottomBar = ({ isOnFriend, isOnChat, isOnMypage }) => {
  const navigate = useNavigate();
  const [friend, setFriend] = useState(false);
  const [mypage, setMypage] = useState(false);
  const [chat, setChat] = useState(false);

  const goFriends = () => {
    // 나중에 라우팅 주소 정해지면 넣어주세요.
    navigate("/");
    setFriend(true);
    setMypage(false);
    setChat(false);
  };

  const goChat = () => {
    // 나중에 라우팅 주소 정해지면 넣어주세요.
    navigate("/");
    setChat(true);
    setFriend(false);
    setMypage(false);
  };

  const goMypage = () => {
    // 나중에 라우팅 주소 정해지면 넣어주세요.
    navigate("/");
    setMypage(true);
    setChat(false);
    setFriend(false);
  };

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
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
`;

const Item = styled.div`
  margin-left: 35px;
  margin-right: 35px;
`;
