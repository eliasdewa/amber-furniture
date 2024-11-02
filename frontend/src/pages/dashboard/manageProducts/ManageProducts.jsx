import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  // get all products
  axios
    .get("http://localhost:5000/api/products")
    .then((response) => {
      console.log(response.data.products);
      setProducts(response.data.products);
    })
    .catch((error) => {
      console.log(error);
    });

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <section className="w-full mb-12 xl:mb-0 mx-auto">
      <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base">All Products</h3>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  #
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Product Image
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Product Title
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Category
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Price
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {index + 1}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <img
                        src={product.image}
                        alt=""
                        className="w-28 h-20 object-cover"
                      />
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      {product.title}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {product.category.toUpperCase()}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      ${product.newPrice}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                      <Link
                        to={`/dashboard/edit-product/${product._id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="font-medium hover:text-red-500"
                      >
                        <i className="ri-delete-bin-6-line ri-xl"></i>
                      </button>
                    </td>
                  </tr>
                ))) : (
                  <div className="text-center p-8 text-lg font-bold">No Products found</div>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
