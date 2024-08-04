import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import UserDetailPage from "./pages/UserDetailPage";
import UserListPage from "./pages/UserListPage";
import Onboarding from "./pages/Onboarding";
import VerificationPage from "./pages/VerificationPage";
import ChatListPage from "./pages/ChatListPage";
import ChattingPage from "./pages/ChattingPage";
import MyPage from "./pages/MyPage";

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

          {/*마이 페이지 */}
          <Route exact path="/mypage" element={<MyPage />} />

          {/*회원 상세 페이지 */}
          <Route exact path="/user" element={<UserDetailPage />} />

          {/*회원 목록 페이지 */}
          <Route exact path="/userlist" element={<UserListPage />} />

          {/*학생 인증 페이지*/}
          <Route exact path="/verify" element={<VerificationPage />} />

          {/*채팅 목록 페이지*/}
          <Route exact path="/chats" element={<ChatListPage />} />

          {/*채팅 페이지*/}
          <Route exact path="/chat" element={<ChattingPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
