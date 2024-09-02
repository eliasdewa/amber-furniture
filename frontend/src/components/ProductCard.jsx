import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
const ProductCard = ({ id, img, title, prevPrice, newPrice, category }) => {
  // Give a heart like for the product
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div className="relative block overflow-hidden shadow-xl rounded-lg">
      <div
        onClick={handleLike}
        className={`absolute end-1 top-1 z-10 rounded-full p-1.5 bg-green transition ${
          like ? "text-rose-500" : "text-white"
        }`}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/product/${id}`}>
        <img
          src={img}
          alt=""
          className="h-44 transition duration-500 group-hover:scale-105"
        />
        <div className="flex flex-col justify-between h-48">
          <h3 className="mt-4 text-lg font-medium text-gray-900 px-2">
            {title}
          </h3>
          {/* category */}
          <div className="px-2">
            <span className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="whitespace-nowrap text-sm">{category}</p>
            </span>
          </div>
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
      </Link>
    </div>
  );
};
export default ProductCard;
