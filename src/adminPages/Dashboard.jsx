import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css"; // Create this file for custom styles
import instance from "../axiosInstance/Instance";
import { Link } from "react-router-dom";



export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalProductsPrice, setTotalProductsPrice] = useState(0);
    const stats = [
        { label: "users", value: users.length, icon: "👤", color: "bg-info" },
        { label: "orders", value: orders.length, icon: "🛒", color: "bg-success" },
        { label: "Revenue", value: "$" + totalProductsPrice, icon: "💰", color: "bg-warning" },
        { label: "products", value: products.length, icon: "📦", color: "bg-purple" },
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await instance.get("/api/orders");

                setOrders(response.data.orders);

                // حساب مجموع المنتجات المكتملة
                const total = response.data.orders
                    .filter((order) => order.status === "completed")
                    .reduce((acc, order) => acc + order.totalPrice, 0);

                setTotalProductsPrice(total);
            } catch (error) {
                console.error("Error fetching orders.", error);
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await instance.get("/api/products");

                setProducts(response.data.products);

            } catch (error) {
                console.error("Error fetching orders.", error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await instance.get("/api/auth/users");

                setUsers(response.data.users);
                console.log("Users fetched successfully:", response.data.users);
                

            } catch (error) {
                console.error("Error fetching users.", error.message);
            }
        };
        fetchOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    return (
        <div className="container py-5 bg-light min-vh-100">
            <h1 className="mb-5 fw-bold text-dark">Admin Dashboard</h1>
            <div className="row g-4 mb-5">
                {stats.map((stat) => (
                    <div key={stat.label} className="col-12 col-md-3">
                        <div className={`card text-dark ${stat.color} h-100`}>
                            <div className="card-body d-flex align-items-center">
                                <span className="display-5 me-3">{stat.icon}</span>
                                <div>
                                    <div className="h4 mb-0 fw-bold">{stat.value}</div>
                                    <div className="small"><Link className="text-decoration-underline" to={`/admin/${stat.label}`}>{stat.label}</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="h5 mb-4 fw-semibold text-secondary">Recent Orders</h2>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td><Link className="text-decoration-underline" to={`/admin/orders/${order._id}`}>{order._id}</Link></td>
                                        <td>{order.name}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 fw-semibold ${
                                                    order.status === "completed"
                                                        ? "bg-success"
                                                        : order.status === "pending"
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}