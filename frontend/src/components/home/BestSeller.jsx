import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { ProductItems } = useContext(ShopContext);
  // Filter products by best seller status
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestSellerItems = ProductItems.filter((item) => item.bestSeller);
    setBestSeller(bestSellerItems.slice(0, 5));
    // eslint-disable-next-line
  }, []);

  return (
    <section className="mt-16">
      <Title topic={'Best Seller Furniture'} description={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod vitae facere optio ex quos. Vitae itaque aliquam inventore suscipit quis!'} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product, idx) => (
            <ProductCard key={idx} id={product._id} img={product.img} title={product.title} prevPrice={product.prevPrice} newPrice={product.newPrice} category={product.category}  />
          )
        )}
      </div>
    </section>
  )
}
export default BestSeller