import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";

// Firebase Firestore와 Auth 가져오기
const firestore = getFirestore();
const auth = getAuth();

// Firestore에서 사용자의 언어 설정을 가져오는 함수
const fetchUserLanguage = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userID = user.uid;
      const userRef = doc(firestore, "users", userID);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.usingLanguage || "en"; // 'usingLanguage' 필드가 없으면 기본값으로 'en'
      }
    }
    return null; // 사용자가 없으면 null 반환
  } catch (error) {
    console.error("Failed to fetch user language: ", error);
    return null;
  }
};

// i18n 초기화 함수
const initI18n = async () => {
  const storedLang = localStorage.getItem("usingLanguage") || "en"; // 기본값 'en'

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEN,
      },
      ko: {
        translation: translationKO,
      },
    },
    lng: storedLang, // 초기 언어를 설정
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    // i18n 초기화 완료 후 실행
    initImmediate: false,
  });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userLang = await fetchUserLanguage();
      const finalLang = userLang || storedLang; // 로그인한 사용자 언어가 있으면 사용, 아니면 로컬스토리지 값 사용
      i18n.changeLanguage(finalLang); // 언어 변경 호출
    }
  });

  // 언어 변경 시 로컬 스토리지에 저장
  i18n.on("languageChanged", (lng) => {
    localStorage.setItem("usingLanguage", lng);
  });
};

// i18n 초기화 실행
initI18n();

export default i18n;
