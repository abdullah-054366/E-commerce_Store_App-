import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Globe, User, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';

export function AdminHeader({ title = 'لوحة التحكم' }) {
  const { user } = useAuthStore();
  const { lang, setLanguage } = useLanguageStore();

  return (
    <header className="bg-white border-b border-black/5 px-8 py-4 flex items-center justify-between sticky top-0 z-20 font-sans">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">{title}</h1>
        <p className="text-xs text-gray-500">مرحباً بك مجدداً، {user?.name || 'المدير'}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Language switcher */}
        <button
          onClick={() => setLanguage(lang === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F1EC] rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors"
        >
          <Globe className="w-4 h-4 text-[var(--color-secondary)]" />
          <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-4 border-r border-gray-200">
          <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-serif font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-xs">
            <span className="font-bold text-gray-900 block">{user?.name || 'عبدالله المدير'}</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              مدير النظام (Admin)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
