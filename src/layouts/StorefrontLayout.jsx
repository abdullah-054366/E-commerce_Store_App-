import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/storefront/Navbar';
import { CartDrawer } from '../components/storefront/CartDrawer';
import { Footer } from '../components/storefront/Footer';
import { useCmsStore } from '../store/useCmsStore';

export function StorefrontLayout() {
  const { siteConfig } = useCmsStore();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5F1EC] text-gray-900 selection:bg-[var(--color-secondary)] selection:text-white">
      {/* Top Header Ticker */}
      {siteConfig?.announcementBar && (
        <div className="bg-[#181818] text-white text-[11px] font-semibold py-2 px-4 text-center tracking-wider border-b border-white/10 uppercase">
          {siteConfig.announcementBar}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
}
