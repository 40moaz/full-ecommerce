import React, { useEffect, useState } from "react";
import instance from "../axiosInstance/Instance";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BagCheck, ExclamationCircle, Trash } from "react-bootstrap-icons";
import { motion } from "framer-motion";

export default function Orders({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const response = await instance.get(`/api/orders/user/${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        toast.error("Failed to fetch orders.");
        console.log(error);
      }
    };
    getUserOrders();
  }, [userId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, cancel it!",
    });
    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await instance.delete(`/api/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel order.");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="orders-page" style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="mb-5 fw-bold d-flex align-items-center text-dark">
        <BagCheck size={30} className="me-2 text-primary" />
        My Orders
      </h1>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <ExclamationCircle size={60} className="text-secondary mb-3" />
            <h3 className="fw-bold">You have no orders yet</h3>
            <p className="text-muted">Once you place an order, it will show up here.</p>
          </motion.div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded shadow-sm mb-4"
              style={{
                borderLeft: `6px solid ${order.status === "Delivered" ? "#4ade80" : "#60a5fa"}`,
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <strong className="text-dark">Order #{order._id}</strong>
                  <span className="text-muted ms-3">{formatDate(order.createdAt)}</span>
                </div>
                <span
                  className={`badge px-3 py-2 ${order.status === "Delivered"
                      ? "bg-success-subtle text-success"
                      : "bg-primary-subtle text-primary"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-2">
                <strong>Items:</strong>
                <ul className="mb-1 ms-3">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-dark">
                      {item.title} <span className="text-muted">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fw-bold text-dark">
                Total: <span className="text-primary">${order.totalPrice.toFixed(2)}</span>
              </div>

              {order.status !== "Delivered" && (
                <button
                  onClick={() => handleCancel(order._id)}
                  disabled={loading}
                  className="btn btn-danger mt-3 d-flex align-items-center"
                >
                  <Trash className="me-2" />
                  {loading ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
