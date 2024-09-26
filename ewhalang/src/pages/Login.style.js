import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;

  padding-left: 24px;
  padding-right: 24px;
`;

export const Input = styled.input`
  width: 100%;
  height: 55px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);

  padding: 8px 24px 8px 23px;
  box-sizing: border-box;
  outline: none;

  /* Body 14R */
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  margin-bottom: 12px;

  &::placeholder {
    color: var(--grey3);
    font-size: 14px;
    font-family: var(--korean);
    font-weight: 400;
  }
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
  font-family: var(--korean);
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
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
`;

export const Eye = styled.img`
  position: absolute;
  top: 27rem;
  z-index: 1;
  right: 33px;
  cursor: pointer;
`;
