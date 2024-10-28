import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const {data, error, isLoading} = useGetAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];
  const [visibleProducts, setVisibleProducts] = useState(8);
  const handleShowMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

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
