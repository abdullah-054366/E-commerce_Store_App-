import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, Clock, CheckCircle, Truck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { Button } from '../../components/ui/Button';

export function Account() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') || 'orders';
  const { user, login, logout } = useAuthStore();
  const { orders, fetchOrders } = useOrderStore();
  const { wishlist } = useWishlistStore();
  const { lang, t } = useLanguageStore();

  const [activeTab, setActiveTab] = useState(tabParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  // If not logged in, show luxury Login / Sign In form
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-black/5 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif font-bold text-[var(--color-primary)]">
              {t('login')}
            </h2>
            <p className="text-xs text-gray-500">
              أدخلي حسابك للاطلاع على الطلبات وتتبع الشحنات والمفضلة.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sara.m@example.com"
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl font-semibold">
                {loginError}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full py-3.5">
              {t('login')}
            </Button>
          </form>

          <div className="pt-4 border-t text-center text-xs text-gray-500">
            <p>للتجربة السريعة كمدير:</p>
            <button
              onClick={() => login('admin@lunora.com', 'admin')}
              className="text-[var(--color-secondary)] font-bold underline mt-1"
            >
              تسجيل الدخول التلقائي كمدير المتجر (Admin)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EC] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header User Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[var(--color-secondary)] text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[var(--color-primary)]">{user.name}</h1>
              <p className="text-xs text-gray-500">{user.email} | دور الحساب: <span className="font-bold text-[var(--color-secondary)] uppercase">{user.role}</span></p>
            </div>
          </div>

          <div className="flex gap-3">
            {user.role === 'admin' && (
              <Link to="/admin">
                <Button variant="secondary" size="sm">
                  دخول لوحة التحكم (Admin)
                </Button>
              </Link>
            )}
            <Button onClick={logout} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 ml-1" />
              <span>{t('logout')}</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'orders' ? 'bg-[var(--color-primary)] text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>طلباتي ورصد الشحنات ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'wishlist' ? 'bg-[var(--color-primary)] text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>قائمة المفضلة ({wishlist.length})</span>
            </button>
          </aside>

          {/* Tab Content */}
          <main className="lg:col-span-9">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold">سجل الطلبات</h3>
                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-3xl text-center text-xs text-gray-500">
                    لا يوجد طلبات مسجلة حتى الآن.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between border-b pb-4 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400 block">رقم الطلب:</span>
                          <span className="font-serif font-bold text-base text-[var(--color-secondary)]">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">تاريخ الطلب:</span>
                          <span className="font-semibold text-gray-800">{new Date(order.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">الحالة:</span>
                          <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {t(order.status)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs py-1">
                            <span className="font-semibold text-gray-800">{item.name} ({item.size}) × {item.quantity}</span>
                            <span className="font-serif font-bold text-black">{(item.price * item.quantity).toFixed(2)} {t('currency')}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t flex justify-between items-center text-xs font-bold">
                        <span>إجمالي المبلغ:</span>
                        <span className="text-base font-serif text-[var(--color-primary)]">{order.total?.toFixed(2)} {t('currency')}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold">المنتجات المحفوظة والمفضلة</h3>
                {wishlist.length === 0 ? (
                  <div className="bg-white p-8 rounded-3xl text-center text-xs text-gray-500">
                    لم تقومي بإضافة أي قطعة للمفضلة بعد.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
