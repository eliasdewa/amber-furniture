import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
const ProductCard = ({ id, img, title, prevPrice, newPrice, category }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className="group relative block overflow-hidden shadow-xl rounded-lg">
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <FaRegHeart />
        </button>
        <img
          src={img}
          alt=""
          className="h-44 transition duration-500 group-hover:scale-105"
        />
        <h3 className="mt-4 text-lg font-medium text-gray-900 px-2">{title}</h3>
        <div className="flex gap-2 mb-4 px-2">
          <del className="mt-1.5 text-sm text-gray-700">{prevPrice}</del>
          <p className="mt-1.5 text-sm text-gray-700">${newPrice}</p>
        </div>
        {/* Category */}
        <div className="text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
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

        <form className="mt-4 p-2">
          <button className="block w-full rounded bg-yellow-400 p-4 mx-auto my-2 text-sm font-medium transition hover:scale-105">
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
};
export default ProductCard;
