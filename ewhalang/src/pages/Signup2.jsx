import UserInform from "../components/pages/UserInform";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "i18next";

const Signup2 = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("usingLanguage")
  );
  const { i18n } = useTranslation();

  console.log("현재 설정된 언어 부모컴포넌트:", i18n.language);

  return (
    <Wrapper>
      <UserInform isEdit={false} language={i18n.language} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 48px;
`;

export default Signup2;
