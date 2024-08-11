import { productList } from "../data/data"
import ProductCard from "./ProductCard"

const ProductSection = () => {
  return (
    <section className="mt-16">
      <div className="flex flex-col items-center justify-center gap-2 my-5">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Popular Product Lists</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed animi ducimus doloribus quas nulla ipsam debitis ratione autem nemo quia.</p>
      </div>
      <div className="flex flex-col items-center justify-center flex-wrap sm:flex-row gap-4 px-4">
        {productList.map((product) => {
          return (
            <ProductCard key={product.id} image={product.image} name={product.name} description={product.description}  />
          )
        })}
      </div>
    </section>
  )
}
export default ProductSection;