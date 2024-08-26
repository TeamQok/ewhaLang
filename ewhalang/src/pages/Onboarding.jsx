import * as S from "./Onboarding.style";
import logo from "../assets/x-logo.svg";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useNavigate } from "react-router-dom";
import DropDownOnboarding from "../components/common/DropDownOnboarding";
import { useEffect, useState } from "react";
import Modal from "../components/common/Modal";
import { useTranslation } from "react-i18next";

const Onboarding = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("usingLanguage");
    if (selectedLanguage) {
      setLang(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  const goSignin = () => {
    if (lang) {
      navigate("/signup1");
    } else {
      setIsModalOpen(true);
    }
  };

  const goLogin = () => {
    if (lang) {
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
        <S.Name>{t("onboarding.title")}</S.Name>
        <S.Container>
          <img
            alt="이미지로고"
            src={logo}
            style={{ width: "200px", marginBottom: "97px" }}
          />
          <S.Setting>
            <S.SettingLang>{t("onboarding.langSetting")}</S.SettingLang>
            {/* 나중에 드롭다운 연결 */}
            <DropDownOnboarding
              isLong={false}
              placeholder={t("onboarding.option")}
              options={[t("onboarding.ko"), t("onboarding.en")]}
              onSelect={(selectedOption) => {
                console.log(`Selected: ${selectedOption}`);
                const selectedLangCode =
                  selectedOption === t("onboarding.ko") ? "ko" : "en";
                localStorage.setItem("usingLanguage", selectedLangCode);
                setLang(selectedOption);
                i18n.changeLanguage(selectedLangCode); // 언어 변경 호출
              }}
            />
          </S.Setting>
          <LongButton type={ButtonType.WHITE} onClick={goSignin}>
            {t("onboarding.signup")}
          </LongButton>
          <div style={{ marginBottom: "8px" }}></div>
          <LongButton type={ButtonType.GREEN} onClick={goLogin}>
            {t("onboarding.login")}
          </LongButton>
        </S.Container>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          guideText={t("onboarding.modal")}
          confirmText={t("onboarding.modalOk")}
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
