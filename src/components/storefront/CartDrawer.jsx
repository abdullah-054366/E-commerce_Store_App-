import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, Tag, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useCmsStore } from '../../store/useCmsStore';
import { Button } from '../ui/Button';

export function CartDrawer() {
  const navigate = useNavigate();
  const { lang, t } = useLanguageStore();
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, getCartSubtotal, getCartTotal, applyCoupon, appliedCoupon } = useCartStore();
  const { siteConfig } = useCmsStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  if (!isOpen) return null;

  const subtotal = getCartSubtotal();
  const freeShippingThreshold = siteConfig?.freeShippingThreshold || 300;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : (siteConfig?.shippingFee || 25);
  const grandTotal = getCartTotal(shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage(res);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
      />

      <div className={`fixed inset-y-0 ${lang === 'ar' ? 'left-0' : 'right-0'} max-w-full flex pl-10`}>
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-black/5 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-[#F5F1EC] border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
              <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('cart')}</h2>
              <span className="bg-[var(--color-secondary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-gray-500 hover:text-black hover:bg-black/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F8F5F0] border-b border-black/5">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1.5">
              <Truck className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>
                {isFreeShipping
                  ? '🎉 تهانينا! لقد حصلت على شحن مجاني راقٍ.'
                  : `أضف ${remainingForFreeShipping.toFixed(0)} ${t('currency')} أخرى للحصول على شحن مجاني!`}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[var(--color-secondary)] h-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 bg-[#F5F1EC] rounded-full flex items-center justify-center text-[var(--color-secondary)]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-serif font-semibold">{t('cart_empty')}</h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  استكشفي أحدث تشكيلاتنا الفاخرة وأضيفي القطع المفضلة لديكِ إلى السلة.
                </p>
                <Button onClick={closeCart} variant="primary" size="md">
                  {t('continue_shopping')}
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 p-3 bg-[#F5F1EC]/40 rounded-xl border border-black/5 relative group">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/150'}
                    alt={item.nameAr}
                    className="w-20 h-24 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 font-sans">
                          {lang === 'ar' ? item.nameAr || item.name : item.nameEn || item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 space-x-2 space-x-reverse">
                        {item.selectedSize && <span>المقاس: <strong>{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span className="mr-2">اللون: <strong>{item.selectedColor}</strong></span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-full bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:text-black"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-sm font-bold text-[var(--color-primary)] font-serif">
                        {( (item.discountPrice || item.price) * item.quantity ).toFixed(2)} {t('currency')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F5F1EC] border-t border-black/5 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder={t('promo_code') + ' (جربي: LUNORA10)'}
                    className="w-full pl-3 pr-9 py-2 bg-white rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[var(--color-secondary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-secondary)] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {t('apply')}
                </button>
              </form>

              {couponMessage && (
                <div className={`text-xs ${couponMessage.success ? 'text-green-700' : 'text-red-600'}`}>
                  {couponMessage.message}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold text-gray-900">{subtotal.toFixed(2)} {t('currency')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping_fee')}</span>
                  <span>{isFreeShipping ? <strong className="text-green-700">{t('free')}</strong> : `${shippingFee.toFixed(2)} ${t('currency')}`}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>خصم (LUNORA10)</span>
                    <span>-{(subtotal * 0.1).toFixed(2)} {t('currency')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[var(--color-primary)] pt-2 border-t border-gray-300 font-serif">
                  <span>{t('total')}</span>
                  <span>{grandTotal.toFixed(2)} {t('currency')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => {
                  closeCart();
                  navigate('/checkout');
                }}
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-between group"
              >
                <span>{t('proceed_to_checkout')}</span>
                {lang === 'ar' ? <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
