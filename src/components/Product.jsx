import { useEffect, useState } from "react";
import Instance from "../axiosInstance/Instance";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button, Form, Offcanvas } from "react-bootstrap";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Product = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    ram: 0,
    priceMin: "",
    priceMax: "",
  });

  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await Instance.get("/api/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await Instance.get("/api/products");
      setProducts(response.data.products);
      setFiltered(response.data.products);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await Instance.post("/api/categories", { name: newCategory.trim() });
      setShowModal(false);
      setNewCategory("");
      getCategories();
    } catch (error) {
      console.error("❌ Error adding category:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    let result = [...products];
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.ram) result = result.filter((p) => p.ram === filters.ram);
    if (filters.priceMin) result = result.filter((p) => p.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter((p) => p.price <= Number(filters.priceMax));
    setFiltered(result);
  }, [filters, products]);

  const handleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  const clearFilters = () => {
    setFilters({ category: "", ram: 0, priceMin: "", priceMax: "" });
  };

const deleteCategory = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This category will be deleted permanently!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await Instance.delete(`/api/categories/${id}`);
      toast.success("Category deleted successfully");
      getCategories();
    } catch (error) {
      console.error("❌ Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  }
};


const renderFilters = () => (
  <div className="card p-3 shadow-sm">
    <h5 className="mb-3">Filters</h5>

    {user?.role === "admin" && (
      <button className="btn btn-sm btn-success mt-2" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-circle"></i> Add Category
      </button>
    )}

    {/* Category */}
    <div className="mb-3">
      <label className="form-label fw-bold">Category</label>
      <div className="form-check">
        <input
          type="radio"
          name="category"
          className="form-check-input"
          checked={filters.category === ""}
          onChange={() => setFilters({ ...filters, category: "" })}
        />
        <label className="form-check-label">All</label>
      </div>

      {categories.map((cat) => (
        <div className="d-flex align-items-center" key={cat._id}>
          <div className="form-check flex-grow-1">
            <input
              type="radio"
              name="category"
              className="form-check-input"
              checked={filters.category === cat.name}
              onChange={() => setFilters({ ...filters, category: cat.name })}
            />
            <label className="form-check-label">{cat.name}</label>
          </div>
          {user?.role === "admin" && (
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => deleteCategory(cat._id)}
              title="Delete category"
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>
      ))}
    </div>

      {/* RAM */}
      <div className="mb-3">
        <label className="form-label fw-bold">RAM</label>
        {[8, 16, 32].map((r) => (
          <div className="form-check" key={r}>
            <input type="radio" name="ram" className="form-check-input"
              checked={filters.ram === r}
              onChange={() => setFilters({ ...filters, ram: r })} />
            <label className="form-check-label">{r} GB</label>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label fw-bold">Price</label>
        <div className="form-check">
          <input type="radio" name="price" className="form-check-input"
            onChange={() => setFilters({ ...filters, priceMin: 0, priceMax: 500 })} />
          <label className="form-check-label">Under $500</label>
        </div>
        <div className="form-check">
          <input type="radio" name="price" className="form-check-input"
            onChange={() => setFilters({ ...filters, priceMin: 500, priceMax: 1000 })} />
          <label className="form-check-label">$500 - $1000</label>
        </div>
        <div className="form-check">
          <input type="radio" name="price" className="form-check-input"
            onChange={() => setFilters({ ...filters, priceMin: 1000, priceMax: 100000 })} />
          <label className="form-check-label">$1000+</label>
        </div>
      </div>

      <button className="btn btn-sm btn-outline-secondary mt-2" onClick={clearFilters}>
        <i className="bi bi-x-circle"></i> Clear All
      </button>
    </div>
  );

  return (
    <div className="container-fluid">
      {/* Hamburger for mobile */}
      <div className="d-md-none text-end my-2">
        <Button variant="outline-primary" onClick={() => setShowFilters(true)}>
          <i className="bi bi-filter-left"></i> Filters
        </Button>
      </div>

      <div className="row mt-3">
        {/* Sidebar for Desktop */}
        <div className="d-none d-md-block col-md-3">{renderFilters()}</div>

        {/* Offcanvas for Mobile */}
        <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{renderFilters()}</Offcanvas.Body>
        </Offcanvas>

        {/* Products */}
        <div className="col-md-9">
          <div className="row">
            {filtered.map((p) => (
              <div className="col-lg-4 col-md-6 mb-4" key={p._id}>
                <div className="card h-100 shadow-sm product-card">
                  <img src={p.imagesUrl[0]} className="card-img-top" alt={p.title}
                    style={{ height: "250px", objectFit: "contain" }} />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title">{p.title}</h6>
                    <p className="text-muted small">{p.description.slice(0, 60)}...</p>
                    <h5 className="text-primary">${p.price.toFixed(2)}</h5>
                    <div className="d-flex justify-content-between mt-2">
                      <button className="btn btn-sm btn-warning text-white"
                        onClick={() => navigate(`/products/${p._id}`, { state: { name: p.title } })}>
                        <i className="bi bi-cart-plus"></i> Buy Now
                      </button>
                      <button className="btn btn-sm btn-outline-danger"
                        onClick={() => handleWishlist(p)}
                        title={isInWishlist(p._id) ? "Added to wishlist" : "Add to wishlist"}>
                        {isInWishlist(p._id) ? <HeartFill /> : <Heart />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-center mt-4">No products found.</p>}
          </div>
        </div>
      </div>

      {/* Modal for Add Category */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={addCategory}>Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />

    </div>
  );
};

export default Product;
