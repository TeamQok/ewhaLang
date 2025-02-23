import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;

  padding-left: 24px;
  padding-right: 24px;
`;

export const Input = styled.input`
  width: 345px;
  height: 55px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);

  padding: 8px 24px;
  box-sizing: border-box;
  outline: none;

  /* Body 14R */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  margin-bottom: 12px;
`;

export const Container = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

export const Option = styled.div`
  margin-right: 10px;
  margin-left: 5px;
  color: ${({ color }) => color || "var(--Grey-1, #7f7f7f)"};

  /* Body 14R */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */

  cursor: pointer;
`;

export const Bar = styled.div`
  margin-right: 10px;
  margin-left: 5px;
  color: var(--Grey-1, #7f7f7f);

  /* Body 14R */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
`;
