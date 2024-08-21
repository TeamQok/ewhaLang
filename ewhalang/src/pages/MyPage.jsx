import * as S from "./MyPage.style";
import React, { useState, useEffect } from "react";
import Topbar from "../components/layout/Topbar";
import UserImage from "../components/shared/UserImage";
import UserCoreInformation from "../components/shared/UserCoreInformation";
import UserRequiredInformation from "../components/shared/UserRequiredInformation";
import UserOptionalInformation from "../components/shared/UserOptionalInformation";
import { LongButton, ButtonType } from "../components/common/LongButton";
import EditButton from "../components/pages/EditButton";
import BottomBar from "../components/layout/BottomBar";
import Modal from "../components/common/Modal";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const MyPage = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // 사용자가 로그인한 경우, Firestore에서 사용자 정보를 가져옵니다.
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
        } else {
          console.log("No such document!");
        }
      } else {
        // 사용자가 로그아웃한 경우
        setUser(null);
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const goSetting = () => {
    navigate("/setting");
  };

  const goEditMypage = () => {
    navigate("/editmypage");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsConfirmModalOpen(true);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <Topbar title={"마이페이지"} right="setting" rightonClick={goSetting} />
        <S.EditButtonWrapper onClick={goEditMypage}>
          <EditButton />
        </S.EditButtonWrapper>
        <S.ImageContainer>
          <UserImage profilePicture={user.profilePicture} alt={user.nickname} />
        </S.ImageContainer>
        <UserCoreInformation nickname={user.nickname} country={user.country} />
        <S.Divider />
        <UserRequiredInformation
          gender={user.gender}
          birthdate={user.birthdate}
          major={user.major}
          languages={user.languages}
        />
        <S.BoldDivider />
        <UserOptionalInformation
          hobby={user.hobby}
          introduction={user.introduction}
        />
        <S.ButtonWrapper>
          <LongButton
            type={ButtonType.GREEN}
            onClick={() => setIsLogoutModalOpen(true)}
          >
            로그아웃
          </LongButton>
        </S.ButtonWrapper>
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          guideText="정말 로그아웃 하시겠습니까?"
          confirmText="예"
          cancelText="아니오"
          onConfirm={() => {
            setIsLogoutModalOpen(false);
            handleLogout();
          }}
          onCancel={() => {
            setIsLogoutModalOpen(false);
          }}
          isSingleButton={false}
          showTextInput={false}
        />
        <Modal
          isOpen={isConfirmModalOpen}
          guideText="로그아웃이 완료되었습니다."
          confirmText="확인"
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            navigate("/login");
          }}
          isSingleButton={true}
          showTextInput={false}
        />
      </S.ContentWrapper>
      <BottomBar isOnMypage={true} />
    </S.Wrapper>
  );
};

export default MyPage;