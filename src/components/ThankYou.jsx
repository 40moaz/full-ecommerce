import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <h1 className="mb-4">🎉 Thank you for your order!</h1>
      <p className="lead">
        Your order has been successfully placed. We appreciate your business and we’ll process your order as soon as possible.
      </p>
      <p>If you have any questions, please reach out to our customer service team.</p>
      <Button variant="primary" size="lg" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
}

export default ThankYou;
