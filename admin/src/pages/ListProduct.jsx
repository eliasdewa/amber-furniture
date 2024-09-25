import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ListProduct = () => {
  // To store all the list product
	const [list, setList] = useState([]);

  // Our backend URL
  const url = 'http://localhost:5000';
	// call api to get all the list product
	const fetchList = async () => {
		const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
	}
  // To delete a blog from the admin dashboard
	const deleteProduct = async (mongoId) => {
		const response = await axios.delete(`${url}/api/product/delete/${mongoId}`)
    if (response.data.success) {
      // Show success message and fetch the list again after deletion
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
	};
  // Call the fetchList function when the component mounts
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
			<h1>All Products</h1>
			<div className='relative h-[80vh] w-full overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
				<table className='w-full text-sm text-gray-500'>
					<thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
						<tr>
							<th scope='col' className='hidden sm:block px-6 py-3'>
                Image
							</th>
							<th scope='col' className='px-6 py-3'>
                Title
							</th>
							<th scope='col' className='px-6 py-3'>
								Description
							</th>
							<th scope='col' className='px-6 py-3'>
								Category
							</th>
							<th scope='col' className='px-6 py-3'>
								Sub-Category
							</th>
							<th scope='col' className='px-6 py-3'>
								Size
							</th>
							<th scope='col' className='px-6 py-3'>
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
                      src={`${url}/images/` + item.image}
                      alt=""
                      className="w-32 mx-auto"
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
                    {item.subCategory}
                  </td>
                  <td className="table-cell">
                    {item.sizes}
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