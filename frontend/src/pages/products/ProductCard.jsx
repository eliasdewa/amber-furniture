import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
      {products?.map((product) => (
        <div key={product._id} className="shadow-xl rounded-md">
          <div className="relative">
            {/* product image */}
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            {/* description */}
            <div className="text-center p-4 flex flex-col justify-between">
              <h4 className="mb-1 text-xl font-semibold">{product.title}</h4>
              <p className="font-medium mb-1">
                ${product.newPrice}{" "}
                {product?.oldPrice ? (
                  <s className="text-sm font-normal text-[#64748b]">
                    ${product?.oldPrice}
                  </s>
                ) : null}
              </p>
              <RatingStars rating={product.rating} />
              {/* cart icon */}
              <div className="mt-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className="w-4/5 px-2 py-1 bg-black/60 hover:bg-black text-white rounded-md"
                >
                  <i className="ri-shopping-cart-2-line text-xl"></i>
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductCard;
