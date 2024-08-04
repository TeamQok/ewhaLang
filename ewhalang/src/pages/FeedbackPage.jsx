import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./FeedbackPage.style";
import { useState } from "react";

const FeedbackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Topbar title={"피드백 보내기"} left={"back"} />

      <S.Wrapper>
        <S.Title>To. 개발자...</S.Title>
        <S.Introduce placeholder="개발자에게 피드백을 주세요." />

        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
        >
          전송 하기
        </LongButton>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guideText={"피드백 감사합니다! \n 더 나은 모습으로 찾아뵙겠습니다."}
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.Wrapper>
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default FeedbackPage;
