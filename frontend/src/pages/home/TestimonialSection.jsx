import { testimonials } from "../../data/data";
import TestimonialCard from "./TestimonialCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialSection = () => {
  return (
    <section className="p-8 mt-4">
      <h2 className="mb-4 text-3xl font-extrabold">Testimonials</h2>
      <p className="mx-auto mb-8 text-[#64748b]">
        What our customers are saying...
      </p>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard
              image={testimonial.image}
              name={testimonial.name}
              title={testimonial.title}
              description={testimonial.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default TestimonialSection;
