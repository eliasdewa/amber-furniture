import { create } from "zustand"; // zustand is used for global state management
import { toast } from "react-toastify";
import axios from "axios";

export const useCartStore = create((set) => ({
	cart: [], // to store cart items in array
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotalPrice: 0,

	// add to cart items
	// Add item to cart or update quantity if the item exists
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Update quantity if item exists
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
        };
      } else {
        // Add new item
        return { cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] };
      }
    }),

  // Update quantity of an item
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  // Clear the cart
  clearCart: () => set({ cart: [] }),
}));

