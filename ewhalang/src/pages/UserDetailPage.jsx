import * as S from "./UserDetailPage.style";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import Topbar from "../components/layout/Topbar";
import UserImage from "../components/shared/UserImage";
import UserCoreInformation from "../components/shared/UserCoreInformation";
import UserRequiredInformation from "../components/shared/UserRequiredInformation";
import UserOptionalInformation from "../components/shared/UserOptionalInformation";
import { LongButton, ButtonType } from "../components/common/LongButton";
import ShortDropDown from "../components/shared/ShortDropDown";
import Modal from "../components/common/Modal";
import { useTranslation } from "react-i18next";
import Spinner from "../components/common/Spinner";

const UserDetailPage = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        setUser({ id: userDoc.id, ...userDoc.data() });
      } else {
        console.log("No such user!");
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setLoggedUser({ id: currentUser.uid, ...userDoc.data() });
        } else {
          console.log("No such document!");
        }
      } else {
        setLoggedUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleClick = async () => {
    if (!loggedUser) return;

    try {
      const userInfo = {
        userId: user.id,
        nickname: user.nickname,
        profileImg: user.profileImg,
        country: user.country
      };

      const chatsRef = collection(firestore, "chats");
      const q = query(
        chatsRef,
        where("participantsId", "array-contains", loggedUser.id)
      );
      const querySnapshot = await getDocs(q);
  
      let existingChatId = null;

      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participantsId.includes(user.id) && !chatData.deletedDate[loggedUser.id]) {
          existingChatId = doc.id;
        }
      });

      if (existingChatId) {
        navigate(`/chats/${existingChatId}`);
      } else {
        navigate(`/chats/new`, { 
          state: { 
            otherUser: userInfo,
            loggedUser: loggedUser
          } 
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  
  if (!user || !loggedUser){
    return <Spinner/>;
  }

  const options = [t("actions.report")];

  const handleDotClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelect = (option) => {
    setIsDropDownOpen(false);

    if (option === "신고하기") {
      setIsReportModalOpen(true);
    }
  };

  const handleReportConfirm = async (reportReason) => {
    try {
      await addDoc(collection(firestore, "reports"), {
        reporterId: loggedUser.id,
        reportedUserId: user.id,
        reason: reportReason,
        timestamp: new Date().toISOString(),
      });
      setIsReportModalOpen(false);
      setIsReportConfirmOpen(true);
    } catch (error) {
      console.error("Error adding report: ", error);
    }
  };

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <Topbar
          title={user.nickname}
          left={"back"}
          right="dot"
          rightonClick={handleDotClick}
        />

        <S.ImageContainer>
          <UserImage profilePicture={user.profileImg} alt={user.nickname} />
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
          <LongButton type={ButtonType.GREEN} onClick={handleClick}>
            {t("actions.chat")}
          </LongButton>
        </S.ButtonWrapper>
      </S.ContentWrapper>
      <ShortDropDown
        options={options}
        onSelect={handleSelect}
        isOpen={isDropDownOpen}
      />
      <Modal
        isOpen={isReportModalOpen}
        guideText={t("messages.reportReason")}
        confirmText={t("actions.submitReport")}
        onConfirm={handleReportConfirm}
        isSingleButton={true}
        showTextInput={true}
      />
      <Modal
        isOpen={isReportConfirmOpen}
        guideText={t("messages.reportConfirm")}
        confirmText={t("common.confirm")}
        onConfirm={() => {
          setIsReportConfirmOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
    </S.Wrapper>
  );
};

export default UserDetailPage;