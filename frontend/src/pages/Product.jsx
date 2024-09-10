import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";
import { IoCartOutline } from "react-icons/io5";

const Product = () => {
  const {productId} = useParams();
  // console.log(productId);
  // get all products
  const {ProductItems, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);

  const [image, setImage] = useState('');

  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    ProductItems.map((item) => {
      if (item._id === parseInt(productId)) {
        setProductData(item);
        // console.log(item);
        setImage(item.image[0]); // Assuming first image is the main image for now
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId, ProductItems]);
  
  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="product image"
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setImage(item)}
                />
              ))
            }
          </div>
          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt="product image"
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.title}</h1>
          <div className="flex items-center gap-1 mt-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegStar />
            <p className="pl-2">(125)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${productData.newPrice}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold">Select Size of Product</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="py-3 px-8 text-white bg-slate-500 active:bg-slate-700 rounded-md hover:scale-105 flex items-center gap-2">Add to Cart <IoCartOutline size={20} /> </button>
        </div>
      </div>
      {/* Description */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut accusantium in itaque dolore minus explicabo! A labore saepe illum. Natus.</p>
        </div>
      </div>
      {/* Display related product */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className="opacity-0"></div>
}
export default Product