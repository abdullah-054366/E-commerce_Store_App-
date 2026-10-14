import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { useLanguageStore } from '../../store/useLanguageStore';

export function CategoryBar() {
  const { categories } = useProductStore();
  const { lang, t } = useLanguageStore();

  return (
    <section className="py-10 bg-[#F5F1EC] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
            {t('category_bar_title')}
          </h3>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth justify-start sm:justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="flex flex-col items-center gap-2.5 min-w-[80px] group flex-shrink-0"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 border-2 border-transparent group-hover:border-[var(--color-secondary)] transition-all bg-white shadow-md">
                <img
                  src={cat.image}
                  alt={cat.nameAr}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-semibold text-gray-800 group-hover:text-[var(--color-secondary)] transition-colors font-sans">
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
