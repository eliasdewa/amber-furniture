import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const tabs = [
  { id: "dashboard", label: "Dashboard", link: "/dashboard" },
  {
    id: "all-products",
    label: "All Products",
    link: "/dashboard/all-products",
  },
  { id: "all-orders", label: "All Orders", link: "/dashboard/all-orders" },
  { id: "all-users", label: "All Users", link: "/dashboard/all-users" },
  {
    id: "all-subscribers",
    label: "All Subscribers",
    link: "/dashboard/all-subscribers",
  },
  { id: "add-product", label: "Add Product", link: "/dashboard/add-product" },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <section className="min-h-screen overflow-hidden">
      {/* header component */}
      <h1 className="text-xl sm:text-2xl font-bold my-4 text-emerald-400 text-center">
        Admin Dashboard
      </h1>
      <div className="flex md:flex-col gap-2">
        <div className="text-white border-2 max-h-screen md:w-full">
          <div className="flex flex-col md:flex-row gap-2 my-2">
            {tabs.map((tab) => (
              <Link
                to={tab.link}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 mx-2 sm:mx-1 rounded-md duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <i className={`ri-${tab.icon}-fill ri-xl`}></i>
                <span className="ml-1">{tab.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-2 overflow-x-auto max-h-screen md:min-h-screen">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
