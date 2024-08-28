import { testimonials } from "../../data/data";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Title from "../Title";

const TestimonialSection = () => {
  return (
    <section className="mt-16">
      <Title topic={'Testimonials'} description={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod vitae facere optio ex quos. Vitae itaque aliquam inventore suscipit quis!'} />
      <div className="mx-auto px-4 py-6 sm:px-6">
        <h2 className="max-w-2xl text-2xl tracking-tight text-gray-900 sm:text-4xl px-4">
          What our customers are saying...
        </h2>
        <div className="flex mx-auto py-4">
          <Swiper breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 30
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}>
            {testimonials.map((testimonial) => (
              <SwiperSlide  key={testimonial.id}>
                <TestimonialCard image={testimonial.image} name={testimonial.name} title={testimonial.title} description={testimonial.description} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default TestimonialSection;
