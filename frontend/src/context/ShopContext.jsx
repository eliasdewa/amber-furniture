import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { productItems } from "../data/data.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context variable
export const ShopContext = createContext();

// Context provider function
const ShopContextProvider = (props) => {
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // Function to add to cart items
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

    if (token) {
      // Update the cart on the backend
      axios
        .post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        )
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  // To change the cart number based on the selected items
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
  // To update the cart number when the number of items changes
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); // one copy of the state
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      // Update the cart on the backend
      axios
        .post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity},
          { headers: { token } }
        )
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  // To get the total amount of the selected items
  const getCartTotalAmount = () => {
    let cartTotalAmount = 0;
    for (const items in cartItems) {
      // console.log(items)
      // let itemsInfo = productItems.find((product) => product._id === items);
      let itemsInfo = {};
      for (let i = 0; i < productItems.length; i++) {
        if (productItems[i]._id === items) {
          Object.assign(itemsInfo, productItems[i]);
          break;
        }
      }
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            cartTotalAmount += itemsInfo.price * cartItems[items][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return cartTotalAmount;
  };
  // When the page loads, to display cart data number from database
  const getUserCartData = async (token) => {
    axios
      .post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      )
      .then((response) => {
        setCartItems(response.data.cartData);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  // Create a variable
  const [productItems, setProductItems] = useState([]);

  // Fetch product items
  const getProductsData = async () => {
    try {
      await axios.get(`${backendUrl}/api/product/list`).then((response) => {
        // console.log(response.data.data);
        setProductItems(response.data.products);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  useEffect(() => {
    getProductsData(); // Fetch product data;
  }, []);
  // Check if user is logged in and set the token from local storage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCartData(localStorage.getItem("token"));
    }
  }, []);
  // Create a variable
  const value = {
    productItems,
    deliveryFee,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartTotalAmount,
    backendUrl,
    token,
    setToken,
    navigate,
  };
  return (
    <ShopContext.Provider value={value}>
      {/* Render children components */}
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
