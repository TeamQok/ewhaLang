import { useNavigate } from "react-router-dom";
import { LongButton, ButtonType } from "../components/common/LongButton";
import * as S from "./FindPw.style";
import Modal from "../components/common/Modal";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";

const FindPw = () => {
  const navigate = useNavigate();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();

  const goRePw = () => {
    navigate("/repw");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const auth = getAuth();
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setIsModalOpen1(true);
      console.log("Password reset email sent.");

      // 사용자가 비밀번호 재설정 이메일을 확인하라는 안내를 제공할 수 있습니다.
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // 에러 처리
    }
  };

  return (
    <>
      <S.Title>{t("findPassword.content")}</S.Title>
      <S.Contents>{t("findPassword.content2")}</S.Contents>

      <S.Wrapper>
        <S.Title>{t("findPassword.email")}</S.Title>
        <S.Container>
          <S.Input
            placeholder={t("findPassword.emailp")}
            onChange={onChangeEmail}
            value={email}
          />
          <S.Button
            onClick={() => {
              resetPassword(email);
            }}
          >
            {t("findPassword.link")}
          </S.Button>
          <div style={{ marginBottom: "16px" }} />
        </S.Container>

        {/* <S.Title>인증번호</S.Title>
        <S.Container>
          <S.Input placeholder="인증번호를 입력해주세요." />
          <S.Button onClick={() => setIsModalOpen2(true)}>
            인증번호 확인
          </S.Button>
          <div style={{ marginBottom: "16px" }} />
        </S.Container> */}
      </S.Wrapper>
      <S.BtnContainer>
        {/* <LongButton ButtonType={ButtonType.GREEN} onClick={goRePw}>
          다음
        </LongButton> */}

        <Modal
          isOpen={isModalOpen1}
          onClose={() => setIsModalOpen1(false)}
          guideText={"메일로 링크를 발송했습니다. \n 메일함을 확인해주세요!"}
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen1(false);
            navigate("/login");
          }}
          onCancel={() => {
            setIsModalOpen1(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.BtnContainer>
    </>
  );
};

export default FindPw;
