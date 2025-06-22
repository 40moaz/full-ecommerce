import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPage } from "../redux/breadcrumbSlice";

const getPageName = (path, state) => {
  const names = {
    "/": "Home",
    "/about": "About",
    "/profile": "Profile",
    "/cart": "Cart",
    "/orders": "Orders",
    "/login": "Login",
    "/register": "Register",
    "/checkout": "Checkout",
    "/ThankYou": "Thank You",
    "/products": "Products",
    "/dashboard": "Dashboard",
    "/admin/products": "products",
    "/admin/orders": "orders",
    "/admin/users": "users",
  };

  // special case: product details page
  if (path.startsWith("/products/") && state?.name) {
    return state.name;
  }

  return names[path] || path.split("/").filter(Boolean).join(" / ");
};

function BreadcrumbWatcher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const name = getPageName(location.pathname, location.state);
    dispatch(addPage({ path: location.pathname, name }));
  }, [location]);

  return null;
}

export default BreadcrumbWatcher;
