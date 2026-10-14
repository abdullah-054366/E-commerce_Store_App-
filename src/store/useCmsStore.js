import { create } from 'zustand';
import { getStoredData, saveStoredData } from '../api/client';

export const useCmsStore = create((set, get) => ({
  siteConfig: null,
  heroBanners: [],
  promoBanners: [],

  fetchCmsData: () => {
    const db = getStoredData();
    set({
      siteConfig: db.siteConfig || {},
      heroBanners: db.heroBanners || [],
      promoBanners: db.promoBanners || [],
    });
  },

  updateSiteConfig: (newConfig) => {
    const db = getStoredData();
    db.siteConfig = { ...db.siteConfig, ...newConfig };
    saveStoredData(db);
    set({ siteConfig: db.siteConfig });

    // Apply primary & secondary colors to CSS variables dynamically
    if (newConfig.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', newConfig.primaryColor);
    }
    if (newConfig.secondaryColor) {
      document.documentElement.style.setProperty('--color-secondary', newConfig.secondaryColor);
    }
  },

  updateHeroBanners: (banners) => {
    const db = getStoredData();
    db.heroBanners = banners;
    saveStoredData(db);
    set({ heroBanners: banners });
  },

  updatePromoBanners: (banners) => {
    const db = getStoredData();
    db.promoBanners = banners;
    saveStoredData(db);
    set({ promoBanners: banners });
  }
}));
