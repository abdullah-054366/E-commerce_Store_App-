import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useLanguageStore } from '../../store/useLanguageStore';

export function ProductCard({ product }) {
  const { lang, t } = useLanguageStore();
  const { addToCart } = useCartStore();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlistStore();
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(product.id);
  const mainImage = product.images?.[0] || 'https://via.placeholder.com/400';
  const hoverImage = product.images?.[1] || mainImage;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-black/5 transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image Container */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`}>
          <img
            src={isHovered ? hoverImage : mainImage}
            alt={product.nameAr}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded-full shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[var(--color-secondary)] text-white text-[11px] font-bold rounded-full shadow-sm uppercase tracking-wider">
              جديد
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 left-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-700 hover:bg-white hover:text-red-500'
          }`}
          title={t('wishlist')}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Floating Quick Action Buttons */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 py-2.5 px-4 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full hover:bg-[var(--color-primary-hover)] flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('add_to_cart')}</span>
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center"
            title={t('quick_view')}
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-semibold text-[var(--color-secondary)] uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 hover:text-[var(--color-secondary)] transition-colors line-clamp-1 font-sans">
              {lang === 'ar' ? product.nameAr || product.name : product.nameEn || product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 my-1.5">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold mr-1 text-gray-800">{product.rating}</span>
            </div>
            <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 py-1">
            {product.colors.map((c, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Price Tag */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-base font-bold text-[var(--color-primary)] font-serif">
                  {product.discountPrice.toFixed(2)} {t('currency')}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {product.price.toFixed(2)} {t('currency')}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-[var(--color-primary)] font-serif">
                {product.price.toFixed(2)} {t('currency')}
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
