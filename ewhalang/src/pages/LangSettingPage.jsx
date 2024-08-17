import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./LangSettingPage.style";
import { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const LangSettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lang, setLang] = useState("");

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

        console.log("Document successfully updated!");
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
      <Topbar title={"언어 설정하기"} left={"back"} />

      <S.Wrapper>
        <S.InputTitle>언어</S.InputTitle>
        <DropDown
          options={[
            "한국어",
            "영어",
            "일본어",
            "중국어",
            "프랑스어",
            "스페인어",
            "독일어",
            "이탈리아어",
            "러시아어",
            "포르투갈어",
            "아랍어",
            "힌디어",
            "베트남어",
            "태국어",
            "터키어",
            "폴란드어",
            "네덜란드어",
            "스웨덴어",
            "그리스어",
            "체코어",
            "헝가리어",
            "핀란드어",
            "덴마크어",
            "노르웨이어",
            "히브리어",
          ]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            setLang(selectedOption);
          }}
          isLong={true}
          placeholder="언어를 재설정해 주세요."
        />
        <div style={{ height: "24px" }} />

        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => updateUsingLang(lang)}
        >
          변경 완료
        </LongButton>
      </S.Wrapper>

      <BottomBar isOnMypage={true} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText="언어 변경이 완료되었습니다."
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
    </>
  );
};

export default LangSettingPage;
