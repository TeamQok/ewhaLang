import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: calc(100% - 48px);
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
  padding: 0px 24px;
  height: calc(100% - 54px);
`;

export const InputAreaContainer = styled.div`
  padding: 7px 24px;
  background-color: white; /* 배경색 설정 */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  height: 54px;
`;