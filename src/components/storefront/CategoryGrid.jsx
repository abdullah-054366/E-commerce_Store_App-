import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export function CategoryGrid() {
  const { lang, t } = useLanguageStore();

  const grids = [
    {
      id: 'dresses',
      titleAr: 'فساتين السهرة والأناقة',
      titleEn: 'Haute Couture Dresses',
      descAr: 'تصاميم انسيابية مطرزة بخيوط الذهبي والحرير.',
      descEn: 'Fluid gowns crafted with gold threads and liquid silk.',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
      size: 'col-span-1 md:col-span-2 lg:col-span-7'
    },
    {
      id: 'women',
      titleAr: 'أزياء المرأة المعاصرة',
      titleEn: 'Contemporary Womenswear',
      descAr: 'بليزارات وقطع كلاسيكية لإطلالة واثقة.',
      descEn: 'Tailored blazers and classic luxury essentials.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
      size: 'col-span-1 md:col-span-1 lg:col-span-5'
    },
    {
      id: 'bags',
      titleAr: 'الحقائب والإكسسوارات الجلدية',
      titleEn: 'Luxury Handbags & Accessories',
      descAr: 'جلد طبيعي مصمم يدوياً ليدوم طويلاً.',
      descEn: 'Full-grain leather pieces crafted to last a lifetime.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
      size: 'col-span-1 md:col-span-1 lg:col-span-5'
    },
    {
      id: 'shoes',
      titleAr: 'الأحذية الفاخرة',
      titleEn: 'High Heels & Footwear',
      descAr: 'خطوات ملكية واثقة تجمع بين الراحة والجمال.',
      descEn: 'Regal shoes combining comfort and high fashion.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      size: 'col-span-1 md:col-span-2 lg:col-span-7'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
            COLLECTION HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)]">
            {t('perfect_style_title')}
          </h2>
          <p className="text-sm text-gray-500 font-sans">
            {t('perfect_style_subtitle')}
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {grids.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl overflow-hidden shadow-md group border border-black/5 min-h-[340px] sm:min-h-[400px] flex items-end p-8 img-zoom-container ${item.size}`}
            >
              <img
                src={item.image}
                alt={item.titleAr}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

              {/* Text overlay */}
              <div className="relative z-10 space-y-3 text-white">
                <h3 className="text-2xl font-serif font-bold tracking-tight">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-md font-sans">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
                <Link
                  to={`/shop?category=${item.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)] hover:text-white transition-colors uppercase tracking-wider pt-1 group/btn"
                >
                  <span>{t('explore_now')}</span>
                  {lang === 'ar' ? (
                    <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
