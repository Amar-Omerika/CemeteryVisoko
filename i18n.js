import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEn from './src/languages/en/language.json';
import translationBos from './src/languages/bos/language.json';

const resources = {
  en: {
    translation: translationEn,
  },
  bos: {
    translation: translationBos,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'bos',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
