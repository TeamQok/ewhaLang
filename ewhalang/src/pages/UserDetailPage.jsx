
import * as S from './UserDetailPage.style'
import React, { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import UserImage from '../components/shared/UserImage';
import UserCoreInformation from '../components/shared/UserCoreInformation';
import UserRequiredInformation from '../components/shared/UserRequiredInformation';
import UserOptionalInformation from '../components/shared/UserOptionalInformation';
import { LongButton, ButtonType } from '../components/common/LongButton';
import ShortDropDown from '../components/shared/ShortDropDown';
import Modal from '../components/common/Modal';

const UserDetailPage = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isReportConfirmOpen, setIsReportConfirmOpen] = useState(false);


  // 예시 사용자 데이터
  const user = {
    nickname: "홍길동",
    profilePicture:
      "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "대한민국",
    gender: "남성",
    birthdate: "1990",
    major: "컴퓨터 공학",
    languages: [
      { language: "한국어", level: "원어민" },
      { language: "영어", level: "중급" },
      { language: "일본어", level: "초급" },
    ],
    hobby: "독서, 여행",
    introduction: "안녕하세요! 저는 소프트웨어 개발자입니다.",
  };

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

  const options = ['신고하기'];

  const handleDotClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelect = (option) => {
    setIsDropDownOpen(false);

    if(option === '신고하기'){
      setIsReportModalOpen(true);
    }
  };

  return (
    <S.Wrapper>

        <S.ContentWrapper>
        <Topbar title={user.nickname} left={"back"} right="dot" rightonClick={handleDotClick} />

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

            <LongButton type={ButtonType.GREEN}>
                채팅하기
            </LongButton>
        </S.ButtonWrapper>
        </S.ContentWrapper>
        <ShortDropDown options={options} onSelect={handleSelect} isOpen={isDropDownOpen} />
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
