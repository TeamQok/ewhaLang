import * as S from "./MainPage.style";
import Topbar from "../components/layout/topbar";
import BottomBar from "../components/layout/BottomBar";
import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { ShortButton } from "../components/common/ShortButton";

const MainPage = () => {
  return (
    <>
      <Topbar title={"메인페이지"} left={"back"} right="setting" />
      <div>메인페이지입니다</div>
      <InputBox placeholder={"이름을 입력해주세요!"} title={"닉네임"} />
      <LongButton type={ButtonType.LONG_GREY}>
        저장하기
      </LongButton>
      <ShortButton type={ButtonType.GREEN}>
        중복확인
      </ShortButton>
      <BottomBar />
    </>
  );
};

export default MainPage;
