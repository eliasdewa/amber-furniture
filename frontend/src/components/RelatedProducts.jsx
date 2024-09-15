import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category, subCategory}) => {
  // Get all products
  const { ProductItems } = useContext(ShopContext);
  // State variable to store related products
  const [relatedProduct, setRelatedProduct] = useState([]);
  // Filter out related products based on category and subCategory
  useEffect(() => {
    if (ProductItems.length > 0) {
      let productCopy = ProductItems.slice();
      productCopy = productCopy.filter((item) => category === item.category)
      productCopy = productCopy.filter((item) => subCategory === item.subCategory)
      // console.log(productCopy.slice(1, 6));
      setRelatedProduct(productCopy.slice(1, 6));
    }
  }, [ProductItems]);
  return (
    <div className="my-6">
      <div className="text-center text-3xl py-2">
        <Title topic={'Related Products'} />
      </div>
      {
        relatedProduct.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          relatedProduct.map((item, index) => (
            <ProductCard
            key={index}
            id={item._id}
            image={item.image}
            title={item.title}
            prevPrice={item.prevPrice}
            newPrice={item.newPrice}
            category={item.category} />
          ))
        }
      </div>
        ) : (
          <div className="text-center">No related products found.</div>
        )
      }
    </div>
  )
}
export default RelatedProducts