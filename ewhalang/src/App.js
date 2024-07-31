import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import UserDetailPage from "./pages/UserDetailPage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
