import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const navigate = useNavigate();
  // Retrieve user info from localStorage
  let user = localStorage.getItem("adminUser");

  if (user) {
    // Parse the JSON string back into an object
    user = JSON.parse(user);
    // console.log(user); // Access user properties like user.username, user.email, etc.
  } else {
    console.log("No user information found in localStorage.");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Admin logged out successfully")
  };

  return (
    <>
      <section className="flex flex-col md:bg-gray-100 min-h-screen overflow-hidden">
        {/* header component */}
        <header className="flex justify-between items-center h-20 px-6 sm:px-10 bg-purple-600 text-white">
          {/* logo */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center justify-center h-16 w-16 bg-slate-200 rounded-full"
            >
              <img src="/ambar-logo.png" alt="" />
            </Link>
          </div>
          {/* user menu */}
          <div className="flex flex-shrink-0 items-center ml-auto">
            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
              <span className="font-semibold">Hello, {user.username}</span>
              <span className="text-sm text-gray-300">Admin</span>
            </div>
            {/* user image */}
            <div className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="user profile photo"
                className="h-full w-full object-cover"
              />
            </div>
            {/* admin logout btn */}
            <div className="border-l pl-3 ml-3 space-x-1">
              <button
                onClick={handleLogout}
                className="relative p-2 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
              >
                <span className="sr-only">Log out</span>
                <i className="ri-logout-circle-r-line ri-xl"></i>
              </button>
            </div>
          </div>
        </header>
        <div className="flex">
          {/* left-side sidebar */}
          <aside className="hidden w-40 sm:flex sm:flex-col border-r-2">
            <nav className="flex flex-col gap-2 mr-4 py-6 sm:py-10">
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md mb-3"
              >
                <i className="ri-dashboard-fill ri-xl"></i>
                <span className="ml-1">Dashboard</span>
              </Link>
              {/* manage products */}
              <Link
                to="/dashboard/manage-products"
                className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md mb-3"
              >
                <i className="ri-box-3-fill ri-xl"></i>
                <span className="ml-1">Products</span>
              </Link>
              {/* Orders */}
              <Link
                to="/dashboard/orders"
                className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md mb-3"
              >
                <i className="ri-list-unordered ri-xl"></i>
                <span className="ml-1">Orders</span>
              </Link>
              {/* users */}
              <Link
                to="/dashboard/users"
                className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md mb-3"
              >
                <i className="ri-team-fill ri-xl"></i>
                <span className="ml-1">Users</span>
              </Link>
              <Link
                to="/dashboard/emails"
                className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md mb-3"
              >
                <i className="ri-mail-ai-fill ri-xl"></i>
                <span className="ml-1">Subscribers</span>
              </Link>
            </nav>
          </aside>
          {/* right-side */}
          <div className="flex-grow text-gray-800">
            {/* main component */}
            <main className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h1 className="text-4xl font-semibold mb-2">Ambar Furniture Store</h1>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                  {/* manage all products */}
                  <Link
                    to="/dashboard/manage-products"
                    className="inline-flex items-center p-2 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
                  >
                    <i className="ri-pencil-fill ri-xl"></i>
                    <span className="ml-1">Manage Products</span>
                  </Link>
                  {/* Add new product */}
                  <Link
                    to="/dashboard/add-new-product"
                    className="inline-flex items-center p-2 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                  >
                    <i className="ri-add-line ri-xl"></i>
                    <span className="ml-1">Add New Product</span>
                  </Link>
                </div>
              </div>
              <Outlet />
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
