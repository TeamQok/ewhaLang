import * as S from "./FindEmail.style";
import Topbar from "../components/layout/Topbar";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useState } from "react";
import Modal from "../components/common/Modal";

const ReSettingPw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Topbar title={"비밀번호 재설정"} right={"x"} left={"back"} />

      <S.Wrapper>
        <InputBox
          placeholder={"신규 비밀번호를 입력해주세요."}
          title={"신규 비밀번호"}
        />
        <S.Info>
          * 영문, 숫자, 특수문자 조합
          <br />* 최소 6자에서 최대 20자
        </S.Info>

        <InputBox
          placeholder={"입력한 신규 비밀번호를 확인해주세요."}
          title={"신규 비밀번호 확인"}
        />
        <S.Info>* 알맞은 비밀번호입니다.</S.Info>
        <S.Container>
          <LongButton
            ButtonType={ButtonType.GREEN}
            onClick={() => setIsModalOpen(true)}
          >
            비밀번호 재설정하기
          </LongButton>
        </S.Container>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guideText="비밀번호를 재설정하였습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.Wrapper>
    </>
  );
};

export default ReSettingPw;
