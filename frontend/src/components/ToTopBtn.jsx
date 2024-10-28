import { useEffect, useState } from "react";

const ToTopBtn = () => {
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
          className="fixed bottom-4 right-2 text-white duration-300 hover:text-gray-200 inline-block rounded-full bg-teal-600 px-3 py-2 shadow transition hover:bg-teal-500 z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="ri-arrow-up-line text-2xl"></i>
        </button>
      )}
    </>
  );
};
export default ToTopBtn;
