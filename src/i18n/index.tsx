import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ptBR } from './locales/ListaFrutas/pt-BR';
import { enUS } from './locales/ListaFrutas/en-us';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUS },
      pt: { translation: ptBR }
    },
    lng: 'pt',
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
