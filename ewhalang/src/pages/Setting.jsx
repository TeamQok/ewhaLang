import { useTranslation } from "react-i18next";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./Setting.style";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const goLangSetting = () => {
    navigate("/langsetting");
  };

  const goAccount = () => {
    navigate("/accountmanage");
  };

  const goFeedback = () => {
    navigate("/feedback");
  };

  return (
    <>
      <Topbar title={t("setting.설정")} left={"back"} />
      <S.Wrapper>
      <S.Container onClick={goLangSetting}>
        <S.SmallTitle>{t("setting.언어 설정")}</S.SmallTitle>
        <S.Title>{t("setting.언어 설정하기")}</S.Title>
      </S.Container>

      <S.Container onClick={goAccount}>
        <S.SmallTitle>{t("setting.계정 관리")}</S.SmallTitle>
        <S.Title>{t("setting.계정 관리하기")}</S.Title>
      </S.Container>

      <S.Container onClick={goFeedback}>
        <S.SmallTitle>{t("setting.기타")}</S.SmallTitle>
        <S.Title>{t("setting.개발자에게 피드백 보내기")}</S.Title>
      </S.Container>
      </S.Wrapper>
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default Setting;
