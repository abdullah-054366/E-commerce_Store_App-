import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, ShoppingCart, Palette, Users, Settings, ExternalLink, LogOut } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCmsStore } from '../../store/useCmsStore';

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguageStore();
  const { logout } = useAuthStore();
  const { siteConfig } = useCmsStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: t('admin_overview'), path: '/admin', icon: LayoutDashboard },
    { label: t('admin_products'), path: '/admin/products', icon: Package },
    { label: t('admin_categories'), path: '/admin/categories', icon: Tag },
    { label: t('admin_orders'), path: '/admin/orders', icon: ShoppingCart },
    { label: t('admin_cms'), path: '/admin/cms', icon: Palette },
    { label: t('admin_customers'), path: '/admin/customers', icon: Users },
    { label: t('admin_settings'), path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen overflow-y-auto flex-shrink-0 bg-[#181818] text-white flex flex-col justify-between p-6 border-l border-white/10 font-sans z-30">
      <div className="space-y-8">
        {/* Brand Logo */}
        <Link to="/admin" className="block">
          <span className="text-2xl font-serif font-bold text-white tracking-widest">
            {siteConfig?.logoText || 'LUNORA'}
          </span>
          <span className="block text-[9px] uppercase tracking-[0.25em] text-[var(--color-secondary)] font-medium">
            ADMIN PORTAL
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1 text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[var(--color-secondary)] text-white shadow-lg font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="space-y-4 pt-6 border-t border-white/10 text-xs">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>زيارة المتجر العام</span>
          <ExternalLink className="w-4 h-4 text-[var(--color-secondary)]" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
