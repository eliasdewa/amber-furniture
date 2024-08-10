import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="w-full h-screen bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-center relative">
      <div className="bg-black/50 w-full h-[520px] flex items-center justify-center">
        <div className="w-3/4 text-center">
          <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold text-green">
            Discover the beauty of your{" "}
            <span className="font-bold text-golden">Home Interior</span>
          </h1>
          <p className="text-white/90 md:mt-6 md:block text-lg md:text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            officia corporis quasi doloribus iure architecto quae voluptatum
            beatae excepturi dolores.
          </p>

          <div className="mt-4 sm:mt-8">
            <button className="btn btn-sm md:btn-md lg:btn-lg bg-light-golden">
              Find out more <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
