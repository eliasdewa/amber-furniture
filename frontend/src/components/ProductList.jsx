import { productList } from "../data/data"
import Card from "./Card"

const ProductList = () => {
  return (
    <section className="w-full min-h-screen mt-10">
      <div className="flex flex-col items-center justify-center gap-2 my-5">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold ">Popular Product Lists</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed animi ducimus doloribus quas nulla ipsam debitis ratione autem nemo quia.</p>
      </div>
      <div className="flex flex-col items-center justify-center flex-wrap sm:flex-row gap-4 px-4">
        {productList.map((product) => {
          return (
            <Card key={product.id} image={product.image} name={product.name} description={product.description}  />
          )
        })}
      </div>
    </section>
  )
}
export default ProductList