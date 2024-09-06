import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 65px;
  padding-bottom: 90px;
  position: relative; /* 자식 컴포넌트의 기준점 */
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
  margin-bottom: 16px;
`;

export const Title = styled.div`
  color: var(--black);

  /* Subsubtitle_16_SB */
  font-family: var(--korean);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin-bottom: 4px;
`;

export const DInput = styled.input`
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: var(--Grey5, #f2f1f1);
  width: 100%;
  height: 40px;
  outline: none;
  color: var(--Grey-1, #7f7f7f);

  /* Body 14R */
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */

  padding: 8px 13px;
`;

export const Box = styled.div`
  border-radius: 12px;
  background: var(--White, #fff);
  /* background-color: green; */
  color: var(--Black, #000);
  text-align: center;
  width: 116px;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey4);

  /* Button 14SB */
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
  z-index: 1;
  position: fixed;
  top: 45px;
  right: 0;
  margin-right: 10px;
`;

export const Eye = styled.img`
  position: absolute;
  top: 317px; // 원하는 위치로 조정
  z-index: 1;
  right: 33px;
  cursor: pointer;
`;

export const Eye1 = styled.img`
  position: absolute;
  top: 405px; // 원하는 위치로 조정
  z-index: 1;
  right: 33px;
  cursor: pointer;
`;
