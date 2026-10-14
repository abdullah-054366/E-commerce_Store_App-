import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Globe, X, Menu, SlidersHorizontal } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCmsStore } from '../../store/useCmsStore';


export function Navbar() {
  const navigate = useNavigate();
  const { lang, setLanguage, t } = useLanguageStore();
  const { cart, toggleCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { siteConfig } = useCmsStore();


  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F1EC]/90 backdrop-blur-md border-b border-black/5 transition-all">
      {/* Top Announcement Ticker */}
      {showAnnouncement && siteConfig?.announcement && (
        <div className="bg-[var(--color-primary)] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-between">
          <div className="flex-1 text-center font-sans">{siteConfig.announcement}</div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-black hover:bg-black/5 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex flex-col items-start group">
              <span className="text-2xl sm:text-3xl font-bold font-serif tracking-widest text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                {siteConfig?.logoText || 'LUNORA'}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-secondary)] font-medium">
                HAUTE COUTURE
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <Link to="/" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_home')}
              </Link>
              <Link to="/shop" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_shop')}
              </Link>
              <Link to="/shop?category=women" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_women')}
              </Link>
              <Link to="/shop?category=dresses" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_dresses')}
              </Link>
              <Link to="/shop?category=bags" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_accessories')}
              </Link>
              <Link to="/shop?sale=true" className="text-[var(--color-secondary)] font-semibold hover:opacity-80 transition-colors py-1">
                {t('nav_sale')}
              </Link>
              <Link to="/about" className="hover:text-[var(--color-secondary)] transition-colors py-1">
                {t('nav_about')}
              </Link>
            </nav>
          </div>

          {/* Right Action Icons & Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Admin Portal Link Badge */}
            <Link
              to="/admin"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 hover:bg-black/10 text-xs font-semibold text-[var(--color-primary)] rounded-full transition-colors"
              title="لوحة تحكم المتجر"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
              <span>{t('admin_dashboard')}</span>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-black/5 text-xs font-semibold text-gray-700 transition-colors uppercase"
              title="تغيير اللغة"
            >
              <Globe className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500 hover:border-black/30 transition-all w-36 sm:w-44"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{t('search_placeholder')}</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/account?tab=wishlist"
              className="relative p-2 text-gray-800 hover:text-[var(--color-secondary)] transition-colors rounded-full hover:bg-black/5"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[var(--color-secondary)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <Link
              to="/account"
              className="p-2 text-gray-800 hover:text-[var(--color-secondary)] transition-colors rounded-full hover:bg-black/5"
              title={t('my_account')}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag Drawer Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
              title={t('cart')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">{cartItemsCount}</span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-[#F5F1EC] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_home')}
            </Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_shop')}
            </Link>
            <Link to="/shop?category=women" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_women')}
            </Link>
            <Link to="/shop?category=dresses" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_dresses')}
            </Link>
            <Link to="/shop?category=bags" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_accessories')}
            </Link>
            <Link to="/shop?sale=true" onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-secondary)] font-semibold">
              {t('nav_sale')}
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-secondary)]">
              {t('nav_about')}
            </Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-black bg-black/5 p-3 rounded-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>{t('admin_dashboard')}</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Quick Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif font-semibold">{t('search_placeholder')}</h3>
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن بليزر، فستان، حقيبة..."
                className="w-full pl-12 pr-4 py-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:border-[var(--color-secondary)] focus:outline-none text-base font-sans"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[var(--color-primary)] text-white rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
