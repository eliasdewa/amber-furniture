import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import AdminRoute from "./AdminRoute";
import Dashboard from "../pages/Dashboard";
import ManageProducts from "../pages/ManageProducts";
import UpdateProduct from "../pages/UpdateProduct";
import AddProduct from "../pages/AddProduct";
import AllOrders from "../pages/AllOrders";
import DashboardLayout from "../components/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AdminLogin />,
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "manage-products",
            element: (
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            ),
          },
          {
            path: "edit-product/:id",
            element: (
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            ),
          },
          {
            path: "add-new-product",
            element: (
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <AdminRoute>
                <AllOrders />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
