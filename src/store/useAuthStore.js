import { create } from 'zustand';
import { getStoredData } from '../api/client';

export const useAuthStore = create((set) => ({
  user: null, // null or user object
  isAdminLoggedIn: false,

  login: (email, password) => {
    const db = getStoredData();
    const found = db.users?.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      set({ user: found, isAdminLoggedIn: found.role === 'admin' });
      return { success: true, user: found };
    }
    // Mock admin auto login for testing
    if (email === 'admin@lunora.com' || password === 'admin') {
      const adminUser = {
        id: 'usr_admin',
        name: 'عبدالله المدير',
        email: 'admin@lunora.com',
        role: 'admin'
      };
      set({ user: adminUser, isAdminLoggedIn: true });
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'بيانات الدخول غير صحيحة' };
  },

  logout: () => set({ user: null, isAdminLoggedIn: false })
}));
