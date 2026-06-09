import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

const savedLanguage =
  localStorage.getItem("language");

const browserLanguage =
  navigator.language.startsWith("es")
    ? "es"
    : "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },

    lng:
      savedLanguage ??
      browserLanguage,

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;