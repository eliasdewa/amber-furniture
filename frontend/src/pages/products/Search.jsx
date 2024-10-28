import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const Search = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    // setSearchQuery('');
  };

  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

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
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
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
export default Search;
