import HeroSection from "../components/HeroSection"
import ProductList from "../components/ProductList"

const Home = () => {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto  px-6">
      <HeroSection />
      <ProductList />
    </div>
  )
}
export default Home