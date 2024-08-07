import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";

import * as S from "./EditMypage.style";
import profile from "../assets/profile.svg";
import InputBox from "../components/common/InputBox";
import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useState } from "react";
import Modal from "../components/common/Modal";
import camera from "../assets/camera.svg";

const EditMypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Topbar title={"수정하기"} left={"back"} />
      <S.Container>
        <S.ProfileWrapper>
          <img
            src={profile}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "100px",
            }}
          />
          <S.Camera>
            <img src={camera} />
          </S.Camera>
        </S.ProfileWrapper>
      </S.Container>
      <S.Wrapper>
        <InputBox title={"닉네임"} placeholder={"닉네임을 입력해주세요."} />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>국적</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder="국적을 선택해주세요."
          options={["한국", "중국", "일본"]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
          }}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>성별</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder="성별을 선택해주세요."
          options={["여성", "남성", "알리고 싶지 않음"]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
          }}
        />
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={"출생년도"}
          placeholder={"출생년도 4자리를 입력해주세요."}
        />
        <div style={{ marginBottom: "16px" }} />
        <InputBox title={"전공"} placeholder={"전공을 입력해주세요."} />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>사용 가능 언어</S.InputTitle>
        <S.LangContainer>
          <DropDown
            isLong={false}
            placeholder="언어 선택"
            options={[
              "한국어",
              "영어",
              "일본어",
              "중국어",
              "스페인어",
              "프랑스어",
            ]}
            onSelect={(selectedOption) => {
              console.log(`Selected: ${selectedOption}`);
            }}
          />
          <DropDown
            isLong={false}
            placeholder="언어 숙련도 선택"
            options={[
              "기초(Basic)",
              "중급 (Intermediate)",
              "상급 (Advanced)",
              "원어민 (Native)",
            ]}
            onSelect={(selectedOption) => {
              console.log(`Selected: ${selectedOption}`);
            }}
          />
        </S.LangContainer>
        <S.LangContainer>
          <DropDown
            isLong={false}
            placeholder="언어 선택"
            options={[
              "한국어",
              "영어",
              "일본어",
              "중국어",
              "스페인어",
              "프랑스어",
            ]}
            onSelect={(selectedOption) => {
              console.log(`Selected: ${selectedOption}`);
            }}
          />
          <DropDown
            isLong={false}
            placeholder="언어 숙련도 선택"
            options={[
              "기초(Basic)",
              "중급 (Intermediate)",
              "상급 (Advanced)",
              "원어민 (Native)",
            ]}
            onSelect={(selectedOption) => {
              console.log(`Selected: ${selectedOption}`);
            }}
          />
        </S.LangContainer>

        <LongButton type={ButtonType.PALE_GREEN}>
          사용 가능 언어 추가하기
        </LongButton>
        <div style={{ marginBottom: "16px" }} />

        <InputBox title={"취미 및 관심사"} />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>자기소개</S.InputTitle>
        <S.Introduce />
        <div style={{ marginBottom: "25px" }} />

        <LongButton
          type={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
        >
          저장하기
        </LongButton>
        <div style={{ marginBottom: "44px" }} />
      </S.Wrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText="회원정보 수정이 완료되었습니다!"
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
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default EditMypage;
