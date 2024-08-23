import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import UserDetailPage from "./pages/UserDetailPage";
import Onboarding from "./pages/Onboarding";
import UserListPage from "./pages/UserListPage";
import ChatListPage from "./pages/ChatListPage";
import Signup2 from "./pages/Signup2";
import Signup1 from "./pages/Signup1";
import FindContainer from "./pages/FindContainer";
import ReSettingPw from "./pages/ReSettingPw";
import ChattingPage from "./pages/ChattingPage";
import MyPage from "./pages/MyPage";
import Setting from "./pages/Setting";
import LangSettingPage from "./pages/LangSettingPage";
import AccountManagePage from "./pages/AccountManagePage";
import FeedbackPage from "./pages/FeedbackPage";
import EditMypage from "./pages/EditMypage";
import VerificationPage from "./pages/VerificationPage";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>  
      <ScrollToTop/>
      <Routes>
          {/* 메인 페이지 */}
          <Route exact path="/" element={<MainPage />} />

          {/*로그인 페이지 */}
          <Route exact path="/login" element={<Login />} />
          {/* 초기화면 페이지 */}
          <Route exact path="/onboarding" element={<Onboarding />} />

          {/*마이 페이지 */}
          <Route exact path="/mypage" element={<MyPage />} />

          {/*회원 상세 페이지 */}
          <Route exact path="/users/:userId" element={<UserDetailPage />} />

          {/*회원 상세 페이지 */}
          <Route exact path="/users" element={<UserListPage />} />

          {/*채팅 목록 페이지*/}
          <Route exact path="/chats" element={<ChatListPage />} />

          {/*채팅 페이지*/}
          <Route exact path="/chats/:chatId" element={<ChattingPage />} />

          {/*회원가입 페이지1 */}
          <Route exact path="/signup1" element={<Signup1 />} />
          {/*회원가입 페이지2 */}
          <Route exact path="/signup2" element={<Signup2 />} />

          {/* 학생 인증 */}
          <Route exact path="/verify" element={<VerificationPage />} />

          {/* 계정 찾기 */}
          <Route exact path="/find" element={<FindContainer />} />

          {/* 비번 재설정 */}
          <Route exact path="/repw" element={<ReSettingPw />} />

          {/*설정 페이지*/}
          <Route exact path="/setting" element={<Setting />} />

          {/*언어 설정 페이지*/}
          <Route exact path="/langsetting" element={<LangSettingPage />} />

          {/*언어 설정 페이지*/}
          <Route exact path="/accountmanage" element={<AccountManagePage />} />

          {/*언어 설정 페이지*/}
          <Route exact path="/feedback" element={<FeedbackPage />} />

          {/*마이페이지 수정 페이지*/}
          <Route exact path="/editmypage" element={<EditMypage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
