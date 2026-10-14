import { create } from 'zustand';
import { translations } from '../i18n/translations';

export const useLanguageStore = create((set, get) => ({
  lang: 'ar', // 'ar' or 'en'
  dir: 'rtl', // 'rtl' or 'en' => 'ltr'

  setLanguage: (lang) => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    set({ lang, dir });
  },

  t: (key) => {
    const { lang } = get();
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  }
}));
