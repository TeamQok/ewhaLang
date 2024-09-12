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
import { useTranslation } from 'react-i18next';
import Spinner from '../components/common/Spinner';

const VerificationPage = () => {
    const { t } = useTranslation();
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
        return <Spinner/>;
    }

    return (
        <S.PageWrapper>
          {verificationStatus === 'verified' ? (
            <S.VerifiedContent>
              <S.ImageWrapper>
                <img src={verifiedIcon} alt={t('verification.verified.title')} />
              </S.ImageWrapper>
              <S.PageTitle>{t('verification.verified.title')}</S.PageTitle>
              <S.PageDescription>
                {t('verification.verified.description', { nickname: user.nickname })}
              </S.PageDescription>
              <S.ButtonWrapper>
                <LongButton type={ButtonType.GREEN} onClick={() => navigate(`/users`)}>
                  {t('verification.verified.button')}
                </LongButton>
              </S.ButtonWrapper>
            </S.VerifiedContent>
          ) : (
            <>
              <Topbar left={"back"} />
              <S.ContentWrapper>
                <S.PageTitle>{t('verification.title')}</S.PageTitle>
                <S.PageDescription>
                  {verificationStatus === 'pending' 
                    ? t('verification.pending.description')
                    : t('verification.unverified.description')}
                </S.PageDescription>
                <S.EmailInfoWrapper>
                  <S.EmailInfoTitle>{t('verification.unverified.emailTitle')}</S.EmailInfoTitle>
                  <S.EmailInfo>{user.email}</S.EmailInfo>
                </S.EmailInfoWrapper>
              </S.ContentWrapper>
              <S.ButtonWrapper>
                <LongButton 
                  type={verificationStatus === 'pending' ? ButtonType.LONG_GREY : ButtonType.GREEN} 
                  onClick={verificationStatus === 'pending' ? undefined : sendVerificationEmail}
                  disabled={verificationStatus === 'pending'}
                >
                  {verificationStatus === 'pending' 
                    ? t('verification.pending.button')
                    : t('verification.unverified.button')}
                </LongButton>
              </S.ButtonWrapper>
              <Modal
                isOpen={isEmailSentModalOpen}
                onClose={() => setIsEmailSentModalOpen(false)}
                guideText={t('verification.modal.message')}
                confirmText={t('verification.modal.confirm')}
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