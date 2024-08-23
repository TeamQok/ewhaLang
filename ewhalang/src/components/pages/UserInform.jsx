import Topbar from "../layout/Topbar";
import * as S from "./UserInform.style";
import profile from "../../assets/profile.svg";
import InputBox from "../common/InputBox";
import DropDown from "../common/DropDown";
import { LongButton, ButtonType } from "../common/LongButton";
import { useState, useRef, useEffect } from "react";
import Modal from "../common/Modal";
import camera from "../../assets/camera.svg";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
import BottomBar from "../layout/BottomBar";
import imageCompression from "browser-image-compression";

const proficiencyOrder = {
  "원어민 (Native)": 4,
  "상급 (Advanced)": 3,
  "중급 (Intermediate)": 2,
  "기초(Basic)": 1,
};

const UserInform = ({ isEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const navigate = useNavigate();

  // 이미지 업로드용
  const [profileImg, setProfileImg] = useState(profile); // 프로필 이미지를 저장할 상태
  const fileInputRef = useRef(null); // 파일 입력 요소에 대한 참조

  const goNext = () => {
    navigate("/login");
  };

  const onClickX = async () => {
    if (!isEdit) {
      const user = auth.currentUser;

      if (user) {
        try {
          await deleteUser(user);
          console.log("사용자가 삭제되었습니다.");
          navigate("/login");
          // 이전 페이지로 이동
        } catch (error) {
          console.error("사용자 삭제 중 오류 발생:", error);
        }
      } else {
        navigate("/login");
        console.log("로그인된 사용자가 없습니다.");
      }
    } else {
      navigate("/mypage");
    }
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

  // 언어와 숙련도를 내림차순으로 정렬하는 함수
  const sortLanguagesByProficiency = (languages) => {
    return languages.sort((a, b) => {
      return proficiencyOrder[b.proficiency] - proficiencyOrder[a.proficiency];
    });
  };

  // 회원가입 시
  // 저장하기 버튼 눌렀을 때
  const onClickSignin = async () => {
    // 해당 항목들이 입력 되어있어야 넘어갈 수 있음
    if (
      name &&
      nickname &&
      country &&
      gender &&
      major &&
      languages &&
      birthdate
    ) {
      const sortedLanguages = sortLanguagesByProficiency(languages);
      const user = auth.currentUser;
      const uid = user?.uid;
      const email = user?.email;
      const usingLanguage = sessionStorage.getItem("usingLang");

      const docRef = await setDoc(doc(firestore, "users", uid), {
        uid,
        profileImg,
        name,
        nickname,
        country,
        birthdate,
        gender,
        major,
        languages: sortedLanguages,
        hobby,
        introduction,
        email,
        usingLanguage,
        isValidated: "unverified",
        lastConnectDate: new Date().toISOString(), // 현재 시간 저장
      });

      console.log("Document written with ID: ", uid);
      setIsModalOpen(true);
    } else {
      setIsModalOpen2(true);
    }
  };

  /////////////////////////////////////////////////////
  //프로필 이미지 선택(탐색기 열기)
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 호출되는 함수
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 0.75, // 최대 파일 크기를 759kb로 설정
      maxWidthOrHeight: 1920, // 최대 높이
      useWebWorker: true,
    };

    // 이미지 압축
    const compressedFile = await imageCompression(file, options);

    if (compressedFile) {
      // 선택된 파일을 프로필 이미지로 설정
      const reader = new FileReader();
      //   파일 읽은 후 실행될 함수
      reader.onloadend = () => {
        setProfileImg(reader.result); // 이미지 URL을 상태로 설정
      };
      reader.readAsDataURL(compressedFile);
    }
  };
  /////////////////////////////////////////////////////////////

  //  수정 함수
  // 수정하기 페이지 마운트 시점에서 기존 정보 불러오기

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileImg(userData?.profileImg);
          setBirthdate(userData?.birthdate);
          setCountry(userData?.country);
          setGender(userData?.gender);
          setNickname(userData?.nickname);
          setMajor(userData?.major);
          setHobby(userData?.hobby);
          setIntroduction(userData?.introduction);
          setLanguages(userData?.languages);
          console.log("User data:", userData);
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    getUserData();
  }, []);

  //   수정사항 업데이트
  const updateUser = async (updatedData) => {
    try {
      const docRef = doc(firestore, "users", user.uid);
      await updateDoc(docRef, updatedData);
      // 'update' 메서드를 사용하여 문서 필드 업데이트
      setIsModalOpen3(true);
      navigate("/mypage");

      console.log("User document successfully updated!");
    } catch (error) {
      console.log("Error updating user document: ", error);
    }
  };

  // 저장하기 버튼 눌렀을 떄
  const onClickEdit = async () => {
    const sortedLanguages = sortLanguagesByProficiency(languages);
    const updatedData = {
      profileImg,
      nickname,
      country,
      birthdate,
      gender,
      major,
      languages: sortedLanguages, // 정렬된 언어 배열
      hobby,
      introduction,
    };
    await updateUser(updatedData);
  };

  //////////////////////////////////////////////////////////////
  // 닉네임 중복 검사 함수
  const checkNicknameDuplicate = async (nickname) => {
    try {
      // 'users' 컬렉션에 있는 닉네임과 일치하는 문서 찾기
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("nickname", "==", nickname));
      const querySnapshot = await getDocs(q);

      // 중복 검사 결과
      if (!querySnapshot.empty) {
        setIsModalOpen5(true);
      } else {
        setIsModalOpen4(true);
      }
    } catch (error) {
      console.error("Error checking nickname: ", error);
      throw error; // 오류 처리
    }
  };

  const onClickNicknameCheck = () => {
    checkNicknameDuplicate(nickname);
  };

  return (
    <>
      <Topbar
        title={isEdit ? "수정하기" : "회원가입"}
        right={"x"}
        left={"back"}
        rightonClick={onClickX}
        leftOnClick={isEdit ? undefined : onClickX}
      />

      <S.Container>
        <S.ProfileWrapper>
          <S.ProfileImg src={profileImg ? profileImg : profile} />
          <S.Camera onClick={openFileDialog}>
            <img src={camera} />
          </S.Camera>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </S.ProfileWrapper>
      </S.Container>
      <S.Wrapper>
        {isEdit ? (
          <></>
        ) : (
          <>
            <InputBox
              title={"이름"}
              placeholder={"이름을 입력해주세요."}
              onChange={inputName}
              value={name}
            />
            <div style={{ marginBottom: "16px" }} />
          </>
        )}

        <S.NicknameWrapper>
          <S.Title>닉네임</S.Title>
          <S.NicknameContainer>
            <S.Input onChange={inputNickname} value={nickname} />
            <S.Button onClick={onClickNicknameCheck}>중복 확인</S.Button>
            <div style={{ marginBottom: "16px" }} />
          </S.NicknameContainer>
        </S.NicknameWrapper>

        <S.InputTitle>국적</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder="국적을 선택해주세요."
          options={[
            "대한민국 🇰🇷",
            "미국 🇺🇸",
            "일본 🇯🇵",
            "중국 🇨🇳",
            "브라질 🇧🇷",
            "과테말라 🇬🇹",
            "자메이카 🇯🇲",
            "파라과이 🇵🇾",
            "멕시코 🇲🇽",
            "방글라데 🇧🇩",
            "브루나이 🇧🇳",
            "캄보디아 🇰🇭",
            "홍콩 🇭🇰",
            "인도 🇮🇳",
            "인도네시아 🇮🇩",
            "카자흐스탄 🇰🇿",
            "말레이시아 🇲🇾",
            "파키스탄 🇵🇰",
            "필리핀 🇵🇭",
            "사우디아라비아 🇸🇦",
            "싱가포르 🇸🇬",
            "수단 🇸🇩",
            "대만 🇹🇼",
            "태국 🇹🇭",
            "아랍에미리트 🇦🇪",
            "베트남 🇻🇳",
            "핀란드 🇫🇮",
            "오스트리아 🇦🇹",
            "벨기에 🇧🇪",
            "덴마크 🇩🇰",
            "프랑스 🇫🇷",
            "스페인 🇪🇸",
            "독일 🇩🇪",
            "영국 🇬🇧",
            "아이슬란드 🇮🇸",
            "아일랜드 🇮🇪",
            "이탈리아 🇮🇹",
            "라투아니아 🇱🇹",
            "네덜란드 🇳🇱",
            "노르웨이 🇳🇴",
            "폴란드 🇵🇱",
            "루마니아 🇷🇴",
            "러시아 🇷🇺",
            "스웨덴 🇸🇪",
            "스위스 🇨🇭",
            "캐나다 🇨🇦",
            "호주 🇦🇺",
            "뉴질랜드 🇳🇿",
          ]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            setCountry(selectedOption);
          }}
          evalue={country}
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
          evalue={gender}
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
          value={major}
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
                "벵골어",
                "말레이어",
                "크메르어",
                "인도네시아어",
                "카자흐어",
                "우르두어",
                "필리핀어(타갈로그어)",
                "아이슬란드어",
                "라트비아어",
                "루마니아어",
                "터키어",
                "그리스어",
              ]}
              onSelect={(selectedOption) => {
                console.log(`Selected: ${selectedOption}`);
                updateLanguage(index, "language", selectedOption);
              }}
              value={languageObj.language}
              evalue={languageObj.language}
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
              evalue={languageObj.proficiency}
            />
          </S.LangContainer>
        ))}

        <LongButton type={ButtonType.PALE_GREEN} onClick={addLanguage}>
          사용 가능 언어 추가하기
        </LongButton>
        <div style={{ marginBottom: "16px" }} />
        <LongButton
          type={ButtonType.PALE_GREEN}
          onClick={() => setLanguages([])}
        >
          사용 가능 언어 리셋
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

        <LongButton
          type={ButtonType.GREEN}
          onClick={isEdit ? onClickEdit : onClickSignin}
        >
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
      <Modal
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        guideText="회원정보 수정이 완료되었습니다!"
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen3(false);
        }}
        onCancel={() => {
          setIsModalOpen3(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />

      <Modal
        isOpen={isModalOpen4}
        onClose={() => setIsModalOpen4(false)}
        guideText="사용할 수 있는 닉네임입니다."
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen4(false);
        }}
        onCancel={() => {
          setIsModalOpen4(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      <Modal
        isOpen={isModalOpen5}
        onClose={() => setIsModalOpen5(false)}
        guideText="중복된 닉네임입니다."
        confirmText="확인"
        onConfirm={() => {
          setIsModalOpen5(false);
        }}
        onCancel={() => {
          setIsModalOpen5(false);
        }}
        isSingleButton={true}
        showTextInput={false}
      />
      {isEdit ? <BottomBar isOnMypage={true} /> : <></>}
    </>
  );
};

export default UserInform;
