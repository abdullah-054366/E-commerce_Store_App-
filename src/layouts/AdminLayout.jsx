import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { useAuthStore } from '../store/useAuthStore';

export function AdminLayout() {
  const { user } = useAuthStore();

  // If user is not admin, redirect to login page
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    // h-screen + overflow-hidden → locks the whole viewport, children scroll independently
    <div className="h-screen overflow-hidden bg-[#F5F1EC] flex font-sans text-gray-900">
      {/* Admin Sidebar — scrolls independently */}
      <AdminSidebar />

      {/* Main Admin Area — scrolls independently */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader title="لوحة التحكم الإدارية" />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
