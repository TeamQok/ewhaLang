import * as S from "./FindContainer.style";
import { useState, useEffect } from "react";
import FindPw from "./FindPw";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import FindEmail from "./FindEmail";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FindContainer = () => {
  const [email, setEmail] = useState(true);
  const [pw, setPw] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const goLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (location.state?.view === "pw") {
      setEmail(false);
      setPw(true);
    }
  }, [location.state]);

  const goFindPw = () => {
    setEmail(false);
    setPw(true);
  };

  const goFindEmail = () => {
    setEmail(true);
    setPw(false);
  };

  return (
    <>
      <Topbar
        title={t("findEmail.title")}
        left={"back"}
        right={"x"}
        rightonClick={goLogin}
      />
      <S.Wrapper>
        <S.MenuContainer>
          <S.Menu1 email={email} onClick={goFindEmail}>
            {t("findEmail.findE")}
          </S.Menu1>
          <S.Menu2 onClick={goFindPw} pw={pw}>
            {t("findEmail.findP")}
          </S.Menu2>
        </S.MenuContainer>
        {email ? <FindEmail /> : <FindPw />}
      </S.Wrapper>
    </>
  );
};

export default FindContainer;
