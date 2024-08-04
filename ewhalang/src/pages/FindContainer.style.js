import styled from "styled-components";

export const Wrapper = styled.div`
  margin-right: 23px;
  margin-left: 23px;
`;

export const Menu1 = styled.div`
  border-bottom: ${(props) =>
    props.email ? "2px solid var(--sub1)" : "2px solid var(--grey3)"};

  width: 50%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 12px;
  color: ${(props) => (props.email ? "var(--sub1)" : "var(--grey3)")};

  /* Subsubtitle_16_SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const Menu2 = styled.div`
  border-bottom: ${(props) =>
    props.pw ? "2px solid var(--sub1)" : "2px solid var(--grey3)"};

  width: 50%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 12px;
  color: ${(props) => (props.pw ? "var(--sub1)" : "var(--grey3)")};

  /* Subsubtitle_16_SB */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

export const MenuContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
