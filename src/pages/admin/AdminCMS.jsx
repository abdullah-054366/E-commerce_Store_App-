import React, { useState, useEffect } from 'react';
import { Palette, Image, Type, Save, Check, Plus, Trash2 } from 'lucide-react';
import { useCmsStore } from '../../store/useCmsStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../../components/ui/Button';

export function AdminCMS() {
  const { siteConfig, heroBanners, updateSiteConfig, updateHeroBanners, fetchCmsData } = useCmsStore();
  const { t } = useLanguageStore();

  useEffect(() => {
    fetchCmsData();
  }, [fetchCmsData]);

  const [announcementText, setAnnouncementText] = useState('');
  const [logoText, setLogoText] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#181818');
  const [secondaryColor, setSecondaryColor] = useState('#A9906F');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [bannersList, setBannersList] = useState([]);

  useEffect(() => {
    if (siteConfig) {
      setAnnouncementText(siteConfig.announcementBar || '');
      setLogoText(siteConfig.logoText || 'LUNORA');
      setPrimaryColor(siteConfig.primaryColor || '#181818');
      setSecondaryColor(siteConfig.secondaryColor || '#A9906F');
    }
    if (heroBanners) {
      setBannersList(heroBanners);
    }
  }, [siteConfig, heroBanners]);

  const handleSaveCMS = (e) => {
    e.preventDefault();
    updateSiteConfig({
      announcementBar: announcementText,
      logoText: logoText,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
    });
    updateHeroBanners(bannersList);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleBannerChange = (index, field, value) => {
    const updated = [...bannersList];
    updated[index] = { ...updated[index], [field]: value };
    setBannersList(updated);
  };

  return (
    <form onSubmit={handleSaveCMS} className="space-y-8 font-sans">
      
      {/* Top Title & Save Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_cms')}</h2>
          <p className="text-xs text-gray-500">تعديل بنرات الواجهة، ألوان المظهر، والشريط الإعلاني العلوي للمتجر</p>
        </div>

        <Button type="submit" variant="secondary" size="md" className="flex items-center gap-2">
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'تم حفظ التعديلات!' : t('save_changes')}</span>
        </Button>
      </div>

      {/* Brand & Design Tokens Config Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Palette className="w-5 h-5 text-[var(--color-secondary)]" />
          <h3 className="text-lg font-serif font-bold">هوية العلامة التجارية والألوان</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold">
          <div>
            <label className="block text-gray-700 mb-1">اسم المتجر / الشعار النصي</label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">شريط الإعلان العلوي (Header Ticker)</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">اللون الرئيسي (Onyx Black)</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-0"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 p-2.5 bg-[#F5F1EC] rounded-xl text-xs uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">اللون الثانوي الذهبي (Muted Gold)</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-0"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="flex-1 p-2.5 bg-[#F5F1EC] rounded-xl text-xs uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banners Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-[var(--color-secondary)]" />
            <h3 className="text-lg font-serif font-bold">بنرات الصفحة الرئيسية (Hero Banners)</h3>
          </div>
        </div>

        <div className="space-y-6">
          {bannersList.map((banner, index) => (
            <div key={banner.id || index} className="p-6 bg-[#F5F1EC] rounded-2xl space-y-4 text-xs font-semibold">
              <h4 className="font-serif font-bold text-sm text-[var(--color-primary)]">شريحة البنر #{index + 1}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">العنوان بالعربية</label>
                  <input
                    type="text"
                    value={banner.titleAr}
                    onChange={(e) => handleBannerChange(index, 'titleAr', e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">العنوان الفرعي بالعربية</label>
                  <input
                    type="text"
                    value={banner.subtitleAr}
                    onChange={(e) => handleBannerChange(index, 'subtitleAr', e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1">رابط صورة الخلفية (High Quality Image URL)</label>
                  <input
                    type="text"
                    value={banner.image}
                    onChange={(e) => handleBannerChange(index, 'image', e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </form>
  );
}
