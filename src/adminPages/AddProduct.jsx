import React, { useState } from "react";
import { Form, Button, Container, Alert, Image, Spinner } from "react-bootstrap";
import instance from "../axiosInstance/Instance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({ 
    title: "", 
    price: 0, 
    description: "", 
    colors: [], 
    storages: [], 
    guaranteed: 0, 
    ram: 0, 
    screenSize: 0, 
    battery: 0, 
    category: "", 
    stockQuantity: 0, 
    imagesUrl: [] // URLs instead of base64
  });
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "colors" ||
        name === "storages") {
      setForm((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim())
      }));
    } else if (name === "price" ||
               name === "guaranteed" ||
               name === "ram" ||
               name === "screenSize" ||
               name === "battery" ||
               name === "stockQuantity") {
      setForm((prev) => ({
        ...prev,
        [name]: parseInt(value, 10)
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddImage = () => {
    if (imageLink.trim()) {
      setForm((prev) => ({
        ...prev,
        imagesUrl: [...prev.imagesUrl, imageLink.trim()],
      }));

      setPreviews((prev) => [...prev, imageLink.trim()]);
      setImageLink('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await instance.post('/api/products', form);
      setMessage("Product added successfully!");
      setForm({ 
        title: "", 
        price: 0, 
        description: "", 
        colors: [], 
        storages: [], 
        guaranteed: 0, 
        ram: 0, 
        screenSize: 0, 
        battery: 0, 
        category: "", 
        stockQuantity: 0, 
        imagesUrl: [] 
      });
      setPreviews([]);
      navigate("/admin/products");
    } catch (err) {
      setMessage("Failed to add product.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Add New Product</h2>
      {message && <Alert variant="info" style={{ marginBottom: 10 }}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* ... all your form groups ... */}
        <Form.Group controlId="productTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productColors">
          <Form.Label>Colors (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="colors"
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productStorages">
          <Form.Label>Storages (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="storages"
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productGuaranteed">
          <Form.Label>Guaranteed (in months)</Form.Label>
          <Form.Control
            type="number"
            name="guaranteed"
            value={form.guaranteed}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productRAM">
          <Form.Label>RAM (in GB)</Form.Label>
          <Form.Control
            type="number"
            name="ram"
            value={form.ram}
            onChange={handleChange}
            min="2"
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productScreenSize">
          <Form.Label>Screen Size (in inch)</Form.Label>
          <Form.Control
            type="number"
            name="screenSize"
            value={form.screenSize}
            onChange={handleChange}
            min="1"
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productBattery">
          <Form.Label>Battery Capacity</Form.Label>
          <Form.Control
            type="number"
            name="battery"
            value={form.battery}
            onChange={handleChange}
            min="0"
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="productStock">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            name="stockQuantity"
            value={form.stockQuantity}
            onChange={handleChange}
            min="0"
            required
            style={{ marginBottom: 10 }}
          />
        </Form.Group>

        <Form.Group controlId="imageLink">
          <Form.Label>Add Image by Link</Form.Label>
          <Form.Control
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Button variant="secondary" onClick={handleAddImage} disabled={loading}>
            +
          </Button>
        </Form.Group>

        {previews.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            {previews.map((src, idx) => (
              <Image src={src} alt={`Preview ${idx}`} width={100} thumbnail key={idx} style={{ marginRight: 10, marginBottom: 10 }} />
            ))}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: 8 }}
              />
              Adding...
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
