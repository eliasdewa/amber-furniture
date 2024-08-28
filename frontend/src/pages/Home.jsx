import BestSeller from "../components/home/BestSeller"
import HeroSection from "../components/home/HeroSection"
import ProductSection from "../components/home/ProductSection"
import ScrollToTopBtn from "../components/home/ScrollToTopBtn"
import TestimonialSection from "../components/home/TestimonialSection"

const Home = () => {
  return (
    <div className="px-2">
      <HeroSection />
      <ProductSection />
      <BestSeller />
      <TestimonialSection />
      <ScrollToTopBtn />
    </div>
  )
}
export default Home