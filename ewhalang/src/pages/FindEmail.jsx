import { useNavigate } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import * as S from "./FindEmail.style";
import { useState } from "react";
import FindPw from "./FindPw";
import InputBox from "../components/common/InputBox";
import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";

const FindEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <S.Title>회원 정보로 찾기</S.Title>
      <S.Contents>회원 정보에 등록된 정보를 입력해주세요.</S.Contents>
      <InputBox title={"이름"} placeholder={"이름을 입력해주세요."} />
      <div style={{ marginBottom: "16px" }} />

      <S.Title>국적</S.Title>
      <DropDown
        isLong={true}
        placeholder="국적을 선택해주세요."
        options={["한국", "중국", "일본"]}
        onSelect={(selectedOption) => {
          console.log(`Selected: ${selectedOption}`);
        }}
      />
      <div style={{ marginBottom: "16px" }} />

      <InputBox title={"생년월일"} placeholder={"생년월일을 입력해주세요."} />
      <S.Info>* YYYYMMDD로 입력해주세요. (예시 : 20010101)</S.Info>
      <S.Container>
        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
        >
          이메일 찾기
        </LongButton>
      </S.Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText="회원 정보와 일치하는 이메일입니다."
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

export default FindEmail;
