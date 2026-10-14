import { create } from 'zustand';
import { getStoredData, saveStoredData } from '../api/client';
import { createPayment } from '../api/moyasar';





export const useOrderStore = create((set, get) => ({
  orders: [],

  fetchOrders: () => {
    const db = getStoredData();
    set({ orders: db.orders || [] });
  },

  createOrder: (orderData) => {
    const db = getStoredData();
    const newOrder = {
      ...orderData,
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString(),
      status: 'processing'
    };
    db.orders.unshift(newOrder);
    saveStoredData(db);
    set({ orders: db.orders });
    return newOrder;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const db = getStoredData();
    db.orders = db.orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    saveStoredData(db);
    set({ orders: db.orders });
  }
}));
