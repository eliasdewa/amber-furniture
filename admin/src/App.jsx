import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

// Backend url
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  // Authentication
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  // Save the token on localStorage
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <ToastContainer autoClose={2000} theme="dark"  />
          <Navbar setToken={setToken}/>
          <hr className="bg-[#a9a9a9] h-0.5" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<AddProduct  token={token} />} />
                <Route path="/list" element={<ListProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default App;
