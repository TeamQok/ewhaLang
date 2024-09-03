import "./style/common.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

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
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "./assets/logo.svg";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        uid: parsedUser.uid,
        accessToken: parsedUser.accessToken,
      });
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          currentUser.getIdToken().then((token) => {
            setUser({
              uid: currentUser.uid,
              accessToken: token,
            });
            setLoading(false);
          });
        } else {
          setUser(null);
          setLoading(false);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  if (loading) {
    return (
      <>
        <Img>
          <img src={logo} />
        </Img>
        <div>{loading}</div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/*로그인 페이지 */}
          <Route exact path="/login" element={<Login />} />

          {/* 초기화면 페이지 */}
          <Route
            path="/"
            element={<Navigate to={user ? "/users" : "/onboarding"} />}
          />

          {/*온보딩 페이지 */}
          <Route exact path="/onboarding" element={<Onboarding />} />

          {/*마이 페이지 */}
          <Route
            exact
            path="/mypage"
            element={
              <ProtectedRoute user={user}>
                <MyPage />
              </ProtectedRoute>
            }
          />

          {/*회원 상세 페이지 */}
          <Route
            exact
            path="/users/:userId"
            element={
              <ProtectedRoute user={user}>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />

          {/*회원 상세 페이지 */}
          <Route
            exact
            path="/users"
            element={
              <ProtectedRoute user={user}>
                <UserListPage />
              </ProtectedRoute>
            }
          />

          {/*채팅 목록 페이지*/}
          <Route
            exact
            path="/chats"
            element={
              <ProtectedRoute user={user}>
                <ChatListPage />
              </ProtectedRoute>
            }
          />

          {/*채팅 페이지*/}
          <Route
            exact
            path="/chats/:chatId"
            element={
              <ProtectedRoute user={user}>
                <ChattingPage />
              </ProtectedRoute>
            }
          />

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
          <Route
            exact
            path="/setting"
            element={
              <ProtectedRoute user={user}>
                <Setting />
              </ProtectedRoute>
            }
          />

          {/*언어 설정 페이지*/}
          <Route
            exact
            path="/langsetting"
            element={
              <ProtectedRoute user={user}>
                <LangSettingPage />
              </ProtectedRoute>
            }
          />

          {/*언어 설정 페이지*/}
          <Route
            exact
            path="/accountmanage"
            element={
              <ProtectedRoute user={user}>
                <AccountManagePage />
              </ProtectedRoute>
            }
          />

          {/*언어 설정 페이지*/}
          <Route
            exact
            path="/feedback"
            element={
              <ProtectedRoute user={user}>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          {/*마이페이지 수정 페이지*/}
          <Route
            exact
            path="/editmypage"
            element={
              <ProtectedRoute user={user}>
                <EditMypage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

const Img = styled.div`
  width: 100rem;
  height: 100rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
