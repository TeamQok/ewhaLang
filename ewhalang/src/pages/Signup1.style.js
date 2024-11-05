import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 63px 23px 0px;
`;

export const Info = styled.div`
  color: ${(props) => (props.err ? "red" : "var(--grey2)")};
  font-family: var(--korean);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 16.5px */
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Info1 = styled.div`
  color: ${(props) => (props.err ? "red" : "var(--grey2)")};
  font-family: var(--korean);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 16.5px */
  margin-top: 8px;
`;
export const Info2 = styled.div`
  color: ${(props) => (props.err ? "red" : "var(--grey2)")};
  font-family: var(--korean);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 16.5px */
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

export const Eye = styled.img`
  position: absolute;
  top: 214px; // 원하는 위치로 조정
  z-index: 1;
  right: 33px;
  cursor: pointer;
`;
