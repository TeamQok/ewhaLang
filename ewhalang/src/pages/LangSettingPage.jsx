import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./LangSettingPage.style";
import { useState } from "react";

const LangSettingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Topbar title={"언어 설정하기"} left={"back"} />

      <S.Wrapper>
        <S.InputTitle>언어</S.InputTitle>
        <DropDown
          options={[
            "한국어",
            "중국어",
            "일본어",
            "스페인어",
            "프랑스어",
            "영어",
          ]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
          }}
          isLong={true}
          placeholder="언어를 재설정해 주세요."
        />
        <div style={{ height: "24px" }} />

        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
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
