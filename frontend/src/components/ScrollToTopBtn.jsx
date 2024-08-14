import { useEffect, useState } from "react";
import { HiChevronUp } from "react-icons/hi";

const ScrollToTopBtn = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll-to-top button */}
      {showButton && (
        <button
          className="scroll-to-top fixed bottom-4 right-2 text-white duration-300 hover:text-gray-200 inline-block rounded-full bg-teal-600 p-2 shadow transition hover:bg-teal-500 sm:p-3 lg:p-3 z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="sr-only">Back to top</span>
          <HiChevronUp size={30} />
        </button>
      )}
    </>
  );
};
export default ScrollToTopBtn;
