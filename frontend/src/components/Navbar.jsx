import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import avatarImg from "/avatar.png";
import { useUserStore } from "../stores/useUserStore";
import { clearCart } from "../redux/features/cart/cartSlice";

const dropdownMenu = [
  { name: "Orders", path: "/orders" },
  { name: "Cart", path: "/cart" },
  { name: "CheckOut", path: "/checkout" },
];
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  // dropdown menu
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  // to get car items
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems)
  const { logout, currentUser } = useUserStore();

  const isAdmin = currentUser?.role === "admin";
  // console.log(currentUser)
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // handle logout
  const handleLogOut = async () => {
    await logout();
    navigate("/login")
    // Clear the cart
    dispatch(clearCart());
    setIsDropDownOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 bg-white max-w-screen-2xl mx-auto p-2">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold md:font-extrabold"
          >
            <img src="/ambar-logo.png" alt="" className="w-20 h-16" />
          </Link>
        </div>
        {/* Navigation Links */}
        <div>
          <ul className="hidden [list-style:none] md:flex items-center gap-2 lg:gap-8">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
        {/* nav Icon */}
        <div className="flex items-center justify-end gap-4 relative">
          {/* search icon */}
          <span>
            <Link
              to="/search"
              className="hidden sm:block text-xl hover:text-[#ed3849]"
            >
              <i className="ri-search-line"></i>
            </Link>
          </span>
          {/* cart icon */}
          <span>
            <Link to="/cart">
              <button className="text-xl hover:text-[#ed3849]">
                <i className="ri-shopping-cart-line"></i>
                <sup
                  className="text-sm inline-block px-1.5 text-white rounded-full
                bg-[#ed3849] text-center"
                >
                  {cartItems.length}
                </sup>
              </button>
            </Link>
          </span>
          {/* user icon */}
          <span>
            {currentUser && currentUser ? (
              <>
                <div className="flex items-center gap-1">
                  <img
                    src={currentUser.profileImg|| avatarImg}
                    alt="profile image"
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                    className="size-6 object-cover rounded-full cursor-pointer"
                  />
                  <p className="text-sm">{currentUser?.username}</p>
                </div>
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      <li>
                        {/* Admin dashboard */}
                        {isAdmin && (
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="bg-primary/60 hover:bg-primary text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                            to={"/dashboard"}
                          >
                            <span className="hidden sm:inline">Dashboard</span>
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link
                          to={"/update-profile"}
                          onClick={() => setIsDropDownOpen(false)}
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                        >
                          <span className="hidden sm:inline">Profile</span>
                        </Link>
                      </li>
                      {dropdownMenu.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.path}
                            onClick={() => setIsDropDownOpen(false)}
                            className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-red-300"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="text-xl hover:text-[#ed3849]">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
          {/* Toggle menu */}
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="text-2xl md:hidden inline-flex items-center justify-center cursor-pointer text-[#000] hover:text-primary"
          >
            <i className="ri-menu-line"></i>
          </span>
        </div>
        {/* Toggle menu */}
        {showMenu && (
          <div className="md:hidden w-[50%] h-screen absolute top-0 -right-6 bg-slate-400 p-4">
            <div className="flex flex-col gap-8 py-4 relative">
              <ul className="flex flex-col gap-4 pt-3">
                <li className="link">
                  <NavLink to="/" onClick={() => setShowMenu(false)}>
                    Home
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink to="/products" onClick={() => setShowMenu(false)}>
                    Products
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                    Contact Us
                  </NavLink>
                </li>
                <li className="link">
                  <NavLink to="/about" onClick={() => setShowMenu(false)}>
                    About Us
                  </NavLink>
                </li>
              </ul>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-0 right-3 text-black text-2xl cursor-pointer hover:text-primary"
              >
                <i className="ri-close-line"></i>
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
