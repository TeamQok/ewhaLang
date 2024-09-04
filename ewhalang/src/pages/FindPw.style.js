import styled from "styled-components";

export const Title = styled.div`
  color: var(--black);
  width: 100%;

  /* Subsubtitle_16_SB */
  font-family: var(--korean);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin-bottom: 4px;
`;

export const Contents = styled.div`
  color: var(--Grey-1, #7f7f7f);

  /* Button 14R */
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  margin-bottom: 24px;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: var(--White, #fff);
  height: 40px;
  padding: 8px 13px;
  box-sizing: border-box;
  outline: none;
  &::placeholder {
    color: var(--grey3);
    font-size: 14px;
    font-family: var(--korean);
  }
  margin-right: 10px;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  width: 30%px;
  height: 40px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--Sub-1, #33936d);
  color: var(--White, #fff);

  /* Button 14SB */
  font-family: var(--korean);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 171.429% */
  border: none;
  margin-bottom: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BtnContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  margin-bottom: 32px;
  width: calc(100% - 46px);
`;
