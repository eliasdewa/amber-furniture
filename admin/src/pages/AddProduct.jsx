import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  // To store the selected image in the state
  const [image, setImage] = useState(false);
  // To store blog data in the database
  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    sizes: '',
    price: '',
  });

  const onChangeHandler = (e) => {
    // Using the event we can extract name and value properties
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}))
  }
  // To check the data were updated
  // useEffect(() => {
  //   console.log(data)
  // }, [data]);
  
  // Our backend URL
  const url = 'http://localhost:5000';
  // Submit handlers function
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Check if image is selected or not
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    // Check if all required fields are filled
    if (!data.title ||!data.description ||!data.category ||!data.subCategory ||!data.sizes ||!data.price) {
      toast.error('Please fill all required fields');
      return;
    }
    // Check if the price is a number
    if (typeof data.price!== 'number') {
      toast.error('Price should be a number');
      return;
    }
    // Check if the price is positive
    if (data.price <= 0) {
      toast.error('Price should be positive');
      return;
    }
    // Create a form data => to stored data
    const formData = new FormData();
    // To add the all input data in form data
    formData.append('image', image);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('subCategory', data.subCategory);
    formData.append('sizes', data.sizes);
    formData.append('price', Number(data.price));
    // Send these data to our api
    const response = await axios.post(`${url}/api/product/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      // To remove the entered data from the field
      setData({
        title: '',
        description: '',
        category: '',
        subCategory: '',
        sizes: '',
        price: '',
			});
      setImage(false);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
        <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-10">
          {/* Left side */}
          <div>
            {/* Upload image */}
            <div>
              <p className="text-xl mb-4">Upload Image</p>
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : "/upload_area.png"} alt="" className="h-40 cursor-pointer" />
              </label>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
            </div>
            {/* Product Title */}
            <div>
              <p className="text-xl mt-4">Product Title</p>
              <input
                name="title"
                type="text"
                placeholder="Type here"
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                onChange={onChangeHandler} value={data.title}
              />
            </div>
            {/* Product Description */}
            <div>
              <p className="text-xl mt-4">Product Description</p>
              <textarea
                name="description"
                type="text"
                placeholder="write content here"
                rows={6}
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                onChange={onChangeHandler} value={data.description}
              />
            </div>
          </div>
          {/* Right side */}
          <div>
            {/* Product Category */}
            <div>
              <p className="text-xl mt-4">Product Category</p>
              <select
                name="category"
                className="w-full mt-4 px-4 py-3 border text-gray-500"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option value="">Select Category</option>
                <option value="Home Furniture">Home Furniture</option>
                <option value="Bedroom Furniture">Bedroom Furniture</option>
                <option value="Dinning Furniture">Dinning Furniture</option>
                <option value="Cafe Furniture">Cafe Furniture</option>
                <option value="Office Furniture">Office Furniture</option>
              </select>
            </div>
            {/* Product Sub-Category */}
            <div>
              <p className="text-xl mt-4">Product Sub-Category</p>
              <select
                name="subCategory"
                className="w-full mt-4 px-4 py-3 border text-gray-500"
                onChange={onChangeHandler}
                value={data.subCategory}
              >
                <option value="">Select Sub-Category</option>
                <option value="Chairs">Chairs</option>
                <option value="Tables">Tables</option>
                <option value="Sofa and Couch">Sofa and Couch</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            {/* Product Size */}
            <div>
              <p className="text-xl mt-4">Product Size</p>
              <select
                name="sizes"
                className="w-full mt-4 px-4 py-3 border text-gray-500"
                onChange={onChangeHandler}
                value={data.sizes}
              >
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            {/* Product Price */}
            <div>
              <p className="text-xl mt-4">Product Price</p>
              <input
                name="price"
                type="number"
                placeholder="$20"
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                onChange={onChangeHandler} value={data.price}
              />
            </div>
          </div>
        </div>
        {/* Add button */}
        <div className="text-center mb-3">
          <button type="submit" className="mt-8 w-40 h-12 bg-black text-white hover:scale-105">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
