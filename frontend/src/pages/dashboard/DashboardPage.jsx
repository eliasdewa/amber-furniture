import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllProducts from "./AllProducts";
import AllOrders from "./AllOrders";
import AllUsers from "./AllUsers";
import AllSubscribers from "./AllSubscribers";
import AddProduct from "./AddProduct";
import { useState } from "react";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "all-products", label: "All Products" },
  { id: "all-orders", label: "All Orders" },
  { id: "all-users", label: "All Users" },
  { id: "all-subscribers", label: "All Subscribers" },
  { id: "add-product", label: "Add Product" },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <section className="flex flex-col min-h-screen overflow-hidden">
        {/* header component */}
        <h1 className="text-xl sm:text-2xl font-bold my-4 text-emerald-400 text-center">
          Admin Dashboard
        </h1>
        <header className="flex justify-between items-center text-white border-2 my-4">
          <div className="flex my-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <i className={`ri-${tab.icon}-fill ri-xl`}></i>
                <span className="ml-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </header>
        <div className="border-2">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "all-products" && <AllProducts />}
          {activeTab === "all-orders" && <AllOrders />}
          {activeTab === "all-users" && <AllUsers />}
          {activeTab === "all-subscribers" && <AllSubscribers />}
          {activeTab === "add-product" && <AddProduct />}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
