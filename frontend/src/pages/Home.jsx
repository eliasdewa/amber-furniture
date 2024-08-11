import HeroSection from "../components/HeroSection"
import ProductSection from "../components/ProductSection"
import TestimonialSection from "../components/TestimonialSection"

const Home = () => {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto  px-6">
      <HeroSection />
      <ProductSection />
      <TestimonialSection />
    </div>
  )
}
export default Home