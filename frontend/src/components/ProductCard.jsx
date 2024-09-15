import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
const ProductCard = ({ id, image, title, description, prevPrice, newPrice, category }) => {
  // Give a heart like for the product
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div className="relative block overflow-hidden shadow-xl rounded-lg">
      {/* Heart filled */}
      <div
        onClick={handleLike}
        className={`absolute end-2 top-2 z-10 rounded-full p-1.5 bg-green transition ${
          like ? "text-rose-500" : "text-white"
        }`}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      {/* Card details */}
      <Link to={`/product/${id}`}>
        {/* image */}
        <img
          src={image}
          alt=""
          className="h-44 transition duration-500 group-hover:scale-105"
        />
        <div className="flex flex-col justify-between">
          <h3 className="mt-2 text-lg font-bold text-gray-900 px-2 h-14">
            {title}
          </h3>
          <p className="px-2">{description}</p>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center">
            {/* Price */}
            <div className="flex gap-2 px-2">
              <del className="mt-1.5 text-sm text-gray-700">{prevPrice}</del>
              <p className="mt-1.5 text-sm text-gray-700 font-semibold">
                ${newPrice}
              </p>
            </div>
            {/* add to cart btn */}
            <div className="px-2">
              <button className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded p-2 mx-auto my-2 text-sm transition hover:scale-105">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
