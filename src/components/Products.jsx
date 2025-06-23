import { useEffect, useState } from "react";
import Product from "./Product";
import Cookies from "js-cookie";
import instance from "../axiosInstance/Instance";

export const Products = () => {
  const [user, setUser] = useState({});
  const token = Cookies.get("token") || "";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ الأول نحاول نجيب اليوزر من localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return;
        }

        // ✅ لو مفيش بس فيه توكن → نجيب من الـ API
        if (token) {
          const response = await instance.get("/api/auth/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);

          // ✅ خزن اليوزر في localStorage عشان المرات الجاية
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="products">
      <Product user={user} />
    </section>
  );
};

export default Products;
