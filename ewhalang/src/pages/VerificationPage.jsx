import React, { useState, useEffect, useCallback } from 'react';
import * as S from './VerificationPage.style';
import Topbar from '../components/layout/Topbar';
import { LongButton, ButtonType } from '../components/common/LongButton';
import Modal from '../components/common/Modal';
import verifiedIcon from '../assets/verifiedIcon.svg';
import { useNavigate } from 'react-router-dom';
import { 
  sendEmailVerification,
  reload
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";

const VerificationPage = () => {
    const [user, setUser] = useState(null);
    const [verificationStatus, setVerificationStatus] = useState('unverified');
    const [isEmailSentModalOpen, setIsEmailSentModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const checkVerificationStatus = useCallback(async () => {
        if (auth.currentUser) {
            await reload(auth.currentUser);
            if (auth.currentUser.emailVerified) {
                await updateDoc(doc(firestore, "users", auth.currentUser.uid), { verificationStatus: 'verified' });
                setVerificationStatus('verified');
            }
        }
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUser({ id: currentUser.uid, ...userDoc.data() });
                        setVerificationStatus(userDoc.data().verificationStatus || 'unverified');
                    } else {
                        console.log("No such document!");
                        setError("User document not found");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                    setError("Error fetching user data");
                }
            } else {
                navigate("/login");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        const intervalId = setInterval(checkVerificationStatus, 5000); // 5초마다 확인
        return () => clearInterval(intervalId);
    }, [checkVerificationStatus]);

    const sendVerificationEmail = useCallback(async () => {
        if (!auth.currentUser) {
            setError("No authenticated user found");
            return;
        }

        try {
            await sendEmailVerification(auth.currentUser);
            console.log("Verification email sent successfully");
            setIsEmailSentModalOpen(true);
            await updateDoc(doc(firestore, "users", auth.currentUser.uid), { verificationStatus: 'pending' });
            setVerificationStatus('pending');
        } catch (error) {
            console.error("Error sending verification email:", error);
            setError("Failed to send verification email");
        }
    }, []);

    const handleConfirm = () => {
        setIsEmailSentModalOpen(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <S.PageWrapper>
            {verificationStatus === 'verified' ? (
                <S.VerifiedContent>
                    <S.ImageWrapper>
                        <img src={verifiedIcon} alt="Verified Icon" />
                    </S.ImageWrapper>
                    <S.PageTitle>학생 인증이 완료되었습니다.</S.PageTitle>
                    <S.PageDescription>
                        {user.nickname}님, 이화랑의 회원으로 등록되셨습니다. 환영합니다!
                    </S.PageDescription>
                    <S.ButtonWrapper>
                        <LongButton type={ButtonType.GREEN} onClick={() => navigate(`/users`)}>
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
                            {verificationStatus === 'pending' 
                                ? '인증 이메일을 발송했습니다. 메일함을 확인해주세요.' 
                                : '학교 이메일로 학생 인증을 마쳐야 이화랑 친구를 찾을 수 있어요.'}
                        </S.PageDescription>
                        <S.EmailInfoWrapper>
                            <S.EmailInfoTitle>가입된 학교 이메일</S.EmailInfoTitle>
                            <S.EmailInfo>{user.email}</S.EmailInfo>
                        </S.EmailInfoWrapper>
                    </S.ContentWrapper>
                    <S.ButtonWrapper>
                        <LongButton 
                            type={verificationStatus === 'pending' ? ButtonType.LONG_GREY : ButtonType.GREEN} 
                            onClick={verificationStatus === 'pending' ? undefined : sendVerificationEmail}
                            disabled={verificationStatus === 'pending'}
                        >
                            {verificationStatus === 'pending' ? '인증 대기 중' : '이메일로 학생 인증하기'}
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