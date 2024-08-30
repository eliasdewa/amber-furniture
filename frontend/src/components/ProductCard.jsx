import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
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
          <div className="flex gap-2 px-2">
            <del className="mt-1.5 text-sm text-gray-700">{prevPrice}</del>
            <p className="mt-1.5 text-sm text-gray-700 font-semibold">
              ${newPrice}
            </p>
          </div>
          <div className="my-4 p-2 bottom-2">
            <button className="block w-full rounded bg-yellow-400 p-4 mx-auto my-2 text-sm font-medium transition hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
