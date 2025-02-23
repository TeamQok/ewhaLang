import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
