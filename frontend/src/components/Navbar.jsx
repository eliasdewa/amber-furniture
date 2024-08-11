import logo from "/logo.svg";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  // nav items
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Products</summary>
          <ul className="p-2">
            <li>
              <a href="/products">All</a>
            </li>
            <li>
              <a>Living Room Furniture</a>
            </li>
            <li>
              <a>Bedroom Furniture</a>
            </li>
            <li>
              <a>Kitchen & Dining Furniture</a>
            </li>
            <li>
              <a>Office Furniture</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="/about">About Us</a>
      </li>
      <li>
        <a href="/contact">Contact Us</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto bg-container transition-all duration-300 ease-in-out sticky top-0 z-50">
      <div className="navbar xl:px-24 shadow-md bg-base-100 transition-all duration-300 ease-in-out">
        {/* left */}
        <div className="navbar-start flex gap-2">
          {/* Toggle menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden bg-light-golden p-2">
              <MdMenu size={30}/>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* logo */}
          <a href="/">
            <img src={logo} alt="" className="w-50 h-10" />
          </a>
        </div>
        {/* center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        {/* right */}
        <div className="navbar-end flex items-center gap-2">
          {/* search */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Login button */}
          <button
          className="btn bg-light-golden p-2 flex items-center">
            <FaRegUser /> Sign In
          </button>
          {/* cart */}
          <label
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <IoCartOutline size={30} />
              <span className="badge badge-md indicator-item bg-light-golden">8</span>
            </div>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Navbar;