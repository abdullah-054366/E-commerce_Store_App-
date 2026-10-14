import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../../components/storefront/HeroSlider';
import { CategoryBar } from '../../components/storefront/CategoryBar';
import { CategoryGrid } from '../../components/storefront/CategoryGrid';
import { PromoBanners } from '../../components/storefront/PromoBanners';
import { ProductCard } from '../../components/storefront/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import { useCmsStore } from '../../store/useCmsStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Home() {
  const { products, fetchProducts } = useProductStore();
  const { fetchCmsData } = useCmsStore();
  const { lang, t } = useLanguageStore();

  useEffect(() => {
    fetchProducts();
    fetchCmsData();
  }, [fetchProducts, fetchCmsData]);

  const featuredProducts = products.filter((p) => p.featured || p.isNew).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#F5F1EC] font-sans">
      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 2. Circular Category Bar */}
      <CategoryBar />

      {/* 3. "Find Your Perfect Style" Grid */}
      <CategoryGrid />

      {/* 4. Editorial Promo Banners */}
      <PromoBanners />

      {/* 5. "Our Most Loved Picks" (Featured Products) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div className="text-center sm:text-right space-y-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-secondary)]">
                CURATED SELECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)]">
                {t('most_loved_title')}
              </h2>
              <p className="text-sm text-gray-500 font-sans">
                {t('most_loved_subtitle')}
              </p>
            </div>

            <Link to="/shop">
              <Button variant="outlineSecondary" size="md" className="flex items-center gap-2">
                <span>{t('view_all')}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
