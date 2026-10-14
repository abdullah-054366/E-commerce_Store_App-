import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Play } from 'lucide-react';
import { useCmsStore } from '../../store/useCmsStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../ui/Button';

export function HeroSlider() {
  const { heroBanners } = useCmsStore();
  const { lang, t } = useLanguageStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = heroBanners.length > 0 ? heroBanners : [
    {
      id: 'default-1',
      badge: 'مجموعة خريف 2026 الحصرية',
      titleAr: 'ارتقي بأسلوبك اليومي مع تشكيلة لونورا',
      title: 'Elevate Your Everyday Style',
      subtitle: 'قطع فاخرة مصممة بعناية فائقة لتعكس أنوثتك وأناقتك المتفردة في كل مناسبة.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
      ctaText: 'تسوقي الآن',
      ctaLink: '/shop'
    }
  ];

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[currentIndex] || banners[0];

  return (
    <section className="relative w-full bg-[#F5F1EC] overflow-hidden border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Text Side */}
          <div className="lg:col-span-6 space-y-6 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentBanner.badge && (
              <span className="inline-block px-4 py-1.5 bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-semibold text-xs rounded-full uppercase tracking-wider">
                {currentBanner.badge}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-primary)] leading-[1.15] tracking-tight">
              {lang === 'ar' ? currentBanner.titleAr || currentBanner.title : currentBanner.title}
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-lunora-muted)] max-w-lg leading-relaxed font-sans">
              {currentBanner.subtitle || t('hero_subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to={currentBanner.ctaLink || '/shop'}>
                <Button variant="primary" size="lg" className="shadow-lg">
                  {t('shop_now')}
                </Button>
              </Link>
              <Link to="/shop?video=true">
                <Button variant="outlineSecondary" size="lg" className="flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t('watch_lookbook')}</span>
                </Button>
              </Link>
            </div>

            {/* Slide Navigation Controls */}
            {banners.length > 1 && (
              <div className="flex items-center gap-4 pt-6">
                <div className="flex items-center gap-2">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-[var(--color-secondary)]' : 'w-2 bg-black/20 hover:bg-black/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-serif font-semibold text-gray-500">
                  0{currentIndex + 1} / 0{banners.length}
                </span>
              </div>
            )}
          </div>

          {/* Right Image Banner Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white img-zoom-container">
              <img
                src={currentBanner.image}
                alt={currentBanner.title}
                className="w-full h-[420px] sm:h-[500px] lg:h-[550px] object-cover object-center"
              />
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating Luxury Tag */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-black/5">
              <div className="w-12 h-12 bg-[var(--color-secondary)]/15 rounded-full flex items-center justify-center text-[var(--color-secondary)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">جودة استثنائية مضمونة</p>
                <p className="text-[11px] text-gray-500">خامات فاخرة 100% طبيعية</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-white border-t border-black/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 justify-center text-center sm:text-right">
            <Truck className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">{t('free_shipping')}</h4>
              <p className="text-[11px] text-gray-500">للطلبات أكثر من 300 ر.س</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-center sm:text-right">
            <RefreshCw className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">{t('easy_returns')}</h4>
              <p className="text-[11px] text-gray-500">سياسة استبدال مرنة</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-center sm:text-right">
            <ShieldCheck className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">{t('secure_payment')}</h4>
              <p className="text-[11px] text-gray-500">تشفير إلكتروني آمن</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center text-center sm:text-right">
            <Headphones className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">{t('support_24_7')}</h4>
              <p className="text-[11px] text-gray-500">خدمة عملاء VIP متواصلة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
