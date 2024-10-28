import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log(categoryName);
  const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Fetch products based on category
    const categoryProducts = products.filter(product => product.category === categoryName.toLowerCase());
    // Set filteredProducts state with filtered products
    setFilteredProducts(categoryProducts);
  }, [categoryName]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mt-8 mb-12">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">{categoryName}</h2>
        <p className="max-w-[500px] m-auto text-center text-[#64748b]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
          ipsam!
        </p>
      </section>
      {/* Render filtered products */}
      <div className="mb-12">
        <ProductCard products={filteredProducts}/>
      </div>
    </>
  )
}
export default CategoryPage