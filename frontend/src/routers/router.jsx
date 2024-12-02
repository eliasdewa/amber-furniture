import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/LoginPage";
import SingleProductPage from "../pages/products/SingleProductPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/home/HomePage";
import CartPage from "../pages/products/CartPage";
import CategoryPage from "../pages/products/CategoryPage";
import CheckoutPage from "../pages/products/CheckoutPage";
import OrderPage from "../pages/products/OrderPage";
import ProductsPage from "../pages/products/ProductsPage";
import SearchPage from "../pages/products/SearchPage";
import SingUpPage from "../components/SingUpPage";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AddProduct from "../pages/dashboard/AddProduct";
import AllOrders from "../pages/dashboard/AllOrders";
import AllUsers from "../pages/dashboard/AllUsers";
import AllSubscribers from "../pages/dashboard/AllSubscribers";
import AdminRoute from "./AdminRoute";
import UpdateProduct from "../pages/dashboard/UpdateProduct";
import AllProducts from "../pages/dashboard/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <SingleProductPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <SingUpPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <DashboardPage />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-subscribers",
        element: (
          <AdminRoute>
            <AllSubscribers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-new-product",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/edit/:id",
        element: (
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
