import { useState } from "react"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const [payMethod, setPayMethod] = useState('cash');
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] mb-1">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title topic={'Delivery Information'} />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="email" placeholder="Email address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input type="text" placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex gap-3">
          <input type="number" placeholder="Zip Code" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="number" placeholder="Phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title topic={'Payment Method'}/>
          {/* Payment method selection */}
          <div className="flex gap-3 flex-col">
            <div className="flex items-center gap-3 border py-2 px-3 cursor-pointer" onClick={() => setPayMethod('telebirr')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === 'telebirr' ? 'bg-green' : ''}`}></p>
              <p className="">telebirr</p>
            </div>
            <div className="flex items-center gap-3 border py-2 px-3 cursor-pointer" onClick={() => setPayMethod('CBEbirr')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === 'CBEbirr' ? 'bg-green' : ''}`}></p>
              <p className="">CBEbirr</p>
            </div>
            <div className="flex items-center gap-3 border py-2 px-3 cursor-pointer" onClick={() => setPayMethod('amole')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === 'amole' ? 'bg-green' : ''}`}></p>
              <p className="">Amole</p>
            </div>
            <div className="flex items-center gap-3 border py-2 px-3 cursor-pointer" onClick={() => setPayMethod('cash')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payMethod === 'cash' ? 'bg-green' : ''}`}></p>
              <p className="">Cash On Delivery</p>
            </div>
          </div>
        </div>
        {/* Order btn */}
        <div className="w-full text-end mt-8">
          <Link to='/orders'>
            <button className="bg-black text-white text-sm px-16 py-3">Place Order</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default PlaceOrder