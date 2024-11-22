import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import Loading from "../../components/Loading";
import axios from "axios";
import { useProductStore } from "../../stores/useProductStore";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log(categoryName);
  // get all products
  const { getAllProducts, products, loading } = useProductStore();

	useEffect(() => {
		getAllProducts();
	}, [getAllProducts]);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter products based on category on component mount
  useEffect(() => {
    const categoryProducts = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
    // Set filteredProducts state with filtered products
    setFilteredProducts(categoryProducts);
  }, [categoryName]);
  
  // Handle sorting products
  if (loading) return <Loading />;
  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
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