import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ko: {
      translation: translationKO,
    },
  },
  lng: "en", // 기본 언어
  fallbackLng: "en", // 선택한 언어가 없을 때 사용할 언어
  interpolation: {
    escapeValue: false, // React는 이미 XSS를 보호하므로 escape가 필요하지 않음
  },
});

export default i18n;
