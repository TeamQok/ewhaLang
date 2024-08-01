import * as S from "./Onboarding.style";
import logo from "../assets/x-logo.svg";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const goSignin = () => {
    navigate("/signin");
  };

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <S.Wrapper>
        <S.Title>
          여기에 카피라이팅, 슬로건 등{<br />} 넣으면 좋을 것 같아요
        </S.Title>
        <S.Name>이화랑</S.Name>
        <S.Container>
          <img
            alt="이미지로고"
            src={logo}
            style={{ width: "200px", marginBottom: "97px" }}
          />
          <S.Setting>
            <div>초기 언어설정</div>
            {/* 나중에 드롭다운 연결 */}
            <div>한국어</div>
          </S.Setting>
          <LongButton type={ButtonType.WHITE} onClick={goSignin}>
            새로운 계정 만들기
          </LongButton>
          <div style={{ marginBottom: "8px" }}></div>
          <LongButton type={ButtonType.GREEN} onClick={goLogin}>
            로그인하러 가기
          </LongButton>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default Onboarding;
