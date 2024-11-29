import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [], // Holds cart items
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
          if (!existingItem) {
            // Add new item to cart
            return { cart: [...state.cart, quantity = 1] };
          }
        }),
      updateCartQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity } : item
          ),
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),
      clearCart: () => set({ cart: [] }), // Clear all items
    }),
    {
      name: 'cart-storage', // Key for localStorage
    }
  )
);