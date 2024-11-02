import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import ToTopBtn from "./components/ToTopBtn";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ScrollToTop />
        <ToastContainer autoClose={2000} theme="dark" />
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-2 sm:px-4 py-2 sm:py-6 font-primary">
          <Outlet />
        </main>
        <Footer />
        <ToTopBtn />
      </AuthProvider>
    </>
  );
};

export default App;
