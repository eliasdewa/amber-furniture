import { useEffect, useState } from "react";
import ProductCard from "../products/ProductCard";
import axios from "axios";
import Loading from "../../components/Loading";
import { useProductStore } from "../../stores/useProductStore";

const TrendingProducts = () => {
  // get all products
  const { getAllProducts, products, loading } = useProductStore();

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

  const [visibleProducts, setVisibleProducts] = useState(4);
  const handleShowMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  if (loading) return <Loading />;
  return (
    <section className="p-4 sm:p-8 mt-4">
      <h2 className="mb-4 text-3xl font-extrabold">All Our Products</h2>
      <p className="m-auto text-[#64748b]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident quae
        impedit soluta ducimus enim! Doloremque consequuntur ad id explicabo
        soluta.
      </p>
      {/* Product Cards */}
      <ProductCard products={products.slice(0, visibleProducts)} />
      {/* Show More Button */}
      <div className="text-center">
        {visibleProducts < products.length && (
          <button onClick={handleShowMore} className="btn mt-8">
            Show More
          </button>
        )}
      </div>
    </section>
  );
};
export default TrendingProducts;
