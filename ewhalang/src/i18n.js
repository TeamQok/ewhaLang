import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";

// 로컬 스토리지에서 초기 언어 설정 가져오기
const storedLang = localStorage.getItem("usingLanguage") || "en"; // 기본값은 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ko: {
      translation: translationKO,
    },
  },
  lng: storedLang,
  fallbackLng: "en", // 선택한 언어가 없을 때 사용할 언어
  interpolation: {
    escapeValue: false, // React는 이미 XSS를 보호하므로 escape가 필요하지 않음
  },
});

// 언어 변경 시 로컬 스토리지에 저장
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("usingLanguage", lng);
});

export default i18n;
