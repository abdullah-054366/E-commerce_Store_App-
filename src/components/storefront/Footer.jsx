import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, Share2, Globe, MessageCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useCmsStore } from '../../store/useCmsStore';

export function Footer() {
  const { lang, t } = useLanguageStore();
  const { siteConfig } = useCmsStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#181818] text-white pt-16 pb-8 border-t border-black/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner Box */}
        <div className="bg-[#232323] rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-widest">
              STAY INSPIRED
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {t('newsletter_title')}
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              {t('newsletter_subtitle')}
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-[var(--color-secondary)]/20 border border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-2xl text-sm font-semibold text-center">
                {t('newsletter_success')}
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('email_placeholder')}
                    className="w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[var(--color-secondary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-full hover:bg-opacity-90 transition-opacity"
                >
                  {t('subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-serif font-bold text-white tracking-widest">
                {siteConfig?.logoText || 'LUNORA'}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[var(--color-secondary)] font-medium">
                HAUTE COUTURE
              </span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="flex items-center gap-4 text-gray-400 pt-2">
              <a href="#instagram" className="p-2 hover:text-[var(--color-secondary)] transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#share" className="p-2 hover:text-[var(--color-secondary)] transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#chat" className="p-2 hover:text-[var(--color-secondary)] transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">{t('nav_shop')}</Link></li>
              <li><Link to="/shop?category=women" className="hover:text-white transition-colors">{t('nav_women')}</Link></li>
              <li><Link to="/shop?category=dresses" className="hover:text-white transition-colors">{t('nav_dresses')}</Link></li>
              <li><Link to="/shop?sale=true" className="hover:text-white transition-colors">{t('nav_sale')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
              {t('customer_service')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">{t('faq')}</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">{t('shipping_policy')}</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">{t('returns_policy')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Admin Portal Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
              الإدارة
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/admin" className="hover:text-white transition-colors font-bold text-[var(--color-secondary)]">دخول لوحة التحكم (Admin)</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav_about')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Payments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t('rights_reserved')}</p>

          {/* Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] text-gray-300 font-bold">Mada</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] text-gray-300 font-bold">Visa / Mastercard</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] text-gray-300 font-bold">Apple Pay</span>
            <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] text-gray-300 font-bold">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
