import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [], // to store cart items in array
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // action to add a product to cart
    addToCart: (state, action) => {
      // check if item already exists in cart items array
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({...action.payload, quantity: 1});
        // toast.success("Product Added to the Cart")
      } else {
        toast.error("Item already exists in the Cart");
      }
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotalPrice = setGrandTotalPrice(state);
    },
    // action to update the quantity of a product in cart
    // update quantity
    updateQuantity: (state, action) => {
      const products = state.cartItems.map(
        (product) => {
          if (product._id === action.payload.id) {
            if (action.payload.type === "increment") {
              product.quantity += 1;
            } else if (action.payload.type === "decrement") {
              if (product.quantity > 1) {
                product.quantity -= 1;
              }
            }
          }
          return product;
        }
      );
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotalPrice = setGrandTotalPrice(state);
    },
    // action to remove a product from cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotalPrice = setGrandTotalPrice(state);
    },
    // action to clear all cart items
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotalPrice = 0;
    },
  },
});

// utility functions
export const setTotalPrice = (state) => {
  return state.cartItems.reduce(
    (total, product) => Number(total + product.quantity * product.newPrice),
    0
  );
};

export const setTax = (state) => {
  return setTotalPrice(state) * state.taxRate;
};

export const setGrandTotalPrice = (state) => {
  return setTotalPrice(state) + setTax(state);
};
// export the actions
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
