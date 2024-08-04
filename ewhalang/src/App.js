import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import UserDetailPage from "./pages/UserDetailPage";
import Onboarding from "./pages/Onboarding";
import ChatListPage from "./pages/ChatListPage";
import Signup2 from "./pages/Signup2";
import Signup1 from "./pages/Signup1";
import FindEmail from "./pages/FindEmail";
import FindPw from "./pages/FindPw";
import FindContainer from "./pages/FindContainer";
import ReSettingPw from "./pages/ReSettingPw";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route exact path="/" element={<MainPage />} />

          {/*로그인 페이지 */}
          <Route exact path="/login" element={<Login />} />
          {/* 초기화면 페이지 */}
          <Route exact path="/onboarding" element={<Onboarding />} />
          {/*회원 상세 페이지 */}
          <Route exact path="/user" element={<UserDetailPage />} />

          {/*채팅 목록 페이지*/}
          <Route exact path="/chats" element={<ChatListPage />} />

          {/*회원가입 페이지1 */}
          <Route exact path="/signup1" element={<Signup1 />} />
          {/*회원가입 페이지2 */}
          <Route exact path="/signup2" element={<Signup2 />} />

          {/* 계정 찾기 */}
          <Route exact path="/find" element={<FindContainer />} />

          {/* 이메일 찾기 */}
          <Route exact path="/findemail" element={<FindEmail />} />

          {/* 비번찾기 */}
          <Route exact path="/findpw" element={<FindPw />} />

          {/* 비번 재설정 */}
          <Route exact path="/repw" element={<ReSettingPw />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
