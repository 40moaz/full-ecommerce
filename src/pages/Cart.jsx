import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CartX, ArrowLeft } from "react-bootstrap-icons";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Change quantity in the cart
  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;

    const updatedCart = cart.map((item) =>
      item.productId === id ? { ...item, quantity: qty } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Quantity changed!", updatedCart);
  };

  // Remove item from the cart
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.productId !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Product removed", updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

if (cart.length === 0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "70vh" }}
    >
      <CartX size={80} className="text-secondary mb-3" />
      <h2 className="fw-bold mb-2">Oops! Your cart is empty</h2>
      <p className="text-muted mb-4">You haven’t added any products yet.</p>
      <Link to="/products" className="btn btn-dark px-4 py-2 d-flex align-items-center gap-2">
        <ArrowLeft /> Start Shopping
      </Link>
    </motion.div>
  );
  return (
    <div className="cart-page">
      <div className="container mt-5">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {cart.map((item, index) => (
            <CartProduct
              key={index}
              productId={item.productId}
              cartProduct={item}
              onQuantityChange={(id, qty) =>
                handleQuantityChange(id, qty)
              }
              onRemove={(id) => handleRemove(id)}
            />
          ))}
        </div>
        <div className="cart-summary d-flex align-items-center justify-content-around" style={{ marginTop: "2rem" }}>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/checkout" className="btn btn-dark" >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
