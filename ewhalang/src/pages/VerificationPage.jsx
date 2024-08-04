import { React, useState } from 'react';
import styled from 'styled-components';
import Topbar from '../components/layout/Topbar';
import { LongButton, ButtonType }  from '../components/common/LongButton';
import Modal from '../components/common/Modal';
import verifiedIcon from '../assets/verifiedIcon.svg';

const VerificationPage = () => {
    const userNickName = "이화인";
    const userEmail = "example@ewha.ac.kr";
    const [isVerified, setIsVerified] = useState(false);
    const [isEmailSentModalOpen, setIsEmailSentModalOpen] = useState(false);

    return (
        <PageWrapper>
            {isVerified ? (
                <VerifiedContent>
                    <ImageWrapper>
                        <img src={verifiedIcon} alt="Verified Icon" />
                    </ImageWrapper>
                    <PageTitle>학생 인증이 완료되었습니다.</PageTitle>
                        <PageDescription>
                        {userNickName}님, 이화랑의 회원으로 등록되셨습니다. 환영합니다!
                        </PageDescription>
                    <ButtonWrapper>
                    <LongButton type={ButtonType.GREEN}>
                        이화랑 친구 찾기
                    </LongButton>
                    </ButtonWrapper>
                </VerifiedContent>
            ) : (
                <>
            <Topbar left={"back"}/>
            <ContentWrapper>
                <PageTitle>학생 인증</PageTitle>
                <PageDescription>
                    학교 이메일로 학생 인증을 마쳐야 이화랑 친구를 찾을 수 있어요.
                </PageDescription>
                <EmailInfoWrapper>
                    <EmailInfoTitle>가입된 학교 이메일</EmailInfoTitle>
                    <EmailInfo>{userEmail}</EmailInfo>
                </EmailInfoWrapper>
            </ContentWrapper>
            <ButtonWrapper>
                <LongButton type={ButtonType.GREEN} onClick={() => setIsEmailSentModalOpen(true)}>
                    이메일로 학생 인증하기
                </LongButton>
            </ButtonWrapper>
            <Modal
        isOpen={isEmailSentModalOpen}
        onClose={() => setIsEmailSentModalOpen(false)}
        guideText="이메일로 인증 링크를 발송했습니다. 메일함을 확인해주세요!"
        confirmText="확인"
        onConfirm={() => {
          setIsEmailSentModalOpen(false);
          setIsVerified(true);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
                </>
            )}
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    padding: 48px 24px 0;
`;

const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const PageDescription = styled.p`
    font-size: 16px;
    color: var(--grey1);
    width: 225px;
    height: 48px;
    margin-bottom: 32px;
`;

const EmailInfoWrapper = styled.div`
    margin-bottom: 24px;
`;

const EmailInfoTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    height: 24px;
`;

const EmailInfo = styled.div`
    background-color: var(--sub3);
    padding: 12px 13px;
    border-radius: 10px;
    font-size: 16px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    padding: 0 24px;
    position: fixed;
    bottom: 0;
`;

const VerifiedContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100vh;
    padding-top: 172px;

    ${PageTitle} {
        margin-bottom: 24px;
    }

    ${PageDescription} {
        width: 186px;
    }
`;

const ImageWrapper = styled.div`
    margin-bottom: 56px;
    img {
        width: 82px;
        height: 82px;
    }
`;

export default VerificationPage;