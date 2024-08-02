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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route exact path="/" element={<MainPage />} />

          {/*로그인 페이지 */}
          <Route exact path="/login" element={<Login />} />

          {/*회원 상세 페이지 */}
          <Route exact path="/user" element={<UserDetailPage />} />

          {/*회원 목록 페이지 */}
          <Route exact path="/userlist" element={<UserListPage />} />

          {/*학생 인증 페이지*/}
          <Route exact path="/verify" element={<VerificationPage/>}/>

          {/*채팅 목록 페이지*/}
          <Route exact path="/chats" element={<ChatListPage/>}/>
          
          {/* 초기화면 페이지 */}
          <Route exact path="/onboarding" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
