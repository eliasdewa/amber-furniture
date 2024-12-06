import Banner from "./Banner"
import Category from "./Category"
import DealSection from "./DealSection"
import EmailSubscription from "./EmailSubscription"
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
      <EmailSubscription />
    </>
  )
}
export default HomePage;