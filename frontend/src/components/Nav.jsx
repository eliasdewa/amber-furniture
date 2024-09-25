import logo from "/ambar.png";
import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavItems } from "../data/data";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { FaCircleUser, FaRegUser } from "react-icons/fa6";
import { BiPowerOff } from "react-icons/bi";
import LoginPopup from "./LoginPopup";
import { IoCartOutline } from "react-icons/io5";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  // de-structure getCartCount from context api
  const { getCartCount, token, setToken } = useContext(ShopContext);

  const navigate = useNavigate();
  // Logout functionality
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("User logged out successfully");
  };

  return (
    <div className="w-full sticky top-0 z-50 flex justify-between items-center shadow-md bg-white px-4 py-2 sm:px-6 md:px-8 xl:px-12">
      {/* Logo */}
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-full h-12 sm:h-16 md:h-20 cursor-pointer"
          />
        </Link>
      </div>
      {/* Nav links */}
      <div className="flex justify-between items-center gap-5">
        <ul className="hidden md:inline-flex items-center gap-6 lg:gap-10">
          {NavItems.map(({ id, title, to }) => (
            <li key={id}>
              <NavLink to={to} activeClassName="active">
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Login & register */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {/* Login button */}
        <div className="group relative">
          {!token ? (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-light-golden p-2 flex items-center"
            >
              <FaRegUser /> Sign In
            </button>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <FaCircleUser size={35} /> <span>Hello, Ed</span>
              </div>
              <div className="group-hover:block hidden absolute dropdown-menu ring-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black flex gap-1">
                    <MdOutlineShoppingBag size={25} /> Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black flex gap-1"
                    onClick={logout}
                  >
                    <BiPowerOff size={25} /> Logout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <LoginPopup />
        {/* cart */}
        <Link to="/cart">
          <label
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <IoCartOutline size={30} />
              <span className="badge badge-md indicator-item bg-blue-400 w-4 text-center leading-4 text-white text-[12px]">
                {getCartCount()}
              </span>
            </div>
          </label>
        </Link>
        {/* Toggle menu */}
        <div className="text-center">
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="text-2xl md:hidden inline-flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-400"
          >
            <FiMenu />
          </span>
        </div>
      </div>
      {/* Toggle menu */}
      {showMenu && (
        <div className="md:hidden w-[50%] h-screen absolute top-0 right-0 bg-gray-900 text-white p-4 z-50">
          <div className="flex flex-col gap-8 py-4 relative">
            <ul className="flex flex-col gap-4 pt-3">
              {NavItems.map(({ id, title, to }) => (
                <li
                  key={id}
                  className="font-semibold hover:bg-teal-600 cursor-pointer duration-300 p-1"
                >
                  <NavLink
                    to={to}
                    activeClassName="active"
                    onClick={() => setShowMenu(false)}
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <span
              onClick={() => setShowMenu(false)}
              className="absolute top-0 right-3 text-gray-400 hover:bg-red-500 rounded-full text-2xl cursor-pointer hover:bg-gray-300"
            >
              <MdClose />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
