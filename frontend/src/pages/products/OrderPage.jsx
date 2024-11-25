import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import axios from "axios";

const OrderPage = () => {
  const { currentUser } = useUserStore();

  const [orders, setOrders] = useState([]);
  axios
      .get(`http://localhost:5000/api/orders/email/${currentUser.email}`)
      .then((response) => {
        // Add order to the orders collection
        // Clear the cart
        // Redirect to orders page
        // setLoading(false);
        setOrders(response.data.orders)
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
        toast.error("Failed to fetch order");
      });
  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          Orders Page
        </h2>
      </section>
      <div className="container mx-auto p-6 bg-slate-200">
        <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <div>No orders found!</div>
        ) : (
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Order ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Products Id
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Total Price
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    User Info
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Address
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {index + 1}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      {order._id}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <ul>
                        {order.productIds.map((productId) => (
                          <li key={productId}>{productId}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      ${order.totalPrice}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div>
                        <p className="text-gray-600">Name: {order.name}</p>
                        <p className="text-gray-600">Email: {order.email}</p>
                        <p className="text-gray-600">Phone: {order.phone}</p>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                      <div>
                        <p>City: {order.address.city}</p>
                        <p>State: {order.address.state}</p>
                        <p>Country: {order.address.country}</p>
                        <p>Zip-code: {order.address.zipcode}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;