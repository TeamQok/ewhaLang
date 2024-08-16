import * as S from "./Login.style";
import logo from "../assets/x-logo.svg";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../components/common/Modal";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goSignin = () => {
    navigate("/signup1");
  };

  const goMain = () => {
    navigate("/users");
  };

  const goFindEmail = () => {
    navigate("/find");
  };

  const goFindPw = () => {
    navigate("/find", { state: { view: "pw" } });
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPw = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);
      goMain();
    } catch (error) {
      console.error("Error logging in:", error.message);
      // 로그인 실패 시 사용자에게 오류 메시지 표시
      setIsModalOpen(true);
    }
  };

  return (
    <S.Wrapper>
      <img
        src={logo}
        style={{ width: "141px", marginBottom: "36px", marginTop: "174px" }}
      />
      <S.Input placeholder="이메일 입력" onChange={inputEmail} value={email} />
      <S.Input
        placeholder="비밀번호 입력"
        onChange={inputPw}
        value={password}
      />
      <div style={{ marginTop: "12px" }}></div>
      <LongButton type={ButtonType.GREEN} onClick={handleLogin}>
        로그인
      </LongButton>
      <S.Container>
        <S.Option onClick={goFindEmail}>이메일찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option onClick={goFindPw}>비밀번호 찾기</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option color="#33936D" onClick={goSignin}>
          회원가입
        </S.Option>
      </S.Container>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        guideText="회원정보를 확인해주세요!"
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
    </S.Wrapper>
  );
};

export default Login;
