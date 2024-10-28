import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const RelatedProducts = ({ category }) => {
  // Get all products
  const { data } = useGetAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];

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
        <div className="text-center">No related products found.</div>
      )}
    </div>
  );
};
export default RelatedProducts;
