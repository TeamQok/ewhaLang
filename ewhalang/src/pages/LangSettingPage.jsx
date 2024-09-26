import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./LangSettingPage.style";
import { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

const LangSettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState("");
  const { t, i18n } = useTranslation();

  const firestore = getFirestore();
  const auth = getAuth();

  const updateUsingLang = async (newLang) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userID = user.uid; // 현재 사용자의 UID 가져오기
        const userRef = doc(firestore, "users", userID);

        // 'usingLang' 필드 업데이트
        await updateDoc(userRef, {
          usingLanguage: newLang,
        });

        console.log("업데이트 성공!");
        i18n.changeLanguage(lang); // 언어 변경 호출
        setIsModalOpen(true);
      } else {
        console.error("No user is logged in.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Topbar title={t("langSetting.언어 설정하기")} left={"back"} />

      <S.Wrapper>
        <S.InputTitle>{t("langSetting.언어")}</S.InputTitle>
        <DropDown
          options={[
            { label: t("language.한국어"), value: "ko" },
            { label: t("language.영어"), value: "en" },
          ].map((option) => option.label)} // 드롭다운에 표시할 항목만 배열로 전달
          onSelect={(selectedLabel) => {
            const selectedOption = [
              { label: t("language.한국어"), value: "ko" },
              { label: t("language.영어"), value: "en" },
            ].find((option) => option.label === selectedLabel); // 선택된 label에 해당하는 option 찾기

            console.log(`Selected: ${selectedOption.value}`);
            localStorage.setItem("usingLanguage", selectedOption.value);
            setLang(selectedOption.value);
          }}
          isLong={true}
          placeholder={t("langSetting.언어를 재설정해 주세요.")}
        />

        <div style={{ height: "24px" }} />

        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => updateUsingLang(lang)}
        >
          {t("langSetting.변경 완료")}
        </LongButton>
      </S.Wrapper>

      <BottomBar isOnMypage={true} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText={t("langSetting.언어 변경이 완료되었습니다.")}
        confirmText={t("langSetting.확인")}
        onConfirm={() => setIsModalOpen(false)}
        isSingleButton={true}
        showTextInput={false}
      />
    </>
  );
};

export default LangSettingPage;
