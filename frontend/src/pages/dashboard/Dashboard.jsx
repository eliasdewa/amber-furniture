import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // console.log(data)

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
        {/* Total products */}
        <div className="flex flex-col gap-1 items-center p-8 bg-[white] shadow rounded-lg">
          <i className="ri-box-3-fill px-4 py-2 text-purple-600 bg-purple-100 rounded-full ri-2x"></i>
          <div>
            <span className="text-2xl font-bold">{data?.totalProducts} </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">Products</span>
          </div>
        </div>
        {/* Total sales */}
        <div className="flex flex-col gap-1 items-center p-8 bg-white shadow rounded-lg">
          <i className="ri-hand-coin-fill ri-2x px-4 py-2 text-green-600 bg-green-100 rounded-full"></i>
          <div>
            <span className="text-2xl font-bold">${data?.totalSales} </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">Total Sales</span>
          </div>
        </div>
        {/* Total orders */}
        <div className="flex flex-col gap-1 items-center p-8 bg-white shadow rounded-lg">
          <i className="ri-bar-chart-fill ri-2x px-4 py-2 text-blue-600 bg-blue-100 rounded-full"></i>
          <div>
            <span className="text-2xl font-bold">{data?.totalOrders} </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">Total Orders</span>
          </div>
        </div>
        {/* Total users */}
        <div className="flex flex-col gap-1 items-center p-8 bg-white shadow rounded-lg">
          <i className="ri-group-3-fill ri-2x px-4 py-2 text-gray-800 bg-blue-100 rounded-full"></i>
          <div>
            <span className="text-2xl font-bold">{data?.totalUsers} </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">Total Users</span>
          </div>
        </div>
        {/* Total subscribers */}
        <div className="flex flex-col gap-1 items-center p-8 bg-white shadow rounded-lg">
          <i className="ri-thumb-up-fill ri-2x px-4 py-2 text-indigo-700 bg-blue-100 rounded-full"></i>
          <div>
            <span className="text-2xl font-bold">{data?.totalSubscribers} </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">Total Subscribers</span>
          </div>
        </div>
        {/* Trending products */}
        <div className="flex flex-col gap-1 items-center p-8 bg-white shadow rounded-lg">
          <i className="ri-line-chart-fill ri-2x px-4 py-2 text-red-600 bg-red-100 rounded-full"></i>
          <div>
            <span className="text-2xl font-bold">
              {data?.trendingProducts}{" "}
            </span>
          </div>
          <div>
            <span className="text-gray-500 text-center">
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
          <div className="flex items-center justify-center h-full p-4 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
            <RevenueChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
