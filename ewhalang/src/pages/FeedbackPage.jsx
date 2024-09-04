import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./FeedbackPage.style";
import { useState } from "react";
import { firestore, auth } from "../firebase"; // firebase 설정에서 firestore와 auth를 불러옴
import { collection, addDoc } from "firebase/firestore"; // Firestore에 문서를 추가하기 위한 함수들
import { useTranslation } from "react-i18next";

const FeedbackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [feedback, setFeedback] = useState("");
  const { i18n, t } = useTranslation();

  const onChangeFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const saveFeedback = async (feedbackContent) => {
    if (feedback) {
      try {
        const user = auth.currentUser; // 현재 로그인된 사용자 정보 가져오기

        if (user) {
          const uid = user.uid; // 사용자 UID 가져오기

          // feedback 컬렉션에 문서 추가
          await addDoc(collection(firestore, "feedback"), {
            uid: uid, // UID 저장
            content: feedbackContent, // 피드백 내용 저장
            timestamp: new Date().toISOString(), // 문서가 저장된 시간을 기록 (옵션)
          });

          console.log("Feedback successfully saved!");

          setIsModalOpen(true);
          setFeedback("");
        }
      } catch (error) {
        console.error("Error saving feedback: ", error);
      }
    }
  };
  return (
    <>
      <Topbar title={t("feedback.피드백 보내기")} left={"back"} />

      <S.Wrapper>
        <S.Title>{t("feedback.To. 개발자...")}</S.Title>
        <S.Introduce
          placeholder={t("feedback.개발자에게 피드백을 주세요.")}
          value={feedback}
          onChange={onChangeFeedback}
        />

        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => saveFeedback(feedback)}
        >
          {t("feedback.전송 하기")}
        </LongButton>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guideText={t("feedback.피드백 감사합니다.")}
          confirmText={t("feedback.확인")}
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
