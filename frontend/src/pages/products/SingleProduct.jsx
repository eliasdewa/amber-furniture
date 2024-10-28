import { Link, useParams } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
// import ReviewCard from "./ReviewCard";
import { useGetSingleProductQuery } from "../../redux/features/products/productsApi";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ReviewCard from "./ReviewCard";
import RelatedProducts from "./RelatedProducts";
import ProductCard from "./ProductCard";

const SingleProduct = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetSingleProductQuery(id);
  const singleProduct = data?.product || {};
  // console.log(singleProduct);
  const dispatch = useDispatch();
  // handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const productReviews = data?.reviews || [];
  // console.log(productReviews);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.data.message}</h1>;

  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mt-8 mb-12">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          Single Product
        </h2>
        <div className="max-w-[500px] m-auto text-center text-[#64748b] space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/products">products</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* product image */}
          <div className="w-full md:w-1/2">
            <img
              src={singleProduct?.image}
              alt={singleProduct.name}
              className="h-auto w-full object-cover"
            />
          </div>
          {/* Product details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct.price}{" "}
              {singleProduct?.oldPrice && (
                <s className="text-sm text-gray-700">
                  ${singleProduct.oldPrice}
                </s>
              )}
            </p>
            <p className="text-gray-400 mb-4">{singleProduct.description}</p>
            {/* Additional Product info */}
            <div className="flex flex-col space-y-2">
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <p>
                <strong>Color:</strong> {singleProduct?.color}
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating:</strong>
                <RatingStars rating={singleProduct?.rating} />
              </div>
            </div>
            {/* Add to cart button */}
            <div className="mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(singleProduct);
                }}
                className="bg-primary mt-6 px-6 py-3 text-white rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Product Reviews */}
      {/* <section className="mt-12">
        <ReviewCard productReviews={productReviews} />
      </section> */}

      {/* Display related product */}
      <section className="mt-24">
        <RelatedProducts category={singleProduct.category} />
      </section>
    </>
  );
};
export default SingleProduct;
