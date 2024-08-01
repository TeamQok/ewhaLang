import * as S from "./MainPage.style";
import Topbar from "../components/layout/Topbar";
import BottomBar from "../components/layout/BottomBar";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { ShortButton } from "../components/common/ShortButton";
import { useState } from "react";
import Modal from "../components/common/Modal";
import DropDown from "../components/common/DropDown";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Topbar title={"메인페이지"} left={"back"} right="setting" />
      <div>메인페이지입니다</div>
      <InputBox placeholder={"이름을 입력해주세요!"} title={"닉네임"} />
      <LongButton
        type={ButtonType.LONG_GREY}
        onClick={() => setIsModalOpen(true)}
      >
        저장하기
      </LongButton>
      <ShortButton type={ButtonType.GREEN}>중복확인</ShortButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText="채팅방을 정말 나가시겠습니까?"
        confirmText="예"
        cancelText="아니오"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={false}
        showTextInput={false}
      />
      <DropDown
        options={[
          "채팅방을 정말 나가시겠습니까? 채팅방을 정말 나가시겠습니까?",
          "중국",
          "일본",
        ]}
        onSelect={(selectedOption) => {
          console.log(`Selected: ${selectedOption}`);
        }}
      />
      <BottomBar />
    </>
  );
};

export default MainPage;
