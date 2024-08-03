import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 600;
    min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex: 1; // 남은 공간을 모두 차지하도록 설정
  overflow-y: auto; // 내용이 많을 경우 스크롤 가능하도록 설정
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 19px 0px;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: var(--grey4);
  margin: 32px 24px;
`;

export const BoldDivider = styled.div`
  height: 7px;
  background-color: var(--grey5);
  margin: 32px 0px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 13px 24px 32px;
`;