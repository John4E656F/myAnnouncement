import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  nl: { translation: nl },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: Localization.locale.split('-')[0], // Use the device's locale
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
