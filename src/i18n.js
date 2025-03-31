

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';  // English translations
import de from './locales/de.json';  // German translations

// Initialize i18next
i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de }
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the selected one is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
