import "./style/common.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 임포트
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Signup1 from "./pages/Signup1";
import Signup2 from "./pages/Signup2";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route exact path="/" element={<MainPage />} />

          {/* 초기화면 페이지 */}
          <Route exact path="/onboarding" element={<Onboarding />} />

          {/*로그인 페이지 */}
          <Route exact path="/login" element={<Login />} />
          {/*회원가입 페이지1 */}
          <Route exact path="/signup1" element={<Signup1 />} />
          {/*회원가입 페이지2 */}
          <Route exact path="/signup2" element={<Signup2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
