import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
`

export const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px 0px;
`;

export const InputAreaContainer = styled.div`
  padding: 7px 24px;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white; /* 배경색 설정 */
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;