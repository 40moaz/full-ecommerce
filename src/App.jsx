import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import Products from "./components/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Instance from "./axiosInstance/Instance";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import ThankYou from "./components/ThankYou";
import Dashboard from "./adminPages/Dashboard";
import AdminProducts from "./adminPages/AdminProducts";
import AdminOrders from "./adminPages/AdminOrders";
import Users from "./adminPages/Users";
import AddProduct from "./adminPages/AddProduct";
import EditProduct from "./adminPages/EditProduct";
import OrderDetails from "./adminPages/OrderDetails";
import BreadcrumbWatcher from "./components/BreadcrumbWatcher";
import BreadcrumbTrail from "./components/BreadcrumbTrail";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults"; // أو المسار اللي عندك
import ChatWidget from "./components/ChatWidget";

function App() {
  const [user, setUser] = useState({});
  const token = Cookies.get("token") || "";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const response = await Instance.get("/api/auth/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Assuming token is stored in localStorage
            },
          });
          const userData = response.data;
          setUser(userData);
          console.log("User data fetched successfully:", userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  console.log(user);

  const userId = user._id;
  const cartItems = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return (
    <>
      <div className="app">
        <Header user={user} />
        <BreadcrumbWatcher />
        <BreadcrumbTrail />

        <Routes>
          <Route path="/" element={<Home />} />
          {!userId && <Route path="/login" element={<Login />} />}
          {!userId && <Route path="/register" element={<Register />} />}
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/cart"
            element={
              userId ? (
                <Cart userId={userId} />
              ) : (
                <div className="text-center mt-5 mb-5">
                  <h1>
                    <Link className="text-decoration-underline" to={"/login"}>
                      login
                    </Link>{" "}
                    or{" "}
                    <Link
                      className="text-decoration-underline"
                      to={"/register"}
                    >
                      register
                    </Link>{" "}
                    an account
                  </h1>
                </div>
              )
            }
          />
          <Route
            path="/wishlist"
            element={
              userId ? (
                <Wishlist />
              ) : (
                <div className="text-center mt-5 mb-5">
                  <h1>
                    <Link className="text-decoration-underline" to={"/login"}>
                      login
                    </Link>{" "}
                    or{" "}
                    <Link
                      className="text-decoration-underline"
                      to={"/register"}
                    >
                      register
                    </Link>{" "}
                    an account
                  </h1>
                </div>
              )
            }
          />
          <Route
            path="/checkout"
            element={
              userId ? (
                <Checkout user={user} cartItems={cartItems} />
              ) : (
                <div className="text-center mt-5 mb-5">
                  <h1>
                    <Link className="text-decoration-underline" to={"/login"}>
                      login
                    </Link>{" "}
                    or{" "}
                    <Link
                      className="text-decoration-underline"
                      to={"/register"}
                    >
                      register
                    </Link>{" "}
                    an account
                  </h1>
                </div>
              )
            }
          />
          <Route path="/ThankYou" element={<ThankYou />} />
          <Route
            path="/products/:productId"
            element={<ProductDetails userId={user._id} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders userId={userId} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />

          {/* admin routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route
            path="/admin/products/edit/:productId"
            element={<EditProduct onCancel={() => console.log("canceled")} />}
          />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:orderId" element={<OrderDetails />} />
          <Route path="/admin/users" element={<Users yourId={userId} />} />
          {/* 404 route */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5 mb-5">
                <h1>404 - Page Not Found</h1>
                <p>
                  <Link className="text-decoration-underline" to="/">
                    Go to Home
                  </Link>
                </p>
              </div>
            }
          />
        </Routes>
        <Footer />
        {/* Chatbot Fixed Button */}
        <ChatWidget />
      </div>
    </>
  );
}

export default App;
