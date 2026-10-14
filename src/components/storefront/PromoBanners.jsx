import React from 'react';
import { Link } from 'react-router-dom';
import { useCmsStore } from '../../store/useCmsStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../ui/Button';

export function PromoBanners() {
  const { promoBanners } = useCmsStore();
  const { lang } = useLanguageStore();

  const banners = promoBanners.length > 0 ? promoBanners : [
    {
      id: 'promo-1',
      tag: 'Spring Collection',
      titleAr: 'خصومات الربيع تصل حتى 50%',
      title: 'Spring Sale up to 50% OFF',
      descAr: 'احصلي على أرقى الفساتين والإكسسوارات بأسعار استثنائية لفترة محدودة.',
      descEn: 'Exclusive savings on haute couture gowns and accessories for a limited time.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      ctaText: 'تسوقي الخصومات',
      ctaLink: '/shop?sale=true',
      bgColor: '#181818',
      textColor: '#FFFFFF'
    },
    {
      id: 'promo-2',
      tag: 'New Arrivals',
      titleAr: 'تشكيلة الموسم وصلت حديثاً',
      title: 'Fresh Styles Just Landed',
      descAr: 'اكتشفي أحدث صيحات الموضة من تصميم كبار مصممي الأزياء.',
      descEn: 'Unveil the newest high-fashion pieces designed for discerning tastes.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
      ctaText: 'استكشفي الجديد',
      ctaLink: '/shop?sort=newest',
      bgColor: '#F5F1EC',
      textColor: '#181818'
    }
  ];

  return (
    <section className="py-16 bg-[#F5F1EC] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              style={{ backgroundColor: banner.bgColor || '#181818' }}
              className="relative rounded-3xl overflow-hidden shadow-xl p-8 sm:p-12 flex flex-col justify-between border border-black/5 min-h-[380px] group img-zoom-container"
            >
              {/* Background Image with Overlay */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* Tag */}
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 bg-[var(--color-secondary)] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  {banner.tag || 'EXCLUSIVE'}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-4 max-w-md pt-12">
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                  {lang === 'ar' ? banner.titleAr || banner.title : banner.title}
                </h3>
                <p className="text-sm text-gray-200 font-sans leading-relaxed">
                  {lang === 'ar' ? banner.descAr || banner.descEn : banner.descEn || banner.descAr}
                </p>

                <div className="pt-2">
                  <Link to={banner.ctaLink || '/shop'}>
                    <Button variant="secondary" size="md">
                      {banner.ctaText || 'تسوقي الآن'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
