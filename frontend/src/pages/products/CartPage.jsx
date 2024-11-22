import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  // Get cart items
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);

  const { totalPrice, tax, taxRate, grandTotalPrice } = useSelector(
    (store) => store.cart
  );

  const dispatch = useDispatch();
  // Get cart items quantity
  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };
  // To remove the cart item
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  // To clear all cart items
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          Cart Page
        </h2>
      </section>
      <div className="flex flex-col md:flex-row mx-auto mt-6 h-full overflow-hidden bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mt-4">
            {cartItems.length === 0 ? (
              <div className="text-xl text-center py-6 font-semibold">
                <p>Your cart is empty!</p>
                <div className="mt-2">
                  <Link to="/products">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                    >
                      <i className="ri-arrow-left-fill"></i>
                      Go to shopping
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product?._id} className="flex px-2 py-4">
                    {/* product image */}
                    <div className="size-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt=""
                        src={product?.image}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    {/* product details */}
                    <div className="ml-4 flex flex-col">
                      {/* Product name */}
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        <strong>Product title: </strong>
                        <Link to="/">{product?.title}</Link>
                      </p>
                      {/* category */}
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        <strong>Category: </strong>
                        {product?.category}
                      </p>
                      {/* Product quantity - incr or decr */}
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        <div className="flex items-center gap-1">
                          <strong>Quantity: </strong>
                          {/* Decrease quantity */}
                          <button
                            onClick={() =>
                              handleQuantity("decrement", product._id)
                            }
                            className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                          >
                            -
                          </button>
                          {/* Quantity value */}
                          <span className="px-1 text-center">
                            {product.quantity}
                          </span>
                          {/* Increase quantity */}
                          <button
                            onClick={() =>
                              handleQuantity("increment", product._id)
                            }
                            className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </p>
                      {/* Product price */}
                      <p className="mt-1 text-sm text-gray-500 capitalize">
                        <strong>Price: </strong>$
                        {Number((product?.newPrice * product?.quantity).toFixed(2))}
                      </p>
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        type="button"
                        className="w-32 px-4 mt-2 py-1 font-medium bg-red-400 rounded-md text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Order summary */}
        {cartItems.length > 0 && (
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mt-4 border border-blue-400 shadow-2xl px-4 py-2 space-y-4">
              <h2 className="text-xl text-center font-semibold">
                Order Summary
              </h2>
              <p>Total Price: ${totalPrice.toFixed(2)}</p>
              <p>
                Tax ({taxRate * 100}%): ${tax.toFixed(2)}
              </p>
              <h3 className="font-bold">
                Grand Total Price: ${grandTotalPrice.toFixed(2)}
              </h3>
              <div className="flex md:flex-col lg:flex-row justify-between items-center mb-6">
                {/* Proceed button */}
                <div>
                  <Link to="/checkout">
                    <button className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md">
                      Proceed To Checkout {" "}
                    </button>
                  </Link>
                  <Link to="/products">
                    {" "}or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline ml-1"
                      >
                        Continue Shopping
                      </button>
                    </Link>
                </div>
                {/* Clear Cart button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearCart();
                  }}
                  className="bg-red-600 px-3 py-1.5 text-white mt-2 rounded-md"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
