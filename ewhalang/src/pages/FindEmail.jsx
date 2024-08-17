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

const FindEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [Semail, setSEmail] = useState("");

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
      <S.Title>회원 정보로 찾기</S.Title>
      <S.Contents>회원 정보에 등록된 정보를 입력해주세요.</S.Contents>
      <InputBox
        title={"이름"}
        placeholder={"이름을 입력해주세요."}
        onChange={onChangeName}
        value={name}
      />
      <div style={{ marginBottom: "16px" }} />

      <S.Title>국적</S.Title>
      <DropDown
        isLong={true}
        placeholder="국적을 선택해주세요."
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
        title={"생년월일"}
        placeholder={"생년월일을 입력해주세요."}
        onChange={onChangeBirth}
        value={birthdate}
      />
      <S.Info>* YYYYMMDD로 입력해주세요. (예시 : 20010101)</S.Info>
      <S.Container>
        <LongButton ButtonType={ButtonType.GREEN} onClick={onClickCheckUser}>
          이메일 찾기
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
