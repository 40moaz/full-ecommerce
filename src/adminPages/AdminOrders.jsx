import React, { useState, useEffect } from "react";
import instance from "../axiosInstance/Instance";
import "../styles/Orders.css"; // Create this file for custom styles
import { Link } from "react-router-dom";
// Sample data for demonstration

const statusColors = {
  pending: "#fbbf24",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simulating an API call to fetch orders
        const response = await instance.get("/api/orders");
        console.log("Orders fetched successfully:", response.data.orders);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await instance.patch(`/api/orders/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error(error);
      // Optionally, show error to user
    }
    setUpdatingOrderId(null);
  };

  return (
    <div className="orders-admin-container">
      <h1 className="orders-title">Orders Management</h1>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total ($)</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-orders">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td><Link to={`/admin/orders/${order._id}`} className="text-decoration-underline"> {order._id}</Link></td>
                  <td>{order.name}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <span
                      className="order-status"
                      style={{
                        background: statusColors[order.status],
                        color: "#fff",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <ul className="order-items">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title}{" "}
                          <span className="item-qty">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      disabled={order.status === "completed" || updatingOrderId === order._id}
                      onClick={() => updateStatus(order._id, "completed")}
                    >
                      {order.status === "completed"
                        ? "Completed"
                        : updatingOrderId === order._id
                        ? "Updating..."
                        : "Complete"}
                    </button>
                    <br />
                    <button
                      className="btn btn-danger"
                      disabled={order.status === "cancelled" || updatingOrderId === order._id}
                      onClick={() => updateStatus(order._id, "cancelled")}
                    >
                      {order.status === "cancelled"
                        ? "Cancelled"
                        : updatingOrderId === order._id
                        ? "Updating..."
                        : "Cancel"}
                    </button>
                    <button
                      className="btn btn-warning"
                      disabled={order.status === "pending" || updatingOrderId === order._id}
                      onClick={() => updateStatus(order._id, "pending")}
                    >
                      {order.status === "pending"
                        ? "Pending"
                        : updatingOrderId === order._id
                        ? "Updating..."
                        : "Set Pending"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
