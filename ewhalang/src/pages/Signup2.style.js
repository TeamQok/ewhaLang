import styled from "styled-components";

export const Wrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 30%;
  justify-content: center;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export const Camera = styled.div`
  position: absolute;
  top: 88px; // 원하는 위치로 조정
  z-index: 1;
  transform: translate(100%, 0%);
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

export const InputTitle = styled.div`
  color: #000;

  /* Subsubtitle_16_SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  margin-bottom: 8px;
`;

export const LangContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const Introduce = styled.textarea`
  border-radius: 10px;
  border: 1px solid var(--Grey-3, #b8b8b8);
  background: #fff;
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  padding: 8px 12px 8px 12px;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
