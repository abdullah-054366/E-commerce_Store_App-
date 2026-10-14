import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLanguageStore } from './store/useLanguageStore';
import { StorefrontLayout } from './layouts/StorefrontLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Storefront Pages
import { Home } from './pages/storefront/Home';
import { Shop } from './pages/storefront/Shop';
import { ProductDetail } from './pages/storefront/ProductDetail';
import { Checkout } from './pages/storefront/Checkout';
import { Account } from './pages/storefront/Account';
import { AboutUs, ContactUs, FAQ, ShippingPolicy } from './pages/storefront/StaticPages';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCMS } from './pages/admin/AdminCMS';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  const { lang, dir } = useLanguageStore();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <Router>
      <Routes>
        {/* Storefront Customer Routes */}
        <Route path="/" element={<StorefrontLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="shipping" element={<ShippingPolicy />} />
          <Route path="returns" element={<ShippingPolicy />} />
        </Route>

        {/* Admin Login (Public - No Auth Required) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="cms" element={<AdminCMS />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
