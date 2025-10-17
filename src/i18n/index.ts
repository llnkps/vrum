// import RNLanguageDetector from './languageDetector';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultLanguage, languagesResources } from './languageConfig';

const initI18n = async () => {
  // let savedLanguage = await AsyncStorage.getItem("language");
  // console.log('Saved language:', savedLanguage);
  // if (!savedLanguage) {
  //   // Fallback to device locale if no language is saved
  //   savedLanguage = Localization.getLocales().split('-')[0]; // Use the language code (e.g., 'en' from 'en-US')
  // }

  i18n
    // .use(RNLanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      debug: process.env.NODE_ENV === 'development',
      resources: languagesResources,
      // compatibilityJSON: 'v3',
      // language to use if translations in user language are not available.
      lng: 'en',
      fallbackLng: defaultLanguage,

      // ns: ['common'],
      // defaultNS: 'common',

      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },

      // react: {
      //   useSuspense: true,
      //   defaultTransParent: Text,
      //   transSupportBasicHtmlNodes: false,
      // },
    });
};

initI18n();

export default i18n;
