import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
`;

export const Info = styled.div`
  color: ${(props) => (props.err ? "red" : "var(--grey2)")};
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 16.5px */
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 32px;
  width: 100%;
  padding-left: 23px;
  padding-right: 23px;
`;
