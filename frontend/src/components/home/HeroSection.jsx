import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full h-screen bg-[url('/hero.jpg')] bg-cover bg-no-repeat bg-center relative">
      <div className="bg-black/50 w-full h-screen flex items-center justify-center">
        <div className="w-3/4 text-center">
          <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold text-green">
            Discover the beauty of your{" "}
            <span className="font-bold text-golden">Home Interior</span>
          </h1>
          <p className="text-white/90 md:mt-6 md:block text-lg md:text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            officia corporis quasi doloribus iure architecto quae voluptatum
            beatae excepturi dolores and achivments.
          </p>

          <div className="mt-4 sm:mt-8">
            <Link to='/products'
              className="group w-48 flex items-center justify-center gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 mx-auto text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
            >
              <span className="font-medium text-white transition-colors group-active:text-indigo-500">
                Find out more
              </span>

              <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
                <FaArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
