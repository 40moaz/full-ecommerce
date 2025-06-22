import React, { useEffect, useRef, useState } from "react";
import instance from "../axiosInstance/Instance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  ListGroup,
  InputGroup,
} from "react-bootstrap";

const EditProduct = () => {
  const navigate = useNavigate();
  function onSave(editedProduct) {
      navigate("/admin/products");
    console.log(editedProduct);
  }
  function onCancel() {
    navigate("/admin/products");
  }
  const { productId } = useParams();

  const [product, setProduct] = useState({
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
    imagesUrl: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await instance.get(`/api/products/${productId}`);
        if (res.status !== 200) throw new Error("Failed to fetch product");

        const product = res.data.product;
        console.log(product);

        setProduct({
          title: product.title,
          price: product.price,
          description: product.description,
          colors: product.colors,
          storages: product.storages,
          guaranteed: product.guaranteed,
          ram: product.ram,
          screenSize: product.screenSize,
          battery: product.battery,
          category: product.category,
          stockQuantity: product.stockQuantity,
          imagesUrl: product.imagesUrl,
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "colors" || name === "storages") {
      setProduct((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else if (
      name === "price" ||
      name === "guaranteed" ||
      name === "ram" ||
      name === "screenSize" ||
      name === "battery" ||
      name === "stockQuantity"
    ) {
      setProduct((prev) => ({
        ...prev,
        [name]: parseInt(value, 10),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const imageRef = useRef(null);

  const handleAddImage = (e) => {
    e.preventDefault();
    const url = imageRef.current.value.trim();

    if (url) {
      setProduct((prev) => ({
        ...prev,
        imagesUrl: [...prev.imagesUrl, url],
      }));

      imageRef.current.value = ""; // تفريغ الخانة بعد الاضافة
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    try {
      const res = await instance.put(`/api/products/${productId}`, product);

      if (res.status !== 200) {
        throw new Error("Failed to update product.");
      }

      if (onSave) onSave(product);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="mb-4">Edit Product</h2>

          {loading && (
            <div className="mb-3">
              <Spinner animation="border" size="sm" /> Loading...
            </div>
          )}

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={product.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="colors">
              <Form.Label>Colors (comma-separated)</Form.Label>
              <Form.Control
                name="colors"
                value={product.colors}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="storages">
              <Form.Label>Storages (comma-separated)</Form.Label>
              <Form.Control
                name="storages"
                value={product.storages}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="guaranteed">
              <Form.Label>Guaranteed (in months)</Form.Label>
              <Form.Control
                name="guaranteed"
                type="number"
                value={product.guaranteed}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ram">
              <Form.Label>RAM (in GB)</Form.Label>
              <Form.Control
                name="ram"
                type="number"
                value={product.ram}
                onChange={handleChange}
                min="2"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="screenSize">
              <Form.Label>Screen Size (in inch)</Form.Label>
              <Form.Control
                name="screenSize"
                type="number"
                value={product.screenSize}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="battery">
              <Form.Label>Battery Capacity</Form.Label>
              <Form.Control
                name="battery"
                type="number"
                value={product.battery}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                name="stockQuantity"
                type="number"
                value={product.stockQuantity}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Add Image by URL</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <InputGroup>
                  <Form.Control
                    name="image"
                    type="url"
                    ref={imageRef}
                    placeholder="Enter image URL…"
                  />
                  <Button
                    onClick={handleAddImage}
                    type="submit"
                    variant="secondary"
                  >
                    Add Image
                  </Button>
                </InputGroup>
              </div>

              <div className="d-flex">
                {product.imagesUrl?.map((img, idx) => (
                  <div key={idx} className="m-2 position-relative">
                    <img src={img} width={70} alt="Product Image" />

                    {/* زر الحذف */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={() => {
                        setProduct((prev) => ({
                          ...prev,
                          imagesUrl: prev.imagesUrl.filter((_, i) => i !== idx),
                        }));
                      }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary" disabled={loading}>
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
                className="ms-2"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
