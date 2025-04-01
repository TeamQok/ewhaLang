import Topbar from "../components/layout/Topbar";
import * as S from "./Signup1.style";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { app, firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Modal from "../components/common/Modal";
import cloeye from "../assets/cloeye.svg";
import eyeImg from "../assets/eye.svg";
import { useTranslation } from "react-i18next";

const expectedDomain1 = "ewhain.net";
const expectedDomain2 = "ewha.ac.kr";

const Signup1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pw, setPw] = useState("");
  const [conPw, setConPw] = useState("");
  const [authpw, setAuthpw] = useState(false);
  const [err, setErr] = useState("");

  const [eye, setEye] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState({guideText: "", confirmText: "확인"});


  const { t, i18n } = useTranslation();

  const goNext = () => {

    navigate("/signup2", { state: { email, pw } });

  };
  console.log("현재 설정된 언어 로그인1:", i18n.language);

  const confirmPw = (e) => {
    setConPw(e.target.value);
    pw === e.target.value ? setAuthpw(!authpw) : setAuthpw(false);
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmailDomain(newEmail, expectedDomain1, expectedDomain2);
  };

  const goLogin = () => {
    navigate("/login");
  };

  const onClickEye = () => {
    setEye(!eye);
  };

  const validateEmailDomain = (email, expectedDomain1, expectedDomain2) => {
    // 이메일 주소에서 '@' 뒤에 있는 부분을 추출
    const domain = email.split("@")[1];

    // 도메인이 있는지 확인하고, 예상된 도메인과 비교
    const isValid = domain === expectedDomain1 || domain === expectedDomain2;

    setEmailValid(isValid);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    setErr(validatePassword(e.target.value));
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/;
    if (!regex.test(password)) {
      return "비밀번호는 영문, 숫자, 특수문자를 포함한 6자에서 20자 사이여야 합니다.";
    }
    return "";
  };

  // 이메일 중복 검사 함수
  const checkEmailDuplicate = async (email) => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  };

  const openModal = (guideText) => {
    setModalContent({ guideText, confirmText: "확인" });
    setIsModalOpen(true);
  };


  return (
    <>
      <Topbar
        title={t("signup1.title")}
        right={"x"}
        left={"back"}
        rightonClick={goLogin}
      />
      <S.Wrapper>
        <InputBox
          title={t("signup1.email")}
          placeholder={t("signup1.emailp")}
          value={email}
          type="email"
          onChange={handleEmail}
        />
        {emailValid ? (
          <S.Info>{t("signup1.emailOk")}</S.Info>
        ) : (
          <S.Info>{t("signup1.emailDetail")}</S.Info>
        )}

        <InputBox
          title={t("signup1.pw")}
          placeholder={t("signup1.pwp")}
          value={pw}
          onChange={handlePw}
          type={eye ? "text" : "password"}
        />
        <S.Eye src={eye ? eyeImg : cloeye} onClick={onClickEye} />
        <S.Info1 err={err}>{t("signup1.pwpD1")}</S.Info1>
        <S.Info2 err={err}>{t("signup1.pwpD2")}</S.Info2>
        <InputBox
          title={t("signup1.pwOk")}
          placeholder={t("signup1.pwOkp")}
          value={conPw}
          onChange={confirmPw}
          type="password"
        />
        {authpw && !err ? <S.Info>{t("signup1.pwOkmessage")}</S.Info> : <></>}
      </S.Wrapper>

      <S.Container>
        {authpw && !err && emailValid ? (
          <LongButton
            type={ButtonType.GREEN}
            onClick={async (e) => {
              e.preventDefault();
              if(pw !== conPw){
                openModal("비밀번호가 일치하지 않습니다.")
              }else{
                const isDuplicate = await checkEmailDuplicate(email);
                if(isDuplicate){
                  openModal("이미 존재하는 이메일입니다.");
                }else{

                  goNext();
                }
              }
            }}
          >
            {t("signup1.next")}
          </LongButton>
        ) : (
          <>
            <LongButton type={ButtonType.LONG_GREY}>
              {t("signup1.next")}
            </LongButton>
          </>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          guideText={t("signup1.이미 가입된 계정이 있습니다.")}
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
      </S.Container>
    </>
  );
};

export default Signup1;
