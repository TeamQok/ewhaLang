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
import { useTranslation } from "react-i18next";

const MyPage = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ id: currentUser.uid, ...userDoc.data() });
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        navigate("/login");
      }
    });

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
        <Topbar title={t("pageTitles.mypage")} right="setting" rightonClick={goSetting} />
        <S.EditButtonWrapper onClick={goEditMypage}>
          <EditButton>{t("mypage.edit")}</EditButton>
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
            {t("mypage.logout")}
          </LongButton>
        </S.ButtonWrapper>
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          guideText={t("mypage.logoutConfirm")}
          confirmText={t("common.yes")}
          cancelText={t("common.no")}
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
          guideText={t("mypage.logoutCompleted")}
          confirmText={t("common.confirm")}
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