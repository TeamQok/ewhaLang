import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./Setting.style";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

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
      <Topbar title={"설정"} left={"back"} />
      <S.Container onClick={goLangSetting}>
        <S.SmallTitle>언어 설정</S.SmallTitle>
        <S.Title>언어 설정하기</S.Title>
      </S.Container>

      <S.Container onClick={goAccount}>
        <S.SmallTitle>계정 관리</S.SmallTitle>
        <S.Title>계정 관리하기</S.Title>
      </S.Container>

      <S.Container onClick={goFeedback}>
        <S.SmallTitle>기타</S.SmallTitle>
        <S.Title>개발자에게 피드백 보내기</S.Title>
      </S.Container>
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default Setting;
