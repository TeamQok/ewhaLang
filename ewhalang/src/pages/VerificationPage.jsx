import React, { useState } from 'react';
import * as S from './VerificationPage.style';
import Topbar from '../components/layout/Topbar';
import { LongButton, ButtonType } from '../components/common/LongButton';
import Modal from '../components/common/Modal';
import verifiedIcon from '../assets/verifiedIcon.svg';
import { useNavigate } from 'react-router-dom';
import userMockData from '../_mock/userMockData';

const VerificationPage = () => {
    const userId = "user2"; // 현재 사용자 ID
    const navigate = useNavigate();

    // userMockData에서 사용자 정보 가져오기
    const user = userMockData.find(user => user.userId === userId);

    // 상태 훅 선언
    const [isVerified, setIsVerified] = useState(user?.isValidated || false);
    const [isEmailSentModalOpen, setIsEmailSentModalOpen] = useState(false);

    // 사용자 정보가 존재하지 않을 경우 처리
    if (!user) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    // 사용자 정보에서 필요한 값 추출
    const { email: userEmail, nickname: userNickName } = user;

    const handleOnClick = () => {
        navigate(`/users`);
    };

    const handleConfirm = () => {
        setIsEmailSentModalOpen(false);
        if (!isVerified) {
            setIsVerified(true); // 인증 상태 업데이트
        }
    };

    return (
        <S.PageWrapper>
            {isVerified ? (
                <S.VerifiedContent>
                    <S.ImageWrapper>
                        <img src={verifiedIcon} alt="Verified Icon" />
                    </S.ImageWrapper>
                    <S.PageTitle>학생 인증이 완료되었습니다.</S.PageTitle>
                    <S.PageDescription>
                        {userNickName}님, 이화랑의 회원으로 등록되셨습니다. 환영합니다!
                    </S.PageDescription>
                    <S.ButtonWrapper>
                        <LongButton type={ButtonType.GREEN} onClick={handleOnClick}>
                            이화랑 친구 찾기
                        </LongButton>
                    </S.ButtonWrapper>
                </S.VerifiedContent>
            ) : (
                <>
                    <Topbar left={"back"} />
                    <S.ContentWrapper>
                        <S.PageTitle>학생 인증</S.PageTitle>
                        <S.PageDescription>
                            학교 이메일로 학생 인증을 마쳐야 이화랑 친구를 찾을 수 있어요.
                        </S.PageDescription>
                        <S.EmailInfoWrapper>
                            <S.EmailInfoTitle>가입된 학교 이메일</S.EmailInfoTitle>
                            <S.EmailInfo>{userEmail}</S.EmailInfo>
                        </S.EmailInfoWrapper>
                    </S.ContentWrapper>
                    <S.ButtonWrapper>
                        <LongButton type={ButtonType.GREEN} onClick={() => setIsEmailSentModalOpen(true)}>
                            이메일로 학생 인증하기
                        </LongButton>
                    </S.ButtonWrapper>
                    <Modal
                        isOpen={isEmailSentModalOpen}
                        onClose={() => setIsEmailSentModalOpen(false)}
                        guideText="이메일로 인증 링크를 발송했습니다. 메일함을 확인해주세요!"
                        confirmText="확인"
                        onConfirm={handleConfirm}
                        isSingleButton={true}
                        showTextInput={false}
                    />
                </>
            )}
        </S.PageWrapper>
    );
};

export default VerificationPage;