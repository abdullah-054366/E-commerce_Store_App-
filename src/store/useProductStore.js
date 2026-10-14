import { create } from 'zustand';
import { getStoredData, saveStoredData } from '../api/client';

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,

  fetchProducts: () => {
    set({ isLoading: true });
    const db = getStoredData();
    set({ products: db.products || [], categories: db.categories || [], isLoading: false });
  },

  addProduct: (newProd) => {
    const db = getStoredData();
    const productToAdd = {
      ...newProd,
      id: `prod_${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      featured: false,
      isNew: true,
      status: newProd.status || 'published'
    };
    db.products.unshift(productToAdd);
    saveStoredData(db);
    set({ products: db.products });
    return productToAdd;
  },

  updateProduct: (id, updatedFields) => {
    const db = getStoredData();
    db.products = db.products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    saveStoredData(db);
    set({ products: db.products });
  },

  deleteProduct: (id) => {
    const db = getStoredData();
    db.products = db.products.filter((p) => p.id !== id);
    saveStoredData(db);
    set({ products: db.products });
  },

  addCategory: (category) => {
    const db = getStoredData();
    db.categories.push(category);
    saveStoredData(db);
    set({ categories: db.categories });
  }
}));
