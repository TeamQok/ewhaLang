import * as S from "./UserDetailPage.style";
import React, { useState } from "react";
import Topbar from "../components/layout/Topbar";
import UserImage from "../components/shared/UserImage";
import UserCoreInformation from "../components/shared/UserCoreInformation";
import UserRequiredInformation from "../components/shared/UserRequiredInformation";
import UserOptionalInformation from "../components/shared/UserOptionalInformation";
import { LongButton, ButtonType } from "../components/common/LongButton";
import ShortDropDown from "../components/shared/ShortDropDown";
import Modal from "../components/common/Modal";
import { useParams } from 'react-router-dom';
import userMockData from '../_mock/userMockData';
import { useNavigate } from "react-router-dom";

const UserDetailPage = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);
  const { userId } = useParams();
  const user = userMockData.find(user => user.userId === userId);
  const navigate = useNavigate();

  //API 연결시 채팅 추가 후 반환받은 id값으로 교체할 예정
  const chatId = '1';
  const handleClick = () => {
    navigate(`/chats/${chatId}`);
  }

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
        onConfirm={() => {
          setIsReportModalOpen(false);
          setIsReportConfirmOpen(true);
        }}
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
