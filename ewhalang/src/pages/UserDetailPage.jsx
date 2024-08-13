import * as S from "./UserDetailPage.style";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import Topbar from "../components/layout/Topbar";
import UserImage from "../components/shared/UserImage";
import UserCoreInformation from "../components/shared/UserCoreInformation";
import UserRequiredInformation from "../components/shared/UserRequiredInformation";
import UserOptionalInformation from "../components/shared/UserOptionalInformation";
import { LongButton, ButtonType } from "../components/common/LongButton";
import ShortDropDown from "../components/shared/ShortDropDown";
import Modal from "../components/common/Modal";
import userMockData from '../_mock/userMockData';

const UserDetailPage = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const { userId } = useParams();
  const user = userMockData.find(user => user.userId === userId);
  const navigate = useNavigate();
  const loggedInUserId = 'user1';

  const loggedUserInfo = {
    nickname: "John Doe",
    profilePhoto: "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "미국"
  };

  const handleClick = async () => {
    try {
      // user에서 필요한 정보만 추출
      const userInfo = {
        userId: user.userId,
        nickname: user.nickname,
        profilePhoto: user.profilePhoto,
        country: user.country
      };

      // 기존 채팅 검색
      const chatsRef = collection(firestore, "chats");
      const q = query(
        chatsRef,
        where("participantsId", "array-contains", loggedInUserId)
      );
      const querySnapshot = await getDocs(q);
  
      let existingChatId = null;

      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participantsId.includes(user.userId)) {
          existingChatId = doc.id;
        }
      });

      if (existingChatId) {
        // 기존 채팅이 있으면 해당 채팅으로 이동
        navigate(`/chats/${existingChatId}`);
      } else {
        // 기존 채팅이 없으면 새 채팅 생성
        const newChatRef = await addDoc(chatsRef, {
          participantsId: [loggedInUserId, user.userId],
          participantsInfo: {
            [loggedInUserId]: loggedUserInfo,
            [user.userId]: userInfo
          },
          lastMessage: {
            content: '',
            timestamp: '',
            senderId: ''
          },
          unreadCounts: {
            [loggedInUserId]: 0,
            [user.userId]: 0
          }
        });  

        // 채팅 페이지로 이동
        navigate(`/chats/${newChatRef.id}`);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
  
  if (!user){
    return <div>사용자를 찾을 수 없습니다.</div>
  }

  const options = ["신고하기"];

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
      // Add report reason to Firestore
      await addDoc(collection(firestore, "reports"), {
        reporterId: loggedInUserId,
        reportedUserId: user.userId,
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
          <LongButton type={ButtonType.GREEN} onClick={handleClick}>채팅하기</LongButton>
        </S.ButtonWrapper>
      </S.ContentWrapper>
      <ShortDropDown
        options={options}
        onSelect={handleSelect}
        isOpen={isDropDownOpen}
      />
      <Modal
        isOpen={isReportModalOpen}
        guideText="신고 사유를 작성해주세요."
        confirmText="작성완료"
        onConfirm={handleReportConfirm}
        isSingleButton={true}
        showTextInput={true}
      />
      <Modal
        isOpen={isReportConfirmOpen}
        guideText="신고를 완료했습니다."
        confirmText="확인"
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
