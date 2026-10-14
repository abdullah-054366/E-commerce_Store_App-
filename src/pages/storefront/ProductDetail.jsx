import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RefreshCw } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { Button } from '../../components/ui/Button';

export function ProductDetail() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { lang, t } = useLanguageStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs' | 'reviews'
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0]?.name || 'Standard');
      setSelectedImage(0);
    }
  }, [product]);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const images = product.images?.length > 0 ? product.images : ['https://via.placeholder.com/600'];
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newReviewText.trim()) {
      setReviewSubmitted(true);
      setNewReviewText('');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F5F1EC] py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link to="/" className="hover:text-black">{t('nav_home')}</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black">{t('nav_shop')}</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{lang === 'ar' ? product.nameAr : product.nameEn}</span>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-black/5 mb-16">
          
          {/* Left Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={images[selectedImage]}
                alt={product.nameAr}
                className="w-full h-full object-cover object-center"
              />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  خصم مميز
                </span>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx ? 'border-[var(--color-secondary)] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Buying Actions Column */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewsCount} {t('reviews')})</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)] leading-tight">
                {lang === 'ar' ? product.nameAr || product.name : product.nameEn || product.name}
              </h1>

              {/* Pricing */}
              <div className="flex items-baseline gap-3">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-serif font-bold text-[var(--color-primary)]">
                      {product.discountPrice.toFixed(2)} {t('currency')}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {product.price.toFixed(2)} {t('currency')}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-serif font-bold text-[var(--color-primary)]">
                    {product.price.toFixed(2)} {t('currency')}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-gray-600 leading-relaxed font-sans pt-2 border-t border-gray-100">
                {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span>{t('select_size')}:</span>
                    <span className="text-[var(--color-secondary)] font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-11 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'bg-[var(--color-primary)] text-white border-transparent shadow'
                            : 'border-gray-200 text-gray-800 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span>{t('select_color')}:</span>
                    <span className="text-[var(--color-secondary)] font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs border transition-all ${
                          selectedColor === color.name
                            ? 'border-[var(--color-secondary)] bg-[#F5F1EC] font-bold'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: color.hex }} />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Urgency */}
              <div className="pt-4 space-y-2">
                <span className="text-xs font-semibold block">{t('quantity')}:</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-full bg-[#F5F1EC] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-700 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-semibold">
                    ✓ متوفر بالمخزون ({product.stock} قطعة)
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex gap-4">
                <Button
                  onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                  variant="primary"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2 py-4 shadow-xl"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{t('add_to_cart')}</span>
                </Button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-full border transition-all ${
                    isSaved ? 'bg-red-500 text-white border-transparent' : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                  title={t('wishlist')}
                >
                  <Heart className="w-6 h-6 fill-current" />
                </button>
              </div>

              {/* Value proposition bullet points */}
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 pt-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[var(--color-secondary)]" />
                  <span>شحن سريع خلال 2 - 4 أيام</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[var(--color-secondary)]" />
                  <span>إرجاع مجاني خلال 14 يوماً</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Reviews & Description */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-black/5 mb-16">
          <div className="flex border-b border-gray-200 mb-6 gap-8 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'desc' ? 'border-[var(--color-secondary)] text-[var(--color-primary)] font-serif text-lg font-bold' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t('description')}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'specs' ? 'border-[var(--color-secondary)] text-[var(--color-primary)] font-serif text-lg font-bold' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t('specifications')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-[var(--color-secondary)] text-[var(--color-primary)] font-serif text-lg font-bold' : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              {t('customer_reviews')} ({product.reviewsCount})
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="prose max-w-none text-sm text-gray-700 space-y-4">
              <p>{lang === 'ar' ? product.descriptionAr : product.descriptionEn}</p>
              <p>
                تم تصميم هذه القطعة لتمنحك الراحة الكاملة طوال اليوم مع الحفاظ على الهيكل الفاخر الذي لا يتغير بالتغسيل.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-bold text-gray-900">الخامة الرئيسية:</span>
                <span>كتان طبيعي 100% / حرير فاخر</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-bold text-gray-900">بلد الصنع:</span>
                <span>إيطاليا</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-bold text-gray-900">تعليمات الغسيل:</span>
                <span>غسيل جاف فقط (Dry Clean)</span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F5F1EC] rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg">تقييم العملاء</h4>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold text-lg text-gray-900">{product.rating}</span>
                    <span className="text-xs text-gray-500">من أصل 5 نجوم</span>
                  </div>
                </div>
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleAddReview} className="space-y-4 border-t border-gray-200 pt-4">
                <h5 className="font-bold text-sm">{t('add_review')}</h5>
                <textarea
                  rows="3"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder={t('review_placeholder')}
                  className="w-full p-4 bg-[#F5F1EC] rounded-xl text-xs border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                />
                {reviewSubmitted && (
                  <div className="text-xs text-green-700 font-semibold">
                    شكراً لك! تم نشر تقييمك بنجاح.
                  </div>
                )}
                <Button type="submit" variant="primary" size="sm">
                  إرسال التقييم
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[var(--color-primary)]">
              {t('related_products')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
