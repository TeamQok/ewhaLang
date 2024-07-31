import styled from "styled-components";
import chatGrey from "../../assets/chatGrey.svg";
import mypageGrey from "../../assets/mypageGrey.svg";
import userGrey from "../../assets/userGrey.svg";

const BottomBar = ({ onClick }) => {
  return (
    <>
      <Wrapper>
        <Item onClick={onClick}>
          <img src={userGrey} />
        </Item>
        <Item onClick={onClick}>
          <img src={chatGrey} />
        </Item>
        <Item onClick={onClick}>
          <img src={mypageGrey} />
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
