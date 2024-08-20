import { useNavigate } from "react-router-dom";
import { LongButton, ButtonType } from "../components/common/LongButton";
import * as S from "./FindPw.style";
import Modal from "../components/common/Modal";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const FindPw = () => {
  const navigate = useNavigate();
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [email, setEmail] = useState("");

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
      <S.Title>가입된 이메일로 찾기</S.Title>
      <S.Contents>
        가입 당시 입력한 이메일을 통해 인증 후<br /> 새 비밀번호를 등록해주세요.
      </S.Contents>

      <S.Wrapper>
        <S.Title>이메일</S.Title>
        <S.Container>
          <S.Input
            placeholder="이메일을 입력해주세요."
            onChange={onChangeEmail}
            value={email}
          />
          <S.Button
            onClick={() => {
              resetPassword(email);
            }}
          >
            링크 요청
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
