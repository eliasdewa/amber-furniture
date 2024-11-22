import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "../../components/Loading";
import axios from "axios";
import { useProductStore } from "../../stores/useProductStore";

const RelatedProducts = ({ category }) => {
  // get all products
  const { getAllProducts, products, loading } = useProductStore();

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);
  // State variable to store related products
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Filter out related products based on category and subCategory
  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      // console.log(productCopy.slice(1, 6));
      setRelatedProducts(productCopy.slice(1, 6));
    }
  }, [products]);

  if (loading) return <Loading />;
  return (
    <div className="my-12">
      <h2 className="mb-4 text-2xl font-extrabold capitalize">
        Related Products
      </h2>
      {relatedProducts.length > 0 ? (
        <div className="mb-8">
          <ProductCard products={relatedProducts} />
        </div>
      ) : (
        <div className="text-lg font-semibold my-6 p-4 border">No related products found</div>
      )}
    </div>
  );
};
export default RelatedProducts;
