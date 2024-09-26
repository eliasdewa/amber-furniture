import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const ListProduct = () => {
  // To store all the list product
	const [list, setList] = useState([]);
	// call api to get all the list product
	const fetchList = async () => {
    try {
      await axios.get(`${backendUrl}/api/product/list`)
      .then(response => {
        // console.log(response.data.products);
        setList(response.data.products);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
	}
  // Call the fetchList function when the component mounts
  useEffect(() => {
    fetchList();
  }, []);
  // To delete a product from the admin dashboard
	const deleteProduct = async (mongoId) => {
    try {
      await axios.delete(`${backendUrl}/api/product/delete/${mongoId}`)
      .then((response) => {
        // Show success message and fetch the list again after deletion
        toast.success(response.data.message);
        fetchList();
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
	};
  return (
    <div>
			<h1>All Products</h1>
			<div className='relative h-[90vh] w-full overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
				<table className='w-full text-md text-gray-500'>
					<thead className='text-lg text-gray-300 text-center bg-gray-500'>
						<tr>
							<th scope='col' className='px-6 py-3 border-r'>
                Image
							</th>
							<th scope='col' className='px-6 py-3 border-r'>
                Title
							</th>
							<th scope='col' className='px-6 py-3 border-r'>
								Description
							</th>
							<th scope='col' className='px-6 py-3 border-r'>
								Category
							</th>
							<th scope='col' className='px-6 py-3 border-r'>
								Price
							</th>
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{list.map((item, index) => {
							return (
                <tr key={index} className="text-center">
                  <td className="table-cell">
                    {" "}
                    <img
                      src={item.image[0]}
                      alt=""
                      className="w-16 mx-auto"
                    />
                  </td>
                  <td className="table-cell">
                    {item.title}
                  </td>
                  <td className="table-cell">
                    {item.description}
                  </td>
                  <td className="table-cell">
                    {item.category}
                  </td>
                  <td className="table-cell">
                    ${item.price ? item.price : 0}
                  </td>
                  {/* delete btn */}
                  <td className="table-cell">
                    <MdDelete
                      size={30}
                      className="cursor-pointer mx-auto hover:text-red-500"
                      onClick={() => deleteProduct(item._id)}
                    />
                  </td>
                </tr>
              );
						})}
					</tbody>
				</table>
			</div>
		</div>
  )
}
export default ListProduct