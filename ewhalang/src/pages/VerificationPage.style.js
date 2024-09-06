// VerificationPage.style.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 141px);
    overflow: hidden;
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
    overflow-wrap: break-word;
    word-break: keep-all;
    white-space: normal;
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
    margin: 20px 0;
    position: fixed;
    bottom: 0px;
`;

export const VerifiedContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    padding-top: 122px;

    ${PageTitle} {
        margin-bottom: 24px;
        padding: 0 24px;
    }

    ${PageDescription} {
        width: 186px;
    }
`;

export const ImageWrapper = styled.div`
    margin-bottom: 45px;
    img {
        width: 82px;
        height: 82px;
    }
`;