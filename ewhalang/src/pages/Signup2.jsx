import Topbar from "../components/layout/Topbar";
import * as S from "./Signup2.style";
import profile from "../assets/profile.svg";
import InputBox from "../components/common/InputBox";
import DropDown from "../components/common/DropDown";
import { LongButton, ButtonType } from "../components/common/LongButton";
import { useState } from "react";
import Modal from "../components/common/Modal";
import camera from "../assets/camera.svg";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const navigate = useNavigate();

  const goNext = () => {
    navigate("/login");
  };

  // 입력 state
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [major, setMajor] = useState("");
  const [languages, setLanguages] = useState([]);
  const [hobby, setHobby] = useState("");
  const [introduction, setIntroduction] = useState("");

  const inputName = (e) => {
    setName(e.target.value);
  };
  const inputNickname = (e) => {
    setNickname(e.target.value);
  };

  const inputBirthdate = (e) => {
    setBirthdate(e.target.value);
  };

  const inputMajor = (e) => {
    setMajor(e.target.value);
  };
  const inputHobby = (e) => {
    setHobby(e.target.value);
  };

  const inputIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  // 언어 추가하기 버튼 클릭 시
  const addLanguage = () => {
    setLanguages((prev) => [...prev, { language: "", proficiency: "" }]);
  };

  // 특정 언어 및 숙련도 업데이트
  const updateLanguage = (index, type, value) => {
    setLanguages((prev) => {
      const updatedLanguages = [...prev];
      updatedLanguages[index][type] = value;
      return updatedLanguages;
    });
  };

  // 저장하기 버튼 눌렀을 때
  const onClickSignin = async () => {
    if (
      name &&
      nickname &&
      country &&
      gender &&
      major &&
      languages &&
      birthdate
    ) {
      const user = auth.currentUser;
      const uid = user?.uid;
      const email = user?.email;
      const usingLanguage = sessionStorage.getItem("usingLang");

      const docRef = await setDoc(doc(firestore, "users", uid), {
        uid,
        name,
        nickname,
        country,
        birthdate,
        gender,
        major,
        languages,
        hobby,
        introduction,
        email,
        usingLanguage,
        lastConnectDate: new Date().toISOString(), // 현재 시간 저장
      });

      console.log("Document written with ID: ", uid);
      setIsModalOpen(true);
    } else {
      setIsModalOpen2(true);
    }
  };

  return (
    <>
      <Topbar title={"회원가입"} right={"x"} left={"back"} />

      <S.Container>
        <S.ProfileWrapper>
          <img
            src={profile}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "100px",
            }}
          />
          <S.Camera>
            <img src={camera} />
          </S.Camera>
        </S.ProfileWrapper>
      </S.Container>
      <S.Wrapper>
        <InputBox
          title={"이름"}
          placeholder={"이름을 입력해주세요."}
          onChange={inputName}
          value={name}
        />
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={"닉네임"}
          placeholder={"닉네임을 입력해주세요."}
          onChange={inputNickname}
          value={nickname}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>국적</S.InputTitle>
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

        <S.InputTitle>성별</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder="성별을 선택해주세요."
          options={["여성", "남성", "알리고 싶지 않음"]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            setGender(selectedOption);
          }}
        />
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={"생년월일"}
          placeholder={"생년월일을 입력해주세요."}
          onChange={inputBirthdate}
          value={birthdate}
        />
        <S.Info>* YYYYMMDD로 입력해주세요. (예시 : 20010101)</S.Info>

        <InputBox
          title={"전공"}
          placeholder={"전공을 입력해주세요."}
          onChange={inputMajor}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>사용 가능 언어</S.InputTitle>
        {languages.map((languageObj, index) => (
          <S.LangContainer key={index}>
            <DropDown
              isLong={false}
              placeholder="언어 선택"
              options={[
                "한국어",
                "영어",
                "일본어",
                "중국어",
                "프랑스어",
                "스페인어",
                "독일어",
                "이탈리아어",
                "러시아어",
                "포르투갈어",
                "아랍어",
                "힌디어",
                "베트남어",
                "태국어",
                "터키어",
                "폴란드어",
                "네덜란드어",
                "스웨덴어",
                "그리스어",
                "체코어",
                "헝가리어",
                "핀란드어",
                "덴마크어",
                "노르웨이어",
                "히브리어",
              ]}
              onSelect={(selectedOption) => {
                console.log(`Selected: ${selectedOption}`);
                updateLanguage(index, "language", selectedOption);
              }}
              value={languageObj.language}
            />
            <DropDown
              isLong={false}
              placeholder="언어 숙련도 선택"
              options={[
                "기초(Basic)",
                "중급 (Intermediate)",
                "상급 (Advanced)",
                "원어민 (Native)",
              ]}
              onSelect={(selectedOption) => {
                console.log(`Selected: ${selectedOption}`);
                updateLanguage(index, "proficiency", selectedOption);
              }}
              value={languageObj.proficiency}
            />
          </S.LangContainer>
        ))}

        <LongButton type={ButtonType.LONG_GREY_BLACK} onClick={addLanguage}>
          사용 가능 언어 추가하기
        </LongButton>
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={"취미 및 관심사"}
          onChange={inputHobby}
          value={hobby}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>자기소개</S.InputTitle>
        <S.Introduce onChange={inputIntroduction} value={introduction} />
        <div style={{ marginBottom: "25px" }} />

        <LongButton type={ButtonType.GREEN} onClick={onClickSignin}>
          저장하기
        </LongButton>
        <div style={{ marginBottom: "44px" }} />
      </S.Wrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          goNext();
        }}
        guideText="회원가입이 완료되었습니다!"
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen(false);
          goNext();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      <Modal
        isOpen={isModalOpen2}
        onClose={() => {
          setIsModalOpen2(false);
        }}
        guideText="입력 항목을 모두 채워주세요!"
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen2(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
    </>
  );
};

export default Signup2;
