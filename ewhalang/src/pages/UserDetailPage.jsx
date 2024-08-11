import * as S from "./UserDetailPage.style";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
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

  const currentUser = {
    userId: "user1", //현재 로그인한 유저
    nickname: "John Doe",
    profilePhoto: "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "미국"
  };

  const handleClick = async () => {
    try {
      // Firestore에 새로운 채팅 추가
      const chatRef = await addDoc(collection(firestore, "chats"), {
        participants: [currentUser, user],
        lastMessage: {
          content: '',
          timestamp: '',
          senderId: ''
        },
        unreadCounts: {
          [currentUser.userId]: 0,
          [user.userId]: 0
        }
      });

      // 채팅 페이지로 이동
      navigate(`/chats/${chatRef.id}`);
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
        reporterId: currentUser.userId,
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
