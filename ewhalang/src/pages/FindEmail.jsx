import { useNavigate } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import * as S from "./FindEmail.style";
import { useState } from "react";
import InputBox from "../components/common/InputBox";
import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import Modal from "../components/common/Modal";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useTranslation } from "react-i18next";

const FindEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [Semail, setSEmail] = useState("");

  const { i18n, t } = useTranslation();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeBirth = (e) => {
    setBirthdate(e.target.value);
  };

  const checkUserExists = async (name, birthdate, country) => {
    const usersRef = collection(firestore, "users"); // "users" 컬렉션 참조

    // 조건에 맞는 쿼리 생성
    const q = query(
      usersRef,
      where("name", "==", name),
      where("birthdate", "==", birthdate),
      where("country", "==", country)
    );

    // 쿼리 실행
    const querySnapshot = await getDocs(q);

    // 쿼리 결과가 있을 경우 UID 반환
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // 첫 번째 일치하는 문서 가져오기
      const userData = userDoc.data();
      const userEmail = userData.email; // Firestore에 저장된 uid 가져오기

      setSEmail(userEmail);
      // 이메일 반환
      return userEmail;
    } else {
      return null; // 일치하는 사용자가 없을 경우 null 반환
    }
  };

  // 사용 예제
  const onClickCheckUser = async () => {
    const email = await checkUserExists(name, birthdate, country);

    if (email) {
      console.log("해당 조건을 만족하는 사용자의 이메일: ", email);
      setIsModalOpen(true);
    } else {
      console.log("해당 조건을 만족하는 사용자를 찾을 수 없습니다.");
    }
  };

  return (
    <>
      <S.Title>{t("findEmail.content")}</S.Title>
      <S.Contents>{t("findEmail.content2")}</S.Contents>
      <InputBox
        title={t("findEmail.name")}
        placeholder={t("findEmail.namep")}
        onChange={onChangeName}
        value={name}
      />
      <div style={{ marginBottom: "16px" }} />

      <S.Title>{t("findEmail.country")}</S.Title>
      <DropDown
        isLong={true}
        placeholder={t("findEmail.countryp")}
        options={[
          "대한민국",
          "미국",
          "일본",
          "중국",
          "프랑스",
          "스페인",
          "영국",
          "독일",
          "이탈리아",
          "캐나다",
          "호주",
          "인도",
          "브라질",
          "멕시코",
          "남아프리카 공화국",
          "러시아",
          "네덜란드",
          "스웨덴",
          "스위스",
          "벨기에",
          "오스트리아",
        ]}
        onSelect={(selectedOption) => {
          console.log(`Selected: ${selectedOption}`);
          setCountry(selectedOption);
        }}
      />
      <div style={{ marginBottom: "16px" }} />

      <InputBox
        title={t("findEmail.birth")}
        placeholder={t("findEmail.birthp")}
        onChange={onChangeBirth}
        value={birthdate}
      />
      <S.Info>{t("findEmail.detail")}</S.Info>
      <S.Container>
        <LongButton ButtonType={ButtonType.GREEN} onClick={onClickCheckUser}>
          {t("findEmail.findE")}
        </LongButton>
      </S.Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guideText={Semail}
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
    </>
  );
};

export default FindEmail;
