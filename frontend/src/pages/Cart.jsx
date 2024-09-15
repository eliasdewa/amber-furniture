import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
            <th className="table-cell">Item</th>
            <th className="table-cell">Name</th>
            <th className="table-cell">Unity Price</th>
            <th className="table-cell">Size</th>
            <th className="table-cell">Quantity</th>
            <th className="table-cell">Total Price</th>
            <th className="table-cell">Remove</th>
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
                <td className="table-cell">
                  {" "}
                  <img
                    src={productData.image}
                    alt=""
                    className="w-32 mx-auto"
                  />
                </td>
                {/* Item details */}
                <td className="table-cell">
                  {productData.title}
                </td>
                <td className="table-cell">
                  ${productData.newPrice}
                </td>
                <td className="table-cell">
                  {item.size}
                </td>
                <td className="table-cell">
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
                <td className="table-cell">
                  ${productData.newPrice * item.quantity}
                </td>
                {/* delete btn */}
                <td className="table-cell">
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
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3 hover:scale-105">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
