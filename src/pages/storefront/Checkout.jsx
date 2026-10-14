import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, ShieldCheck, Truck, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useCmsStore } from '../../store/useCmsStore';
import { Button } from '../../components/ui/Button';
import { createPayment } from "../../api/moyasar";
import MoyasarPayment from "../../components/storefront/MoyasarPayment";

export function Checkout() {
  const navigate = useNavigate();
  const { lang, t } = useLanguageStore();
  const { cart, getCartSubtotal, getCartTotal, appliedCoupon, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { siteConfig } = useCmsStore();

  const [formData, setFormData] = useState({
    fullName: 'سارة المحمد',
    email: 'sara.m@example.com',
    phone: '+966 50 123 4567',
    address: 'الرياض، حي الصحافة، شارع العليا - مبنى 42',
    city: 'الرياض',
    paymentMethod: 'mada', // 'credit_card' | 'mada' | 'apple_pay' | 'cod'
  });

  const [createdOrder, setCreatedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartSubtotal();
  const freeShippingThreshold = siteConfig?.freeShippingThreshold || 300;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : (siteConfig?.shippingFee || 25);
  const grandTotal = getCartTotal(shippingFee);




  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderPayload = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: `${formData.city}، ${formData.address}`,
        paymentMethod: formData.paymentMethod,
        total: grandTotal,
        items: cart.map((item) => ({
          productId: item.id,
          name: item.nameAr || item.name,
          price: item.discountPrice || item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
      };

      const order = createOrder(orderPayload);
      clearCart();
      setCreatedOrder(order);
      setIsSubmitting(false);
    }, 1000);
  };



  // Render Order Success Screen
  if (createdOrder) {
    return (
      <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-black/5 space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h2 className="text-3xl font-serif font-bold text-[var(--color-primary)]">
            {t('order_success_title')}
          </h2>

          <div className="p-4 bg-[#F5F1EC] rounded-2xl text-xs space-y-2 text-gray-700">
            <p className="text-gray-500">{t('order_number')}</p>
            <p className="text-xl font-bold font-serif text-[var(--color-secondary)]">{createdOrder.id}</p>
            <p className="pt-2 text-gray-600">{t('thank_you_order')}</p>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-right text-gray-600">
            <div className="flex justify-between">
              <span>العميل:</span>
              <strong className="text-gray-900">{createdOrder.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>عنوان التوصيل:</span>
              <strong className="text-gray-900">{createdOrder.shippingAddress}</strong>
            </div>
            <div className="flex justify-between">
              <span>طريقة الدفع:</span>
              <strong className="text-gray-900 uppercase">{createdOrder.paymentMethod}</strong>
            </div>
            <div className="flex justify-between text-sm font-bold text-black pt-2 border-t">
              <span>إجمالي المبلغ:</span>
              <span>{createdOrder.total.toFixed(2)} {t('currency')}</span>
            </div>
          </div>

          <Button onClick={() => navigate('/shop')} variant="primary" size="lg" className="w-full">
            {t('continue_shopping')}
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F1EC] py-20 font-sans text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-sm border border-black/5 space-y-4">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-serif font-bold">{t('cart_empty')}</h2>
          <Button onClick={() => navigate('/shop')} variant="primary">
            {t('continue_shopping')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EC] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8 space-y-2 text-center sm:text-right">
          <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-widest">
            SECURE CHECKOUT
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-primary)]">
            إتمام طلب الشراء
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Shipping Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <Truck className="w-5 h-5 text-[var(--color-secondary)]" />
                <h3 className="text-lg font-serif font-bold">{t('shipping_info')}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t('full_name')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t('phone')} *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">{t('city')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">{t('address')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <CreditCard className="w-5 h-5 text-[var(--color-secondary)]" />
                <h3 className="text-lg font-serif font-bold">{t('payment_method')}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${formData.paymentMethod === 'mada' ? 'border-[var(--color-secondary)] bg-[#F5F1EC]' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'mada'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'mada' })}
                      className="accent-[var(--color-secondary)]"
                    />
                    <span className="font-bold text-gray-900">{t('mada')}</span>
                  </div>
                  <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded text-[10px]">Mada</span>
                </label>

                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${formData.paymentMethod === 'credit_card' ? 'border-[var(--color-secondary)] bg-[#F5F1EC]' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                      className="accent-[var(--color-secondary)]"
                    />
                    <span className="font-bold text-gray-900">{t('credit_card')}</span>
                  </div>
                  <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[10px]">Visa/Master</span>
                </label>

                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${formData.paymentMethod === 'apple_pay' ? 'border-[var(--color-secondary)] bg-[#F5F1EC]' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'apple_pay'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'apple_pay' })}
                      className="accent-[var(--color-secondary)]"
                    />
                    <span className="font-bold text-gray-900">{t('apple_pay')}</span>
                  </div>
                  <span className="font-bold text-black bg-gray-200 px-2 py-0.5 rounded text-[10px]"> Pay</span>
                </label>

                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${formData.paymentMethod === 'cod' ? 'border-[var(--color-secondary)] bg-[#F5F1EC]' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-[var(--color-secondary)]"
                    />
                    <span className="font-bold text-gray-900">{t('cash_on_delivery')}</span>
                  </div>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">COD</span>
                </label>
              </div>
            </div>

          </div>




          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-4 sticky top-28">
              <h3 className="text-lg font-serif font-bold border-b border-gray-100 pb-4">مراجعة المنتجات في الطلب</h3>

              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs pb-3 border-b border-gray-100">
                    <img src={item.images?.[0]} alt={item.nameAr} className="w-14 h-16 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 line-clamp-1">{item.nameAr || item.name}</h4>
                      <p className="text-gray-500">الكمية: {item.quantity} | {item.selectedSize}</p>
                      <p className="font-serif font-bold text-[var(--color-primary)] mt-1">
                        {((item.discountPrice || item.price) * item.quantity).toFixed(2)} {t('currency')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-gray-600 pt-2">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-gray-900">{subtotal.toFixed(2)} {t('currency')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping_fee')}</span>
                  <span>{isFreeShipping ? <strong className="text-green-700">{t('free')}</strong> : `${shippingFee.toFixed(2)} ${t('currency')}`}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-medium">
                    <span>خصم كود (LUNORA10)</span>
                    <span>-{(subtotal * 0.1).toFixed(2)} {t('currency')}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-[var(--color-primary)] pt-3 border-t font-serif">
                  <span>{t('total')}</span>
                  <span>{grandTotal.toFixed(2)} {t('currency')}</span>
                </div>
              </div>


              {formData.paymentMethod === "cod" && (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full shadow-xl py-4"
                >
                  {t('place_order')}
                </Button>
              )}


              {/* إنشاء عملية الدفع*/}
              {formData.paymentMethod !== "cod" && (
                <MoyasarPayment  type="submit" total={grandTotal} />
              )}

            </div>
          </div>


        </form>

      </div>
    </div>
  );
}
