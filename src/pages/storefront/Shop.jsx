import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, Search } from 'lucide-react';
import { ProductCard } from '../../components/storefront/ProductCard';
import { useProductStore } from '../../store/useProductStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../../components/ui/Button';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, fetchProducts } = useProductStore();
  const { lang, t } = useLanguageStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // URL Query Params
  const categoryParam = searchParams.get('category') || 'all';
  const saleParam = searchParams.get('sale') === 'true';
  const searchQueryParam = searchParams.get('search') || '';

  // Local Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Sale filter
      if (saleParam && (!p.discountPrice || p.discountPrice >= p.price)) {
        return false;
      }
      // Search query filter
      if (searchQueryParam) {
        const query = searchQueryParam.toLowerCase();
        const matchName = (p.nameAr || '').toLowerCase().includes(query) || (p.nameEn || '').toLowerCase().includes(query);
        const matchDesc = (p.descriptionAr || '').toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }
      // Price filter
      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice > maxPrice) return false;

      // Size filter
      if (selectedSize !== 'all' && (!p.sizes || !p.sizes.includes(selectedSize))) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'all' && (!p.colors || !p.colors.some((c) => c.name === selectedColor))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, selectedCategory, saleParam, searchQueryParam, maxPrice, selectedSize, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(1500);
    setSelectedSize('all');
    setSelectedColor('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const sizesList = ['XS', 'S', 'M', 'L', 'XL', '37', '38', '39', '40'];
  const colorsList = [
    { name: 'أسود أنيق', hex: '#181818' },
    { name: 'بيج فاخر', hex: '#E6D7C3' },
    { name: 'ذهبي مطفي', hex: '#A9906F' },
    { name: 'بني كراميل', hex: '#8B5A2B' },
    { name: 'أوف-وايت', hex: '#F5F1EC' }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EC] py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 text-center sm:text-right space-y-2">
          <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-widest">
            COLLECTION CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)]">
            {saleParam ? 'التخفيضات العروض الحصرية' : t('nav_shop')}
          </h1>
          {searchQueryParam && (
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-medium border border-gray-200 mt-2">
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>نتائج البحث عن: <strong>"{searchQueryParam}"</strong></span>
              <button onClick={() => setSearchParams({})} className="text-gray-400 hover:text-black">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Top Controls Bar */}
        <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-black/5 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#F5F1EC] rounded-xl text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--color-secondary)]" />
            <span>{t('filter_by')}</span>
          </button>

          <div className="text-xs text-gray-500 font-medium">
            عرض <strong>{filteredProducts.length}</strong> من أصل <strong>{products.length}</strong> قطعة فاخرة
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 hidden sm:inline">{t('sort_by')}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F5F1EC] border border-transparent rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[var(--color-secondary)]"
            >
              <option value="featured">{t('sort_featured')}</option>
              <option value="newest">{t('sort_newest')}</option>
              <option value="price-low">{t('sort_price_low')}</option>
              <option value="price-high">{t('sort_price_high')}</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 bg-white p-6 rounded-3xl shadow-sm border border-black/5 h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">{t('filter_by')}</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-[var(--color-secondary)] flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('clear_filters')}</span>
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{t('all_categories')}</h4>
              <div className="space-y-1 text-xs font-medium">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-right py-1.5 px-3 rounded-lg transition-colors ${
                    selectedCategory === 'all' ? 'bg-[var(--color-primary)] text-white font-bold' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  جميع القطع ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-right py-1.5 px-3 rounded-lg transition-colors flex justify-between ${
                      selectedCategory === cat.id ? 'bg-[var(--color-primary)] text-white font-bold' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                    <span className="text-[10px] opacity-60">({products.filter(p => p.category === cat.id).length})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <h4 className="font-bold text-gray-900 uppercase tracking-wider">{t('price_range')}</h4>
                <span className="font-bold text-[var(--color-secondary)]">{maxPrice} {t('currency')}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--color-secondary)]"
              />
            </div>

            {/* Sizes Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{t('size')}</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    selectedSize === 'all' ? 'bg-[var(--color-secondary)] text-white border-transparent' : 'border-gray-200 hover:border-black'
                  }`}
                >
                  الكل
                </button>
                {sizesList.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      selectedSize === sz ? 'bg-[var(--color-secondary)] text-white border-transparent' : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">{t('color')}</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-3 py-1 text-xs rounded-full border ${
                    selectedColor === 'all' ? 'bg-black text-white' : 'border-gray-200'
                  }`}
                >
                  الكل
                </button>
                {colorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === c.name ? 'scale-110 border-[var(--color-secondary)] shadow' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid Column */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-black/5 shadow-sm">
                <div className="w-16 h-16 bg-[#F5F1EC] rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-bold">{t('no_products_found')}</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  حاولي تغيير فلاتر البحث أو النقر على إعادة ضبط الفلاتر للاطلاع على التشكيلة الكاملة.
                </p>
                <Button onClick={resetFilters} variant="primary" size="md">
                  {t('clear_filters')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
}
