import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useProductStore } from "../../stores/useProductStore";
import Loading from "../../components/Loading";

const UpdateProduct = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);
  const product = useProductStore((state) =>
    state.products.find((prod) => prod._id === id)
  );
  const { loading } = useProductStore();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("trending", product.trending);
      setValue("oldPrice", product.oldPrice);
      setValue("newPrice", product.newPrice);
      setValue("image", product.image);
    }

    const updateProductData = {
      title: data.title || product.title,
      description: data.description || product.description,
      category: data.category || product.category,
      trending: data.trending || product.trending,
      oldPrice: Number(data.oldPrice) || product.oldPrice,
      newPrice: Number(data.newPrice) || product.newPrice,
      image: imageFile || product.image,
    };
    
    await updateProduct(id, updateProductData);
    navigate("/dashboard/all-products");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  if (loading) return <Loading />;
  return (
    <section className="flex flex-col min-h-screen overflow-hidden">
      <header className="flex justify-end items-center text-white border-2 p-2 my-4">
        {/* <div className="px-4 py-2 mx-2 rounded-md bg-emerald-600">
          Update Product
        </div> */}
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-primary/60 hover:bg-primary  rounded-md"
        >
          Back to Dashboard
        </Link>
      </header>
      <div className="px-2 py-4 border-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              defaultValue={product.title}
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
              defaultValue={product.description}
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
              defaultValue={product.oldPrice}
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
              defaultValue={product.newPrice}
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
    </section>
  );
};

export default UpdateProduct;
