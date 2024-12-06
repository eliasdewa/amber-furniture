import { useState } from "react";
import { useProductStore } from "../../stores/useProductStore";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AddProduct = () => {
  const { createProduct, loading } = useProductStore();
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    trending: false,
    oldPrice: '',
    newPrice: '',
    color: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await createProduct(data);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
      {/* Form starts here */}
      <form onSubmit={handleSubmit}>
          {/* title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product title"
            />
          </div>
          {/* description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <input
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product title"
            />
          </div>
          {/* category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Choose a category</option>
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="cafe">Cafe</option>
              <option value="dining">Dining</option>
              <option value="bedroom">Bedroom</option>
            </select>
          </div>
          {/* trending */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="trending"
                value={formData.trending}
                onChange={handleInputChange}
                className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Trending
              </span>
            </label>
          </div>
          {/* old price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Old Price
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleInputChange}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Old Price"
            />
          </div>
          {/* new price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              New Price
            </label>
            <input
              type="number"
              name="newPrice"
              value={formData.newPrice}
              onChange={handleInputChange}
              className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="new Price"
            />
          </div>
          {/* color */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Color
            </label>
            <select
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Choose a color</option>
              <option value="black">Black</option>
              <option value="gold">Gold</option>
              <option value="grey">Grey</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image of product
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              className="mb-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
    </div>
  );
};

export default AddProduct;
