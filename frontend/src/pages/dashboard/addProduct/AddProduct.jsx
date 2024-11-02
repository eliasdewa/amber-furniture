import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const onSubmit = async (data) => {
    const newProductData = {
      ...data,
      image: imageFile,
    };
    // console.log(newProductData);
    axios
    .post("http://localhost:5000/api/products/create-product", newProductData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message);
      reset();
      setImageFileName("");
      setImageFile(null);
    })
    .catch((error) => {
      console.error(error.message);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter product title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter product description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose a category" },
            { value: "home", label: "Home" },
            { value: "office", label: "Office" },
            { value: "cafe", label: "Cafe" },
            { value: "dining", label: "Dining" },
            { value: "bedroom", label: "Bedroom" },
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
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
        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />
        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />
        {/* color */}
        <SelectField
          label="Color"
          name="color"
          options={[
            { value: "", label: "Choose color" },
            { value: "gold", label: "Gold" },
            { value: "brown", label: "Brown" },
            { value: "gray", label: "Gray" },
            { value: "white", label: "White" },
            { value: "yellow", label: "Yellow" },
          ]}
          register={register}
        />
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
