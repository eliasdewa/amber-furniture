import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const AddProduct = ({token}) => {
  // To store all images
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  // State variables for the input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState('');
  const [bestSeller, setBestSeller] = useState(false);

  // const onChangeHandler = (e) => {
  //   // Using the event we can extract name and value properties
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setData(data => ({...data, [name]: value}))
  // }
  // To check the data were updated
  // useEffect(() => {
  //   console.log(data)
  // }, [data]);
  
  // Submit handlers function
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Check if image is selected or not
      if (!image1 && !image2 && !image3 && !image4) {
        toast.error('Please select an image');
        return;
      }
      // Check if all required fields are filled
      if (!title ||!description ||!category ||!subCategory ||!sizes ||!price) {
        toast.error('Please fill all required fields');
        return;
      }
      // Check if the price is positive
      if (price <= 0) {
        toast.error('Price should be positive');
        return;
      }
      // Create a form data => to stored data
      const formData = new FormData();
      // To add the all input data in form data
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('price', Number(price));
      formData.append('bestseller', bestSeller);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      // Send these data to our api
      await axios.post(`${backendUrl}/api/product/add`, formData)
      .then((response) => {
        // console.log(response.data);
        toast.success(response.data.message);
        // To remove the entered data from the field
        setTitle('');
        setDescription('');
        setCategory('');
        setSubCategory('');
        setSizes([]);
        setPrice('');
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
        {/* Upload image */}
        <div>
          <p className="text-xl mb-4">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img src={image1 ? URL.createObjectURL(image1) : "/upload_area.png"} alt="" className="w-48 h-40 object-contain cursor-pointer" />
              <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
            </label>
            <label htmlFor="image2">
              <img src={image2 ? URL.createObjectURL(image2) : "/upload_area.png"} alt="" className="w-48 h-40 object-contain cursor-pointer" />
              <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
            </label>
            <label htmlFor="image3">
              <img src={image3 ? URL.createObjectURL(image3) : "/upload_area.png"} alt="" className="w-48 h-40 object-contain cursor-pointer" />
              <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
            </label>
            <label htmlFor="image4">
              <img src={image4 ? URL.createObjectURL(image4) : "/upload_area.png"} alt="" className="w-48 h-40 object-contain cursor-pointer" />
              <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
            </label>
          </div>
        </div>
        {/* Product Title */}
        <div className="w-full">
          <p className="text-xl mt-4">Product Title</p>
          <input
            name="title"
            type="text"
            placeholder="Type here"
            className="w-full max-w-[500px] mt-4 px-4 py-3"
            onChange={(e) => setTitle(e.target.value)} value={title}
          />
        </div>
        {/* Product Description */}
        <div className="w-full">
          <p className="text-xl mt-4">Product Description</p>
          <textarea
            name="description"
            type="text"
            placeholder="write content here"
            rows={6}
            className="w-full max-w-[500px] mt-4 px-4 py-3 border"
            onChange={(e) => setDescription(e.target.value)} value={description}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
          {/* Product Category */}
          <div className="flex-1">
            <p className="text-xl mt-4">Product Category</p>
            <select
              name="category"
              className="w-full max-w-[500px] mt-4 px-4 py-3 border text-gray-500"
              onChange={(e) => setCategory(e.target.value)}
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
          <div className="flex-1">
            <p className="text-xl mt-4">Product Sub-Category</p>
            <select
              name="subCategory"
              className="w-full mt-4 px-4 py-3 border text-gray-500"
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Sub-Category</option>
              <option value="Chairs">Chairs</option>
              <option value="Tables">Tables</option>
              <option value="Sofa and Couch">Sofa and Couch</option>
              <option value="Beds">Beds</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
          {/* Product Size */}
          <div className="flex-1">
            <p className="text-xl mt-4">Product Size</p>
            <select
              name="sizes"
              className="w-full max-w-[500px] mt-4 px-4 py-3 border text-gray-500"
              onChange={(e) => setSizes(e.target.value)}
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          {/* Product Price */}
          <div className="flex-1">
            <p className="text-xl mt-4">Product Price</p>
            <input
              name="price"
              type="number"
              placeholder="$20"
              className="w-full max-w-[500px] mt-4 px-4 py-3 border"
              onChange={(e) => setPrice(e.target.value)} value={price}
            />
          </div>
        </div>
        {/* Best seller product */}
        <div className="w-full flex items-center gap-2 mt-2">
          <input
            id="bestseller"
            type="checkbox"
            onChange={() => setBestSeller(prev => !prev)} checked={bestSeller}
          />
          <label htmlFor="bestseller" className="cursor-pointer">Is a best seller product?</label>
        </div>
        {/* Add button */}
        <div className="w-full">
          <button type="submit" className="mt-4 mb-2 w-40 h-12 bg-black text-white hover:scale-105">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
