import styled from "styled-components";

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

export const Info = styled.div`
  color: var(--Grey-2, #a8a8a8);
  font-family: var(--korean);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 16.5px */
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  margin-bottom: 32px;
  width: calc(100% - 46px);
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
`;
