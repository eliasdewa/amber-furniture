import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  const navigate = useNavigate();
  // Retrieve user info from localStorage
  let user = localStorage.getItem('adminUser');

  if (user) {
    // Parse the JSON string back into an object
    user = JSON.parse(user);
    // console.log(user); // Access user properties like user.username, user.email, etc.
  } else {
    console.log('No user information found in localStorage.');
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <>
      <ToastContainer autoClose={2000} theme="dark" />
      <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
        {/* left-side sidebar */}
        <aside className="hidden sm:flex sm:flex-col">
          {/* logo */}
          <Link
            to="/"
            className="inline-flex items-center justify-center h-20 w-20 bg-slate-200"
          >
            <img src="/ambar-logo.png" alt="" />
          </Link>
          <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
            <nav className="flex flex-col mx-4 my-6 space-y-4">
              {/* dashboard icon */}
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center p-3 text-purple-600 bg-white rounded-lg"
              >
                <span className="sr-only">Dashboard</span>
                <i className="ri-dashboard-fill ri-2x"></i>
              </Link>
              {/* add new product icon */}
              <Link
                to="/dashboard/add-new-product"
                className="inline-flex items-center justify-center p-3 text-purple-600 bg-white rounded-lg"
              >
                <span className="sr-only">Add Product</span>
                <i className="ri-file-add-fill ri-2x"></i>
              </Link>
            </nav>
            {/* setting icon */}
            <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
              <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                <span className="sr-only">Settings</span>
                <i className="ri-settings-2-line ri-2x"></i>
              </button>
            </div>
          </div>
        </aside>
        {/* right-side */}
        <div className="flex-grow text-gray-800">
          {/* header component */}
          <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
            {/* user menu */}
            <div className="flex flex-shrink-0 items-center ml-auto">
              <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                <span className="sr-only">User Menu</span>
                <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                  <span className="font-semibold">Hello, {user.username}</span>
                  <span className="text-sm text-gray-600">Admin</span>
                </div>
                {/* user image */}
                <div className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="user profile photo"
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
              {/* admin logout btn */}
              <div className="border-l pl-3 ml-3 space-x-1">
                <button
                  onClick={handleLogout}
                  className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                >
                  <span className="sr-only">Log out</span>
                  <i className="ri-logout-circle-r-line ri-xl"></i>
                </button>
              </div>
            </div>
          </header>
          {/* main component */}
          <main className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">Furniture Store</h2>
              </div>
              <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                {/* manage all products */}
                <Link
                  to="/dashboard/manage-products"
                  className="inline-flex items-center px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
                >
                  <i className="ri-pencil-fill ri-xl"></i>
                  <span className="ml-1">Manage Products</span>
                </Link>
                {/* Add new product */}
                <Link
                  to="/dashboard/add-new-product"
                  className="inline-flex items-center px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                >
                  <i className="ri-add-line ri-xl"></i>
                  <span className="ml-1">Add New Product</span>
                </Link>
                {/* Orders */}
                <Link
                  to="/dashboard/orders"
                  className="inline-flex items-center px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                >
                  <i className="ri-list-unordered ri-xl"></i>
                  <span className="ml-1">All Orders</span>
                </Link>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
