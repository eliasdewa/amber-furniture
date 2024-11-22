import { Link, useParams } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import RelatedProducts from "./RelatedProducts";
import Loading from "../../components/Loading";
import { useState } from "react";
import axios from "axios";

const SingleProductPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [singleProduct, setSingleProduct] = useState([]);
  // get a single product
  axios
    .get(`http://localhost:5000/api/products/${id}`)
    .then((response) => {
      // console.log(response.data.products);
      setSingleProduct(response.data.product);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(singleProduct);
  const dispatch = useDispatch();
  // handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <Loading />;

  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
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
          <span className="hover:text-primary">{singleProduct.title}</span>
        </div>
      </section>
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* product image */}
          <div className="w-full md:w-1/2">
            <img
              src={singleProduct?.image}
              alt={singleProduct.title}
              className="h-auto w-full object-cover"
            />
          </div>
          {/* Product details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.title}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct.newPrice}{" "}
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
export default SingleProductPage;
