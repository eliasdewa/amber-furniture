import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartTotalAmount, productItems } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
    // const name = e.target.name
    // const value = e.target.value;
    // setFormData(data => ({...data, [name]: value}));
  };
  // Submit handler function
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Send form data to the server
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(productItems.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = size
              itemInfo.quantity = cartItems[items][size]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      // console.log(orderItems)
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotalAmount()
      }
      switch (paymentMethod) {
        // Api calls for COD
        case "cash":
          // Send order data to the server
          await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: {token}})
          .then(response => {
            toast.success(response.data.message);
            // Clear the cart
            setCartItems({});
            navigate("/orders");
          })
          .catch(error => toast.error(error.response.data.message))
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 pt-5 sm:pt-14 min-h-[80vh] mb-1">
      {/* User Info */}
      <div className="flex flex-col gap-4 sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title topic={"Delivery Information"} />
        </div>
        {/* First name */}
        <input required
          type="text"
          placeholder="First name"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler} name="firstName" value={formData.firstName}
        />
        {/* last name */}
        <input required
          type="text"
          placeholder="Last name"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="lastName" value={formData.lastName}
        />
        {/* Email */}
        <input required
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="email" value={formData.email}
        />
        {/* Street */}
        <input required
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="street" value={formData.street}
        />
        {/* City and state */}
        <div className="flex gap-3">
          <input required
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="city" value={formData.city}
          />
          <input required
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="state" value={formData.state}
          />
        </div>
        {/* Zip code and country */}
        <div className="flex gap-3">
          <input required
            type="number"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="zipCode" value={formData.zipCode}
          />
          <input required
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="country" value={formData.country}
          />
        </div>
        {/* Phone */}
        <input required
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full" onChange={onChangeHandler} name="phone" value={formData.phone}
        />
      </div>
      {/* Cart total */}
      <div className="mt-8 min-w-80">
        <CartTotal />
      </div>
      {/* Payment method selection */}
      <div className="mt-8">
        <Title topic={"Payment Method"} />
        <div className="flex gap-3 flex-col">
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setPaymentMethod("telebirr")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "telebirr" ? "bg-green" : ""
              }`}
            ></p>
            <p className="">telebirr</p>
          </div>
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setPaymentMethod("CBEbirr")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "CBEbirr" ? "bg-green" : ""
              }`}
            ></p>
            <p className="">CBEbirr</p>
          </div>
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setPaymentMethod("amole")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "amole" ? "bg-green" : ""
              }`}
            ></p>
            <p className="">Amole</p>
          </div>
          <div
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
            onClick={() => setPaymentMethod("cash")}
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                paymentMethod === "cash" ? "bg-green" : ""
              }`}
            ></p>
            <p className="">Cash On Delivery</p>
          </div>
        </div>
        {/* Order btn */}
        <div className="w-full text-end mt-8">
          <button type="submit" className="bg-black text-white text-sm px-16 py-3">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
