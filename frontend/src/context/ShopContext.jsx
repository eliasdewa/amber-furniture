import { createContext, useEffect, useState } from "react";
import { ProductItems } from "../data/data";
import { toast } from "react-toastify";

// Create context variable
export const ShopContext = createContext();

// Context provider function
const ShopContextProvider = (props) => {
  const delivery_fee = 10;
  // Create a variable
  const [cartItems, setCartItems] = useState({});
  const addToCart = (itemId, size) => {
    // Make a copy of the current state of cart items
    let cartData = structuredClone(cartItems); // one copy of the state
    // If the size is not selected
    if (!size) {
      toast.error("Please select a size of product");
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
    return totalCount;
  };
  // Create a variable
  const value = {
    ProductItems, delivery_fee, cartItems, addToCart, getCartCount
  }
  return (
    <ShopContext.Provider value={value}>
      {/* Render children components */}
      {props.children}
    </ShopContext.Provider>
  );
}
export default ShopContextProvider;