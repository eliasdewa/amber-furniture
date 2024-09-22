import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../Title";
import ProductCard from "../ProductCard";

const ProductSection = () => {
  const { productItems } = useContext(ShopContext);
  // console.log(productItems);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    setProductList(productItems.slice(0, 10));
    // eslint-disable-next-line
  }, []);

  return (
    <section className="mt-16">
      <Title
        topic={"Latest Popular Furniture"}
        description={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod vitae facere optio ex quos. Vitae itaque aliquam inventore suscipit quis!"
        }
      />
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productList.map((product, idx) => (
          <ProductCard
            key={idx}
            id={product._id}
            image={product.image}
            title={product.title}
            description={product.description}
            prevPrice={product.prevPrice}
            newPrice={product.newPrice}
            category={product.category}
          />
        ))}
      </div>
    </section>
  );
};
export default ProductSection;
