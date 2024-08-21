import * as S from "./Onboarding.style";
import logo from "../assets/x-logo.svg";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";
import DropDownOnboarding from "../components/common/DropDownOnboarding";
import { useState } from "react";
import Modal from "../components/common/Modal";

const Onboarding = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goSignin = () => {
    if (lang) {
      sessionStorage.setItem("usingLang", lang);
      navigate("/signup1");
    } else {
      setIsModalOpen(true);
    }
  };

  const goLogin = () => {
    if (lang) {
      sessionStorage.setItem("usingLang", lang);
      navigate("/login");
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Title>
          여기에 카피라이팅, 슬로건 등{<br />} 넣으면 좋을 것 같아요
        </S.Title>
        <S.Name>이화랑</S.Name>
        <S.Container>
          <img
            alt="이미지로고"
            src={logo}
            style={{ width: "200px", marginBottom: "97px" }}
          />
          <S.Setting>
            <S.SettingLang>초기 언어설정</S.SettingLang>
            {/* 나중에 드롭다운 연결 */}
            <DropDownOnboarding
              isLong={false}
              placeholder="언어 선택"
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
            />
          </S.Setting>
          <LongButton type={ButtonType.WHITE} onClick={goSignin}>
            새로운 계정 만들기
          </LongButton>
          <div style={{ marginBottom: "8px" }}></div>
          <LongButton type={ButtonType.GREEN} onClick={goLogin}>
            로그인하러 가기
          </LongButton>
        </S.Container>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          guideText="초기 언어를 설정해 주세요!"
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

export default Onboarding;
