import logo from "/ambar.png";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import LoginPopup from "./LoginPopup";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  // nav items
  const navItems = (
    <>
      <li>
        <a href="/">HOME</a>
      </li>
      <li>
        <a href="/products">PRODUCTS</a>
      </li>
      <li>
        <a href="/about">ABOUT US</a>
      </li>
      <li>
        <a href="/contact">CONTACT US</a>
      </li>
    </>
  );
  // de-structure getCartCount from context api
  const { getCartCount } = useContext(ShopContext);

  return (
    <header className="w-full bg-container transition-all duration-300 ease-in-out sticky top-0 z-50 border-b">
      <div className="navbar bg-base-100">
        {/* left */}
        <div className="navbar-start flex">
          {/* Toggle menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden py-1 mx-1">
              <MdMenu size={26} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* logo */}
          <Link to="/">
            <img src={logo} alt="" className="w-50 h-24" />
          </Link>
        </div>
        {/* center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        {/* right */}
        <div className="navbar-end flex items-center gap-2">
          {/* Login button */}
          <div className="group relative">
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-light-golden p-2 flex items-center"
            >
              <FaRegUser /> Sign In
            </button>
            <div className="group-hover:block hidden absolute dropdown-menu ring-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
