import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./AccountManagePage.style";
import { useState } from "react";

const AccountManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <Topbar
        title={"계정 관리하기"}
        left={"back"}
        right={"dot"}
        rightonClick={() => setDropdown(!dropdown)}
      />
      {dropdown ? (
        <S.Box
          onClick={() => {
            setIsModalOpen2(true);
            setDropdown(!dropdown);
          }}
        >
          회원 탈퇴하기
        </S.Box>
      ) : (
        <></>
      )}

      <S.Wrapper>
        <S.Title>이름</S.Title>
        <S.DInput readOnly={true} type="text" value={"김현수"} />
        <S.Info>변경 불가한 항목입니다.</S.Info>

        <S.Title>이메일</S.Title>
        <S.DInput readOnly={true} type="text" value={"abcd123@ewha.ac.kr"} />
        <S.Info>변경 불가한 항목입니다.</S.Info>

        <InputBox title={"기존 비밀번호 입력"} />
        <div style={{ height: "16px" }} />
        <InputBox title={"새 비밀번호 입력"} />
        <div style={{ height: "16px" }} />
        <InputBox title={"새 비밀번호 확인"} />
        <div style={{ height: "24px" }} />
        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
        >
          수정 완료
        </LongButton>
        <div style={{ height: "24px" }} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guideText="비밀번호 변경이 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />

        <Modal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          guideText="정말 탈퇴 히시겠습니까?"
          confirmText="예"
          cancelText="아니오"
          onConfirm={() => {
            setIsModalOpen2(false);
            setIsModalOpen3(true);
          }}
          onCancel={() => {
            setIsModalOpen2(false);
          }}
          isSingleButton={false}
          showTextInput={false}
        />

        <Modal
          isOpen={isModalOpen3}
          onClose={() => setIsModalOpen3(false)}
          guideText="회원 탈퇴가 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen3(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.Wrapper>
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default AccountManagePage;
