import React, { useState } from "react";
import "../styles/CartProduct.css";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const CartProduct = ({
  productId,
  cartProduct,
  onRemove,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity);

  // دالة لتخزين التغير في الكمية في localStorage
  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    onQuantityChange(productId, newQuantity);
  };

  return (
    <div className="cart-product">
      <div className="img">
        <img src={cartProduct.image} width={100} alt="Product Image" />
      </div>
      <div className="content">
        <h4><Link to={`/products/${productId}`}> {cartProduct.title}</Link></h4>
        <p>
          {cartProduct.color}, {cartProduct.storage}, {cartProduct.ram} GB ram
        </p>
        <p>#{cartProduct.productId}</p>
      </div>
      <div className="actions">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-secondary"
            onClick={() => updateQuantity(quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            disabled
            min="1"
            style={{ width: 60, textAlign: "center" }}
          />
          <button
            className="btn btn-secondary"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="">
          <h5>${(cartProduct.price * quantity).toFixed(2)}</h5>
        </div>
        <div className="">
          <button className="btn" onClick={() => onRemove(productId)}>
            <X size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
