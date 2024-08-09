// VerificationPage.style.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export const ContentWrapper = styled.div`
    flex-grow: 1;
    padding: 48px 24px 0;
`;

export const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const PageDescription = styled.p`
    font-size: 16px;
    color: var(--grey1);
    width: 225px;
    height: 48px;
    margin-bottom: 32px;
`;

export const EmailInfoWrapper = styled.div`
    margin-bottom: 24px;
`;

export const EmailInfoTitle = styled.h2`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
    height: 24px;
`;

export const EmailInfo = styled.div`
    background-color: var(--sub3);
    padding: 12px 13px;
    border-radius: 10px;
    font-size: 16px;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    padding: 0 24px;
    position: fixed;
    bottom: 0;
`;

export const VerifiedContent = styled.div`
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

export const ImageWrapper = styled.div`
    margin-bottom: 56px;
    img {
        width: 82px;
        height: 82px;
    }
`;