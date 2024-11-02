import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  // get a product that going to be updated
  const [productData, setProductData] = useState([]);
  axios
    .get(`http://localhost:5000/api/products/${id}`)
    .then((response) => {
      // console.log(response.data);
      setProductData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const onSubmit = async (data) => {
    if (productData) {
      setValue("title", productData.title);
      setValue("description", productData.description);
      setValue("category", productData?.category);
      setValue("trending", productData.trending);
      setValue("oldPrice", productData.oldPrice);
      setValue("newPrice", productData.newPrice);
      setValue("image", productData.image);
    }

    const updateProductData = {
      title: data.title || productData.title,
      description: data.description || productData.description,
      category: data.category || productData.category,
      trending: data.trending || productData.trending,
      oldPrice: Number(data.oldPrice) || productData.oldPrice,
      newPrice: Number(data.newPrice) || productData.newPrice,
      image: imageFile || productData.image,
    };

    await axios
      .put(`http://localhost:5000/api/products/edit/${id}`, updateProductData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/dashboard/manage-products')
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
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
            {...register("description")}
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
            {...register("category")}
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
              {...register("trending")}
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
            {...register("oldPrice")}
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
            {...register("newPrice")}
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="new Price"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image of product
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
