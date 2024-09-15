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

  const tableData = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    // ... more data
  ];
  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        {/* Title */}
        <Title topic={"Your Cart"} />
      </div>
      {/* Display selected cart items */}
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Image</th>
            <th className="border px-4 py-2">Name of Product</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, index) => {
            let productData = {};
            for (let i = 0; i < ProductItems.length; i++) {
              if (ProductItems[i]._id === Number(item.id)) {
                Object.assign(productData, ProductItems[i]);
                break;
              }
            }
            return (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">
                  {" "}
                  <img
                    src={productData.image}
                    alt=""
                    className="w-40 mx-auto"
                  />
                </td>
                {/* Item details */}
                <td className="border px-4 py-2 text-xs sm:text-lg font-medium">
                  {productData.title}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-lg font-medium">
                  ${productData.newPrice}
                </td>
                <td className="border px-4 py-2 text-xs sm:text-lg font-medium sm:px-3 sm:py-1 bg-slate-50">
                  {item.size}
                </td>
                <td className="border px-4 py-2">
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(
                            item.id,
                            item.size,
                            Number(e.target.value)
                          )
                    }
                    className="border max-w-10 sm:max-w-20 sm:px-2"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                </td>
                {/* delete btn */}
                <td className="border px-4 py-2">
                  <MdDelete
                    onClick={() => updateQuantity(item.id, item.size, 0)}
                    size={30}
                    className="cursor-pointer mx-auto hover:text-red"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
