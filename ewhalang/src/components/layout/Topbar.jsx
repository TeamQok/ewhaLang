import styled from "styled-components";
import goback from "../../assets/goback.svg";
import dots from "../../assets/dots.svg";
import setting from "../../assets/setting.svg";
import x from "../../assets/x.svg";
import { useNavigate } from "react-router-dom";

// props로 back, dot, setting 넣어주면 됨
// 아무것도 안 넣으면 암 것도 없음

const Topbar = ({ title, left, right, rightonClick, leftOnClick }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (leftOnClick) {
      leftOnClick();
    } else navigate(-1); // 브라우저 히스토리에서 한 단계 뒤로 이동
  };
  return (
    <>
      <Wrapper>
        {left == "back" ? (
          <Left onClick={handleGoBack}>
            <img src={goback} alt="뒤로가기" />
          </Left>
        ) : (
          <Left></Left>
        )}

        <Title>{title}</Title>

        {right == "dot" ? (
          <Right onClick={rightonClick}>
            <img src={dots} />
          </Right>
        ) : right == "setting" ? (
          <Right onClick={rightonClick}>
            <img src={setting} />
          </Right>
        ) : right == "x" ? (
          <Right onClick={rightonClick}>
            <img src={x} />
          </Right>
        ) : (
          <Right></Right>
        )}
      </Wrapper>
    </>
  );
};

export default Topbar;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: var(--Black, #000);
  text-align: center;
  font-family: var(--korean);
  /* Subtitle_18_B */
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  width: 161px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding-left: 14px;
  padding-right: 14px;
  border-bottom: 1px solid var(--Grey-4, #e0e0e0);
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Right = styled.div`
  display: flex;
  width: 44px;
  height: 44px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Left = styled.div`
  display: flex;
  width: 44px;
  height: 44px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
