import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "../../components/Loading";
import axios from "axios";
import { useProductStore } from "../../stores/useProductStore";

const SearchPage = () => {
  // get all products
  const { getAllProducts, products, loading } = useProductStore();

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.title.includes(searchQuery) ||
        product.description.includes(searchQuery)
    );
    setFilteredProducts(filtered);
    // setSearchQuery('');
  };

  if (loading) return <Loading />;

  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mt-8 mb-12">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          Search Product
        </h2>
        <p className="max-w-[500px] m-auto text-center text-[#64748b]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
          ipsam!
        </p>
      </section>
      <section>
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search for products..."
            className="w-full max-w-4xl p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="w-full md:w-auto py-2 px-8 bg-primary/80 hover:bg-primary text-white rounded"
          >
            Search
          </button>
        </div>
        {/* Render filtered products */}
        <div className="mb-12">
          <ProductCard products={filteredProducts} />
        </div>
      </section>
    </>
  );
};
export default SearchPage;
