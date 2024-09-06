import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 210px);
  overflow: hidden;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export const TopbarWrapper = styled.div`
  height: 48px;
`

export const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 5px 24px 0px;
`;

export const InputAreaContainer = styled.div`
  padding: 7px 24px;
  background-color: white; /* 배경색 설정 */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;