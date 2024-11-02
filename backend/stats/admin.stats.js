import express from "express";
import orderModel from "../models/order.model.js";
import productModel from "../models/products.model.js";

const adminRouter = express.Router();

// Function to calculate admin stats
adminRouter.get("/", async (req, res) => {
  try {
    // 1. Total number of orders
    const totalOrders = await orderModel.countDocuments();
    // 2. Total sales (sum of all totalPrice from orders)
    const totalSales = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // 4. Trending products statistics:
    const trendingProductsCount = await productModel.aggregate([
      { $match: { trending: true } }, // Match only trending products
      { $count: "trendingProductsCount" }, // Return the count of trending products
    ]);

    // If you want just the count as a number, you can extract it like this:
    const trendingProducts =
      trendingProductsCount.length > 0
        ? trendingProductsCount[0].trendingProductsCount
        : 0;

    // 5. Total number of products
    const totalProducts = await productModel.countDocuments();

    // 6. Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
          totalSales: { $sum: "$totalPrice" }, // Sum totalPrice for each month
          totalOrders: { $sum: 1 }, // Count total orders for each month
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Result summary
    res
      .status(200)
      .json({
        totalOrders,
        totalSales: totalSales[0]?.totalSales || 0,
        trendingProducts,
        totalProducts,
        monthlySales,
      });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

export default adminRouter;
