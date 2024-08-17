import InputBox from "../components/common/InputBox";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./AccountManagePage.style";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const AccountManagePage = () => {
  // 모달, 드롭다운용
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // firebase 연결용
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // 비번 규칙 검사용
  const [err, setErr] = useState(false);
  const [authpw, setAuthpw] = useState(false);

  // 입력창 state
  const [originPw, setOriginPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const onChangeOriginPw = (e) => {
    setOriginPw(e.target.value);
  };
  const onChangeNewPw = (e) => {
    setNewPw(e.target.value);
    setErr(validatePassword(e.target.value));
  };
  const onChangeNewPw2 = (e) => {
    setNewPw2(e.target.value);
    newPw === e.target.value ? setAuthpw(!authpw) : setAuthpw(false);
  };
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/;
    if (!regex.test(password)) {
      return true;
    }
    return false;
  };

  const auth = getAuth();
  const navigate = useNavigate();

  // 기존 회원 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const uid = user.uid;
          const userDocRef = doc(firestore, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserName(userData.name || "No name provided");
            setUserEmail(userData.email || "No email provided");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 회원 탈퇴 메서드
  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      try {
        //authentication에서 해당 user 삭제
        await user.delete();

        // Firestore에서 해당 uid의 문서 삭제
        const userDocRef = doc(firestore, "users", uid);
        await deleteDoc(userDocRef);

        console.log(`Document for user with UID ${uid} successfully deleted.`);

        console.log("User account deleted successfully.");
      } catch (error) {
        console.error("Error deleting user account:", error);

        // 재인증이 필요한 경우 (로그인이 오래되어 인증 세션이 만료된 경우)
        if (error.code === "auth/requires-recent-login") {
          alert(
            "You need to re-authenticate before deleting your account. Please log in again and try."
          );

          // 재인증 프로세스로 리다이렉트
          navigate("/login");
        }
      }
    } else {
      console.error("No user is logged in.");
    }
  };

  return (
    <>
      <Topbar
        title={"계정 관리하기"}
        left={"back"}
        right={"dot"}
        rightonClick={() => setDropdown(!dropdown)}
      />
      {dropdown ? (
        <S.Box
          onClick={() => {
            setIsModalOpen2(true);
            setDropdown(!dropdown);
          }}
        >
          회원 탈퇴하기
        </S.Box>
      ) : (
        <></>
      )}

      <S.Wrapper>
        <S.Title>이름</S.Title>
        <S.DInput
          readOnly={true}
          type="text"
          value={loading ? "로딩중 " : userName}
        />
        <S.Info>변경 불가한 항목입니다.</S.Info>

        <S.Title>이메일</S.Title>
        <S.DInput
          readOnly={true}
          type="text"
          value={loading ? "로딩중 " : userEmail}
        />
        <S.Info>변경 불가한 항목입니다.</S.Info>

        <InputBox
          title={"기존 비밀번호 입력"}
          onChange={onChangeOriginPw}
          value={originPw}
          type="password"
        />
        <div style={{ height: "16px" }} />
        <InputBox
          title={"새 비밀번호 입력"}
          onChange={onChangeNewPw}
          value={newPw}
          type="text"
        />
        <S.Info err={err}>
          * 영문, 숫자, 특수문자 조합
          <br />* 최소 6자에서 최대 20자
        </S.Info>

        <InputBox
          title={"새 비밀번호 확인"}
          onChange={onChangeNewPw2}
          value={newPw2}
          type="password"
        />
        {authpw ? <S.Info>* 알맞은 비밀번호입니다.</S.Info> : <></>}
        <div style={{ height: "24px" }} />
        <LongButton
          ButtonType={ButtonType.GREEN}
          onClick={() => setIsModalOpen(true)}
        >
          수정 완료
        </LongButton>
        <div style={{ height: "24px" }} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guideText="비밀번호 변경이 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen(false);
          }}
          isSingleButton={true}
          showTextInput={false}
        />

        <Modal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          guideText="정말 탈퇴 히시겠습니까?"
          confirmText="예"
          cancelText="아니오"
          onConfirm={() => {
            setIsModalOpen2(false);
            setIsModalOpen3(true);
            deleteAccount();
          }}
          onCancel={() => {
            setIsModalOpen2(false);
          }}
          isSingleButton={false}
          showTextInput={false}
        />

        <Modal
          isOpen={isModalOpen3}
          onClose={() => setIsModalOpen3(false)}
          guideText="회원 탈퇴가 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsModalOpen3(false);
            navigate("/onboarding");
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.Wrapper>
      <BottomBar isOnMypage={true} />
    </>
  );
};

export default AccountManagePage;
