import UserInform from "../components/pages/UserInform";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "i18next";
import {app, firestore} from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, pw } = location.state;

  const handleSave = async (userData) => {
    try{
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      const userId = userCredential.user.uid;

      await setDoc(doc(firestore, "users", userId), {
        ...userData,
        email,
      });

      console.log("success");
    } catch(error){
      console.error("회원가입 실패: ", error.message);
    }
  }
  
  return (
    <Wrapper>
      <UserInform isEdit={false} onSave={handleSave}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 48px;
`;

export default Signup2;
