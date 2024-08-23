import InputBox from "../components/common/InputBox";
import { ButtonType, LongButton } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import BottomBar from "../components/layout/BottomBar";
import Topbar from "../components/layout/Topbar";
import * as S from "./AccountManagePage.style";
import { useEffect, useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import cloeye from "../assets/cloeye.svg";
import eyeImg from "../assets/eye.svg";

const AccountManagePage = () => {
  // 모달, 드롭다운, 버튼
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [btn, setBtn] = useState(false);
  // 조건에 따라 ButtonType을 설정합니다.
  const buttonType = btn ? ButtonType.GREEN : ButtonType.LONG_GREY_BLACK;

  // firebase 연결용
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // 비번 규칙 검사용
  const [err, setErr] = useState(false);
  const [authpw, setAuthpw] = useState(false);
  const [isCurrentPw, setIsCurrentPw] = useState(false);
  const [isDiffer, setIsDiffer] = useState(true);

  // 입력창 state
  const [originPw, setOriginPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  // 눈 아이콘
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const onChangeOriginPw = (e) => {
    setOriginPw(e.target.value);
  };
  const onChangeNewPw = (e) => {
    setNewPw(e.target.value);
    // 기존 비번과 새 비번이 다른지 확인
    if (originPw === e.target.value) {
      setIsDiffer(!isDiffer);
    }
    setErr(validatePassword(e.target.value));
  };

  const onChangeNewPw2 = (e) => {
    setNewPw2(e.target.value);
    newPw === e.target.value ? setAuthpw(!authpw) : setAuthpw(false);
    // 모두 만족할 때 수정완료 버튼 활성화
    if (isDiffer && newPw === e.target.value) {
      setBtn(!btn);
    }
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

  ////////////////////////////////////////////////////////////////////
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
      } catch (error) {
        console.error("Error deleting user account:", error);

        // 재인증이 필요한 경우 (로그인이 오래되어 인증 세션이 만료된 경우)
        if (error.code === "auth/requires-recent-login") {
          alert("세션이 만료되어 다시 로그인해야합니다.");

          // 재인증 프로세스로 리다이렉트
          navigate("/login");
        }
      }
    } else {
      console.error("No user is logged in.");
    }
  };

  ////////////////////////////////////////////////////////////////////////
  // 기존 비밀번호와 맞는지 확인
  const verifyPassword = async (currentPassword) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(user, credential);
      setIsCurrentPw(true);
      console.log("기존 패스워드가 맞습니다.", isCurrentPw);
      return true;
    } catch (error) {
      console.error("Error verifying password: ", error);
    }
  };

  ////////////////////////////////////////////////////////////
  // 변경되 비번 firebase 연결
  const changePassword = async (newPassword) => {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    try {
      if (await verifyPassword(newPw)) {
        await updatePassword(user, newPassword);
        setIsModalOpen(true);
        console.log("Password updated successfully!");
      }
    } catch (error) {
      console.error("Error updating password: ", error);
    }
  };

  const onClickEye = () => {
    setEye1(!eye1);
  };
  const onClickEye1 = () => {
    setEye2(!eye2);
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
          type={eye1 ? "text" : "password"}
        />
        <S.Eye src={eye1 ? eyeImg : cloeye} onClick={onClickEye} />
        <div style={{ height: "16px" }} />
        <InputBox
          title={"새 비밀번호 입력"}
          onChange={onChangeNewPw}
          value={newPw}
          type={eye2 ? "text" : "password"}
        />
        <S.Eye1 src={eye2 ? eyeImg : cloeye} onClick={onClickEye1} />
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
        <LongButton type={buttonType} onClick={() => changePassword(newPw)}>
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
            navigate("/setting");
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
