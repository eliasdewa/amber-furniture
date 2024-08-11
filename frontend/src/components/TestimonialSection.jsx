import { testimonials } from "../data/data";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

const TestimonialSection = () => {
  return (
    <section className="mt-16">
      <div className="flex flex-col items-center justify-center gap-2 my-5">
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-bold">Testimonials</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed animi ducimus doloribus quas nulla ipsam debitis ratione autem nemo quia.</p>
      </div>
      <div className="mx-auto px-4 py-6 sm:px-6">
        <h2 className="max-w-2xl text-2xl tracking-tight text-gray-900 sm:text-4xl px-4">
          What our customers are saying...
        </h2>

        <div className="flex p-4 h-full">
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
