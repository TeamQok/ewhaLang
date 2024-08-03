import * as S from "./Login.style";
import logo from "../assets/x-logo.svg";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const goSignin = () => {
    navigate("/signup1");
  };

  const goMain = () => {
    navigate("/");
  };

  return (
    <S.Wrapper>
      <img
        src={logo}
        style={{ width: "141px", marginBottom: "36px", marginTop: "174px" }}
      />
      <S.Input placeholder="이메일 입력" />
      <S.Input placeholder="비밀번호 입력" />
      <div style={{ marginTop: "12px" }}></div>
      <LongButton type={ButtonType.GREEN} onClick={goMain}>
        로그인
      </LongButton>
      <S.Container>
        <S.Option>이메일찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option>비밀번호 찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option color="#33936D" onClick={goSignin}>
          회원가입
        </S.Option>
      </S.Container>
    </S.Wrapper>
  );
};

export default Login;
