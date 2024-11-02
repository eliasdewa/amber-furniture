import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/products/Cart";
import Checkout from "../pages/products/Checkout";
import SingleProduct from "../pages/products/SingleProduct";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/products/Orders";
import Products from "../pages/products/Products";
import CategoryPage from "../pages/products/CategoryPage";
import Search from "../pages/products/Search";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import AddProduct from "../pages/dashboard/addProduct/AddProduct";
import UpdateProduct from "../pages/dashboard/updateProduct/UpdateProduct";
import ManageProducts from "../pages/dashboard/manageProducts/ManageProducts";
import AllOrders from "../pages/dashboard/orders/AllOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <SingleProduct /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <Cart /> },
      { path: "/search", element: <Search /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      }
    ],
  },
  {
    path: "/admin",
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
]);

export default router;
