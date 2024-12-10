import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import ToTopBtn from "./components/ToTopBtn";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";

const App = () => {
  const restoreAuthState = useUserStore((state) => state.restoreAuthState);

  useEffect(() => {
    restoreAuthState();
  }, [restoreAuthState]);
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
      <ToTopBtn />
      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
};

export default App;
