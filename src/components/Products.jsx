import { useEffect, useState } from "react";
import Product from "./Product";
import  Cookies  from "js-cookie";
import instance from "../axiosInstance/Instance";
export const Products = () => {
 const [user, setUser] = useState({});
  const token = Cookies.get("token") || "";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {

          const response = await instance.get('/api/auth/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Assuming token is stored in localStorage
            }});
            const userData = response.data;
            setUser(userData);
          }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <section className='products'>
        <Product user={user}/>
    </section>
  )
}
export default Products;