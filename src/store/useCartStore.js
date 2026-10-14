import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  isOpen: false,
  appliedCoupon: null,
  discountAmount: 0,

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addToCart: (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    set((state) => {
      const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
      const color = selectedColor || (product.colors ? product.colors[0]?.name : 'Standard');

      const existingIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...state.cart];
        updated[existingIndex].quantity += quantity;
        return { cart: updated, isOpen: true };
      } else {
        const newItem = {
          ...product,
          cartItemId: `${product.id}-${size}-${color}`,
          quantity,
          selectedSize: size,
          selectedColor: color,
        };
        return { cart: [...state.cart, newItem], isOpen: true };
      }
    });
  },

  updateQuantity: (cartItemId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter((item) => item.cartItemId !== cartItemId) };
      }
      return {
        cart: state.cart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    });
  },

  removeFromCart: (cartItemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
    }));
  },

  applyCoupon: (code) => {
    if (code.toUpperCase() === 'LUNORA10') {
      set({ appliedCoupon: 'LUNORA10', discountPercent: 10 });
      return { success: true, message: 'تم تطبيق خصم 10% بنجاح!' };
    }
    return { success: false, message: 'كود الخصم غير صحيح' };
  },

  clearCart: () => set({ cart: [], appliedCoupon: null, discountAmount: 0 }),

  getCartSubtotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  },

  getCartTotal: (shippingFee = 0) => {
    const subtotal = get().getCartSubtotal();
    const { appliedCoupon } = get();
    const discount = appliedCoupon === 'LUNORA10' ? subtotal * 0.1 : 0;
    return Math.max(0, subtotal - discount + shippingFee);
  }
}));
