import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  color: var(--Black, #000);
  margin-top: 88px;

  /* Big Title_24_SB */
  font-family: var(--korean);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 28.8px */
`;

export const Name = styled.div`
  color: #323232;
  margin-top: 24px;
  margin-bottom: 85px;

  /* Subtitle_18_B */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
`;

export const Setting = styled.div`
  display: flex;
  padding-left: 32px;
  padding-right: 32px;
  justify-content: space-between;
  color: #000;
  box-sizing: border-box;

  /* Subsubtitle_16_SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  width: 100%;
  margin-bottom: 16px;
`;

export const SettingLang = styled.div`
  display: flex;
  align-items: center;
`;
