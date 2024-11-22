import Banner from "./Banner"
import Category from "./Category"
import DealSection from "./DealSection"
import PromoBanner from "./PromoBanner"
import TestimonialSection from "./TestimonialSection"
import TrendingProducts from "./TrendingProducts"

const HomePage = () => {
  return (
    <>
      <Banner />
      <Category />
      <TrendingProducts />
      <DealSection />
      <PromoBanner />
      <TestimonialSection />
    </>
  )
}
export default HomePage;