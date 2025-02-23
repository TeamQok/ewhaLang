import * as S from "./Login.style";
import logo from "../assets/x-logo.svg";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";

const Login = () => {
  return (
    <S.Wrapper>
      <img
        src={logo}
        style={{ width: "141px", marginBottom: "36px", marginTop: "174px" }}
      />
      <S.Input placeholder="이메일 입력" />
      <S.Input placeholder="비밀번호 입력" />
      <div style={{ marginTop: "12px" }}></div>
      <LongButton type={ButtonType.GREEN}>로그인</LongButton>
      <S.Container>
        <S.Option>이메일찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option>비밀번호 찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option color="#33936D">회원가입</S.Option>
      </S.Container>
    </S.Wrapper>
  );
};

export default Login;
