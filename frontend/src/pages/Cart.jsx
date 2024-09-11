import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  // get Product items and cart items from shop context api
  const { ProductItems, cartItems, updateQuantity } = useContext(ShopContext);
  // Change the items to array of products
  const [cartData, setCartData] = useState([]);
  // useEffect to update cartData when cartItems change
  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    // console.log(tempData);
  }, [cartItems]);
  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        {/* Title */}
        <Title topic={"Your Cart"} />
      </div>
      {/* Display selected cart items */}
      <div>
        {cartData.map((item, index) => {
          let productData = {};
          for (let i = 0; i < ProductItems.length; i++) {
            if (ProductItems[i]._id === Number(item.id)) {
              Object.assign(productData, ProductItems[i]);
              break;
            }
          }
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
            >
              <div className="flex items-start gap-6">
                {/* Image */}
                <img src={productData.image} alt="" className="w-16 sm:w-20" />
                {/* Item details */}
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.title}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${productData.newPrice}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              {/* Number of item */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item.id, item.size, Number(e.target.value))
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              {/* delete btn */}
              <MdDelete
                onClick={() => updateQuantity(item.id, item.size, 0)}
                size={30}
                className="cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      {/* Cart total amount section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <Link to="/place-order">
              <button className="bg-black text-white text-sm my-8 px-8 py-3">
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
