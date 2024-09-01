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
  writeBatch,
} from "firebase/firestore";
import { firestore, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
import BottomBar from "../layout/BottomBar";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";

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

  const onSelectCountry = (selectedOption) => {
    // 선택된 옵션의 키(한국어 국가명)를 찾아 저장
    const countryKey = Object.keys(t('nationality', { returnObjects: true })).find(
      key => t(`nationality.${key}`) === selectedOption
    );
    setCountry(countryKey);
  };

  // 언어 추가하기 버튼 클릭 시
  const addLanguage = () => {
    setLanguages((prev) => [...prev, { language: "", proficiency: "" }]);
  };

  // 특정 언어 및 숙련도 업데이트
  const updateLanguage = (index, type, value) => {
    setLanguages((prev) => {
      const updatedLanguages = [...prev];
      // 선택된 옵션의 키(한국어 언어명)를 찾아 저장
      const languageKey = Object.keys(t('language', { returnObjects: true })).find(
        key => t(`language.${key}`) === value
      );
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
      const usingLanguage = localStorage.getItem("usingLanguage");

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
        verificationStatus: "unverified",
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

          // 프로필 이미지, 닉네임, 국가 중 하나라도 변경되었다면 채팅 문서도 업데이트
    if (updatedData.profileImg || updatedData.nickname || updatedData.country) {
      await updateChatsWithNewUserInfo(user.uid, updatedData);
    }
      // 'update' 메서드를 사용하여 문서 필드 업데이트
      setIsModalOpen3(true);
      navigate("/mypage");

      console.log("User document successfully updated!");
    } catch (error) {
      console.log("Error updating user document: ", error);
    }
  };

  //채팅 문서 속 유저 정보 업데이트
  const updateChatsWithNewUserInfo = async (userId, updatedData) => {
    try {
      const chatsRef = collection(firestore, "chats");
      const q = query(chatsRef, where(`participantsId`, "array-contains", userId));
      const querySnapshot = await getDocs(q);

      const batch = writeBatch(firestore);

      querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participantsInfo && chatData.participantsInfo[userId]){
          const updatedParticipantInfo = {
            ...chatData.participantsInfo[userId],
            ...(updatedData.profileImg && { profileImg: updatedData.profileImg }),
            ...(updatedData.nickname && { nickname: updatedData.nickname }),
            ...(updatedData.country && { country: updatedData.country })
          };

          const updatedParticipantsInfo = {
            ...chatData.participantsInfo,
            [userId]: updatedParticipantInfo
          };

          batch.update(doc.ref, { participantsInfo: updatedParticipantsInfo });
        }
      });

      await batch.commit();
      console.log("Chat documents successfully updated with new user info!");
    } catch(error) {
      console.error("Error updating chat documents: ", error);
    }
  }

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
        title={isEdit ? "수정하기" : t("signup2.title")}
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
          options={Object.keys(t('nationality', { returnObjects: true })).map(key => t(`nationality.${key}`))}
          onSelect={onSelectCountry}
          evalue={isEdit ? t(`nationality.${country}`) : null}
        />
        <div style={{ marginBottom: "16px" }} />

        <S.InputTitle>{t("signup2.성별")}</S.InputTitle>
        <DropDown
          isLong={true}
          placeholder={t("signup2.성별을 선택해주세요.")}
          options={Object.keys(t('gender', { returnObjects: true })).map(key => t(`gender.${key}`))}
          onSelect={(selectedOption) => {
            console.log(`Selected: ${selectedOption}`);
            const genderKey = Object.keys(t('gender', { returnObjects: true })).find(
              key => t(`gender.${key}`) === selectedOption
            );
            setGender(genderKey);
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
              options={Object.keys(t('language', { returnObjects: true })).map(key => t(`language.${key}`))}
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
