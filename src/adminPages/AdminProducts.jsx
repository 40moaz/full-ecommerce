import React, { useEffect, useState } from "react";
import "../styles/AdminProducts.css"; // Create this file for custom styles
import instance from "../axiosInstance/Instance";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/api/products");
        console.log("Products fetched successfully:", response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    try {
      const response = instance.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      console.log("Product deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-products-container">
      <header className="headerp">
        <h1>Admin Products</h1>
        <Link to={"/admin/products/add"} className="add-btn">+ Add Product</Link>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found.</div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imagesUrl[0]} alt={product.title} />
              <div className="product-info">
                <h2><Link to={`/products/${product._id}`} className="text-decoration-underline"> {product.title}</Link></h2>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="stock">
                  Stock: <span>{product.stockQuantity}</span>
                </p>
              </div>
              <div className="actions">
                <Link className="edit-btn" to={`/admin/products/edit/${product._id}`}>Edit</Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
