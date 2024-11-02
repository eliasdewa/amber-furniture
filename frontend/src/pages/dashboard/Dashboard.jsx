import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // console.log(data)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  
  if (loading) return <Loading />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <i class="ri-box-3-fill ri-2x"></i>
          </div>
          <div>
            <span className="text-2xl font-bold">{data?.totalProducts} </span>
            <span className="text-gray-500">Products</span>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <i className="ri-hand-coin-fill ri-2x"></i>
          </div>
          <div>
            <span className="text-2xl font-bold">${data?.totalSales} </span>
            <span className="text-gray-500">Total Sales</span>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <i className="ri-bar-chart-fill ri-2x"></i>
          </div>
          <div>
            <span className="text-2xl font-bold">{data?.totalOrders} </span>
            <span className="text-gray-500">Total Orders</span>
          </div>
        </div>
        <div className="flex flex-col items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <i className="ri-line-chart-fill ri-2x"></i>
          </div>
          <div>
            <span className="text-2xl font-bold">
              {data?.trendingProducts}{" "}
            </span>
            <span className="text-gray-500">
              Trending product in this month
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
        <div className="px-6 py-5 font-semibold border-b border-gray-100">
          The number of orders per month
        </div>
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            <RevenueChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
