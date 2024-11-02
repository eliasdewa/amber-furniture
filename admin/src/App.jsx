import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer autoClose={2000} theme="dark" />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-2 sm:px-4 py-2 sm:py-6 font-primary">
        <Outlet />
      </main>
    </>
  );
};

export default App;
