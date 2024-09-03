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
import { firestore, auth, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
import BottomBar from "../layout/BottomBar";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  // 카메라 옵션용
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null); // 옵션 영역을 참조하기 위한 ref 생성

  // 이미지 업로드용
  const [profileImg, setProfileImg] = useState(profile); // 프로필 이미지를 저장할 상태
  const fileInputRef = useRef(null); // 파일 입력 요소에 대한 참조

  const { i18n, t } = useTranslation();

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

  // 언어 중복선택 안 되도록 언어 목록에서 제외
  const selectedLanguages = languages.map((langObj) => langObj.language);

  const filteredOptions = [
    t("language.한국어"),
    t("language.영어"),
    t("language.일본어"),
    t("language.중국어"),
    t("language.프랑스어"),
    t("language.스페인어"),
    t("language.독일어"),
    t("language.이탈리아어"),
    t("language.러시아어"),
    t("language.포르투갈어"),
    t("language.아랍어"),
    t("language.힌디어"),
    t("language.베트남어"),
    t("language.태국어"),
    t("language.터키어"),
    t("language.폴란드어"),
    t("language.네덜란드어"),
    t("language.스웨덴어"),
    t("language.그리스어"),
    t("language.체코어"),
    t("language.헝가리어"),
    t("language.핀란드어"),
    t("language.덴마크어"),
    t("language.노르웨이어"),
    t("language.히브리어"),
    t("language.벵골어"),
    t("language.말레이어"),
    t("language.크메르어"),
    t("language.인도네시아어"),
    t("language.카자흐어"),
    t("language.우르두어"),
    t("language.필리핀어(타갈로그어)"),
    t("language.아이슬란드어"),
    t("language.라트비아어"),
    t("language.루마니아어"),
  ].filter((option) => !selectedLanguages.includes(option));

  // 회원가입 시
  // 저장하기 버튼 눌렀을 때
  const onClickSignin = async () => {
    // 해당 항목들이 입력 되어있어야 넘어갈 수 있음
    // 모든 languages 배열의 각 항목이 유효한지 확인
    const isLanguagesValid = languages.every(
      (languageObj) => languageObj.language && languageObj.proficiency
    );

    if (
      name &&
      nickname &&
      country &&
      gender &&
      major &&
      isLanguagesValid &&
      birthdate
    ) {
      const sortedLanguages = sortLanguagesByProficiency(languages);
      const user = auth.currentUser;
      const uid = user?.uid;
      const email = user?.email;
      const usingLanguage = localStorage.getItem("usingLanguage");
      // 1. 프로필 이미지를 업로드하고 URL 받아오기

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

  // 사진 선택 옵션
  const openOption = () => {
    setShowOptions(!showOptions);
  };

  // 옵션 영역 외부 클릭을 감지하기 위한 useEffect
  useEffect(() => {
    function handleClickOutside(event) {
      // 클릭된 요소가 옵션 영역이 아닐 때 옵션을 닫음
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    // 마우스 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  //기본 이미지 선택
  const defaultImg = () => {
    setProfileImg(null);
    setShowOptions(false);
  };

  //프로필 이미지 선택(탐색기 열기)
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 호출되는 함수
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 0.35, // 최대 파일 크기를 759kb로 설정
      maxWidthOrHeight: 1920, // 최대 높이
      useWebWorker: true,
    };
    setShowOptions(false);

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
    } else return;
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

        if (docSnap.exists() && isEdit === true) {
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
      console.log(error);
    }
  };

  // 저장하기 버튼 눌렀을 떄
  const onClickEdit = async () => {
    // 모든 languages 배열의 각 항목이 유효한지 확인
    const isLanguagesValid = languages.every(
      (languageObj) => languageObj.language && languageObj.proficiency
    );

    // 각 필드에 대한 유효성 검사
    if (
      !profileImg || // 프로필 이미지가 있는지 확인
      !nickname || // 닉네임이 있는지 확인
      !country || // 국가가 있는지 확인
      !birthdate || // 생년월일이 있는지 확인
      !gender || // 성별이 있는지 확인
      !major || // 전공이 있는지 확인
      !isLanguagesValid // 언어 배열이 유효한지 확인
    ) {
      setIsModalOpen2(true);
      return; // 저장 작업 중단
    }
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
  const checkNicknameDuplicate = async (nicknamearg) => {
    try {
      // 'users' 컬렉션에 있는 닉네임과 일치하는 문서 찾기
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("nickname", "==", nicknamearg));
      const querySnapshot = await getDocs(q);

      // 중복 검사 결과
      if (!querySnapshot.empty && nickname) {
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
        title={isEdit ? t("signup2.수정하기") : t("signup2.title")}
        right={"x"}
        left={"back"}
        rightonClick={onClickX}
        leftOnClick={isEdit ? undefined : onClickX}
      />

      <S.Container>
        <S.ProfileWrapper>
          <S.ProfileImg src={profileImg ? profileImg : profile} />
          <S.Camera onClick={openOption}>
            <img src={camera} />
          </S.Camera>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {showOptions ? (
            <>
              <S.ImgOptionWrp ref={optionsRef}>
                <S.ImgOption onClick={defaultImg}>기본 이미지</S.ImgOption>
                <S.ImgOption2 onClick={openFileDialog}>
                  사진 불러오기
                </S.ImgOption2>
              </S.ImgOptionWrp>
            </>
          ) : (
            <></>
          )}
        </S.ProfileWrapper>
      </S.Container>
      <S.Wrapper>
        {isEdit ? (
          <></>
        ) : (
          <>
            <InputBox
              title={t("signup2.이름")}
              placeholder={t("signup2.이름을입력해주세요")}
              onChange={inputName}
              value={name}
            />
            <div style={{ marginBottom: "16px" }} />
          </>
        )}

        <S.NicknameWrapper>
          <S.Title>{t("signup2.닉네임")}</S.Title>
          <S.NicknameContainer>
            <S.Input onChange={inputNickname} value={nickname} />
            <S.Button onClick={onClickNicknameCheck}>
              {t("signup2.중복 확인")}
            </S.Button>
            <div style={{ marginBottom: "16px" }} />
          </S.NicknameContainer>
        </S.NicknameWrapper>

        <S.InputTitle>{t("signup2.국적")}</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder={t("signup2.국적을 선택해주세요")}
          options={[
            t("nationality.대한민국 🇰🇷"),
            t("nationality.미국 🇺🇸"),
            t("nationality.일본 🇯🇵"),
            t("nationality.중국 🇨🇳"),
            t("nationality.브라질 🇧🇷"),
            t("nationality.과테말라 🇬🇹"),
            t("nationality.자메이카 🇯🇲"),
            t("nationality.파라과이 🇵🇾"),
            t("nationality.멕시코 🇲🇽"),
            t("nationality.방글라데시 🇧🇩"),
            t("nationality.브루나이 🇧🇳"),
            t("nationality.캄보디아 🇰🇭"),
            t("nationality.홍콩 🇭🇰"),
            t("nationality.인도 🇮🇳"),
            t("nationality.인도네시아 🇮🇩"),
            t("nationality.카자흐스탄 🇰🇿"),
            t("nationality.말레이시아 🇲🇾"),
            t("nationality.파키스탄 🇵🇰"),
            t("nationality.필리핀 🇵🇭"),
            t("nationality.사우디아라비아 🇸🇦"),
            t("nationality.싱가포르 🇸🇬"),
            t("nationality.수단 🇸🇩"),
            t("nationality.대만 🇹🇼"),
            t("nationality.태국 🇹🇭"),
            t("nationality.아랍에미리트 🇦🇪"),
            t("nationality.베트남 🇻🇳"),
            t("nationality.핀란드 🇫🇮"),
            t("nationality.오스트리아 🇦🇹"),
            t("nationality.벨기에 🇧🇪"),
            t("nationality.덴마크 🇩🇰"),
            t("nationality.프랑스 🇫🇷"),
            t("nationality.스페인 🇪🇸"),
            t("nationality.독일 🇩🇪"),
            t("nationality.영국 🇬🇧"),
            t("nationality.아이슬란드 🇮🇸"),
            t("nationality.아일랜드 🇮🇪"),
            t("nationality.이탈리아 🇮🇹"),
            t("nationality.라투아니아 🇱🇹"),
            t("nationality.네덜란드 🇳🇱"),
            t("nationality.노르웨이 🇳🇴"),
            t("nationality.폴란드 🇵🇱"),
            t("nationality.루마니아 🇷🇴"),
            t("nationality.러시아 🇷🇺"),
            t("nationality.스웨덴 🇸🇪"),
            t("nationality.스위스 🇨🇭"),
            t("nationality.캐나다 🇨🇦"),
            t("nationality.호주 🇦🇺"),
            t("nationality.뉴질랜드 🇳🇿"),
          ]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            setCountry(selectedOption);
          }}
          evalue={isEdit ? country : null}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>{t("signup2.성별")}</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder={t("signup2.성별을 선택해주세요.")}
          options={[
            t("signup2.여성"),
            t("signup2.남성"),
            t("signup2.알리고 싶지 않음"),
          ]}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            setGender(selectedOption);
          }}
          evalue={isEdit ? gender : null}
        />
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={t("signup2.생년월일")}
          placeholder={t("signup2.생년월일을 입력해주세요.")}
          onChange={inputBirthdate}
          value={isEdit ? birthdate : null}
        />
        <S.Info>{t("signup2.* YYYYMMDD로 입력해주세요.")}</S.Info>

        <InputBox
          title={t("signup2.전공")}
          placeholder={t("signup2.전공을 입력해주세요.")}
          onChange={inputMajor}
          value={isEdit ? major : null}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>{t("signup2.사용 가능 언어")}</S.InputTitle>
        {languages.map((languageObj, index) => (
          <S.LangContainer key={index}>
            <DropDown
              isLong={false}
              placeholder={t("level.언어 선택")}
              options={filteredOptions}
              onSelect={(selectedOption) => {
                console.log(`Selected: ${selectedOption}`);
                updateLanguage(index, "language", selectedOption);
              }}
              value={languageObj.language}
              evalue={languageObj.language}
            />
            <DropDown
              isLong={false}
              placeholder={t("level.언어 숙련도 선택")}
              options={[
                t("level.기초(Basic)"),
                t("level.중급 (Intermediate)"),
                t("level.상급 (Advanced)"),
                t("level.원어민 (Native)"),
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
          {t("signup2.사용 가능 언어 추가하기")}
        </LongButton>
        <div style={{ marginBottom: "16px" }} />
        <LongButton
          type={ButtonType.PALE_GREEN}
          onClick={() => setLanguages([])}
        >
          {t("signup2.사용 가능 언어 리셋")}
        </LongButton>
        <div style={{ marginBottom: "16px" }} />

        <InputBox
          title={t("signup2.취미 및 관심사")}
          onChange={inputHobby}
          value={hobby}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>{t("signup2.자기소개")}</S.InputTitle>
        <S.Introduce onChange={inputIntroduction} value={introduction} />
        <div style={{ marginBottom: "25px" }} />

        <LongButton
          type={ButtonType.GREEN}
          onClick={isEdit ? onClickEdit : onClickSignin}
        >
          {t("signup2.저장하기")}
        </LongButton>
        <div style={{ marginBottom: "44px" }} />
      </S.Wrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          goNext();
        }}
        guideText={t("signup2.회원가입이 완료되었습니다!")}
        confirmText={t("signup2.확인")}
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
        guideText={t("signup2.입력 항목을 모두 채워주세요!")}
        confirmText={t("signup2.확인")}
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
        guideText={t("signup2.회원정보 수정이 완료되었습니다!")}
        confirmText={t("signup2.확인")}
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
        guideText={t("signup2.사용할 수 있는 닉네임입니다.")}
        confirmText={t("signup2.확인")}
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
        guideText={t("signup2.중복된 닉네임입니다.")}
        confirmText={t("signup2.확인")}
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
