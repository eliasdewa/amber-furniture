import { Link } from "react-router-dom";
import bannerImage from "/bannerImg.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Banner = () => {
  return (
    <div className="group relative block">
      <section className="relative">
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
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/banner/banner1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner/banner3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner/banner5.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner/banner6.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/banner/banner8.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>
      <div class="absolute inset-0 bg-gray-700 opacity-50 rounded-md"></div>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col mx-auto justify-center w-[80%] z-30">
        <h4 className="text-lg sm:text-xl font-medium text-[#ed3849] mb-2">
          UP TO 20% DISCOUNT ON
        </h4>
        <h1 className="lg:text-6xl md:text-4xl sm:text-2xl text-xl font-extrabold mb-4">
          Luxury Furniture
        </h1>
        <p className="mb-8 text-slate-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
          eveniet accusantium laboriosam blanditiis repellat numquam libero
          nostrum. In, ad nulla.
        </p>
        <button className="btn w-1/2">
          <Link to="/products">Explore Now</Link>
        </button>
      </div>
    </div>
  );
};
export default Banner;
