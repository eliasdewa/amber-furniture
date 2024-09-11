import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"

const CartTotal = () => {
  // get the total cart amount and delivery fee from context api
  const { deliveryFee, getCartTotalAmount } = useContext(ShopContext)
  return (
    <div className="w-full">
      <div className="text-2xl">
        {/* Title */}
        <Title topic={'Cart Totals'} />
      </div>
      {/* Cart total amount details */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${getCartTotalAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>${deliveryFee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>${getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + deliveryFee}.00</b>
        </div>
      </div>
    </div>
  )
}
export default CartTotal