import { useState } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [payMethod, setPayMethod] = useState("cash");

  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row justify-start gap-20 pt-5 sm:pt-14 min-h-[80vh] mb-1">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] my-6">
        <div className="text-xl sm:text-2xl">
          <Title topic={"Delivery Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* Right Side */}
      <div className="my-6 w-full sm:max-w-[480px]">
        <CartTotal />
        {/* Order btn */}
        <div className="w-full text-end mt-8">
          <button
            onClick={() => navigate("/orders")}
            className="bg-black text-white text-sm my-8 px-8 py-3 hover:scale-105"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrder;
