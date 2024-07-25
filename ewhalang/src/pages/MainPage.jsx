import * as S from "./MainPage.style";
import Topbar from "../components/layout/Topbar";
import BottomBar from "../components/layout/BottomBar";
import InputBox from "../components/common/InputBox";

const MainPage = () => {
  return (
    <>
      <Topbar title={"메인페이지"} left={"back"} right="setting" />
      <div>메인페이지입니다</div>
      <InputBox placeholder={"이름을 입력해주세요!"} title={"닉네임"} />
      <BottomBar />
    </>
  );
};

export default MainPage;
