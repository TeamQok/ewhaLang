import * as S from "./Login.style";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from "../components/common/Modal";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";
import eyeImg from "../assets/eye.svg";
import cloeye from "../assets/cloeye.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eye, setEye] = useState(false);

  const { i18n, t } = useTranslation();

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

  const onClickEye = () => {
    setEye(!eye);
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          accessToken: user.accessToken,
        })
      );

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
      <S.Input
        placeholder={t("login.email")}
        onChange={inputEmail}
        value={email}
      />
      <S.Input
        placeholder={t("login.pw")}
        onChange={inputPw}
        value={password}
        type={eye ? "type" : "password"}
      />
      <S.Eye src={eye ? eyeImg : cloeye} onClick={onClickEye} />
      <div style={{ marginTop: "12px" }}></div>
      <LongButton type={ButtonType.GREEN} onClick={handleLogin}>
        {t("login.login")}
      </LongButton>
      <S.Container>
        <S.Option onClick={goFindEmail}>{t("login.findEmail")}</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option onClick={goFindPw}>{t("login.findPw")}</S.Option>
        <S.Bar>|</S.Bar>
        <S.Option color="#33936D" onClick={goSignin}>
          {t("login.signup")}
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
