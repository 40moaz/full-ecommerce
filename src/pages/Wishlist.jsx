import { useEffect, useState } from "react";
import { Trash, CartPlus, CartCheck, Heart } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleAddToCart = (item) => {
    const quantity = item.quantity || 1;
    const cartItem = {
      productId: item._id,
      color: item.color,
      storage: item.storage,
      ram: item.ram,
      quantity,
      price: item.price,
      title: item.title,
      image: item.imagesUrl ? item.imagesUrl[0] : "",
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(
      (cartItm) => cartItm.productId === item._id
    );
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartItems(existingCart);
  };

  const isInCart = (item) =>
    cartItems.some((cartItm) => cartItm.productId === item._id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h2 className="fw-bold mb-4">
        <Heart className="text-danger me-2" size={32} />
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart size={80} className="text-danger mb-3" />
          <h3 className="fw-bold">Your wishlist is empty</h3>
          <p className="text-muted">You haven’t added any favorites yet.</p>
          <Link to="/products" className="btn btn-dark mt-3">
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {wishlistItems.map((item) => (
            <motion.div
              key={item._id}
              className="d-flex align-items-center justify-content-between p-3 shadow-sm rounded bg-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.imagesUrl[0]}
                alt={item.title}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <div className="flex-grow-1 mx-3">
                <h5 className="mb-1">{item.title}</h5>
                <p className="text-muted mb-0">${item.price.toFixed(2)}</p>
              </div>
              <div className="d-flex align-items-center">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn btn-outline-danger me-2"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`btn ${isInCart(item) ? "btn-outline-secondary" : "btn-dark"}`}
                  disabled={isInCart(item)}
                >
                  {isInCart(item) ? (
                    <>
                      <CartCheck className="me-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <CartPlus className="me-1" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
