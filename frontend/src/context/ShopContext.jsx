import { createContext } from "react";
import { ProductItems } from "../data/data";

// Create context variable
export const ShopContext = createContext();

// Context provider function
const ShopContextProvider = (props) => {
  const delivery_fee = 10;
  // Create a variable
  const value = {
    ProductItems, delivery_fee
  }
  return (
    <ShopContext.Provider value={value}>
      {/* Render children components */}
      {props.children}
    </ShopContext.Provider>
  );
}
export default ShopContextProvider;