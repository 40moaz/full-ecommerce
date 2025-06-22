import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axiosInstance/Instance";
import { BatteryCharging, CpuFill, Heart, HeartFill, PhoneFill } from "react-bootstrap-icons";
import "../styles/ProductDetails.css"; // Assuming you have a CSS file for styling
import Review from "../components/Review";

const ProductDetails = ({ userId }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartError, setCartError] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    // Initialize wishlist from localStorage
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    async function getProductById(id) {
      try {
        const response = await instance.get(`/api/products/${id}`);
        setProduct(response.data.product);
        setSelectedImage(response.data.product.imagesUrl[0]);
      } catch (error) {
        console.error(error);
      }
    }
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  // عند التحويل للتخزين في LocalStorage
  const handleAddToCart = () => {
  
    if (!selectedColor || !selectedStorage) {
      setCartError("Please select color and storage.");
      return;
    }
    setCartError("");

    // بيانات المنتج الي هتتخزن في LocalStorage
    const item = {
      productId: product._id,
      color: selectedColor,
      storage: selectedStorage,
      ram: product.ram,
      quantity,
      price: product.price,
      title: product.title,
      image: product.imagesUrl[0],
    };
    console.log(item)
    // جيب المنتجات الحالية في LocalStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // اذا كان المنتجات متكرّر
    const existingIndex = existingCart.findIndex(
      (item) => item.productId === product._id
    );

    if (existingIndex !== -1) {
      // اذا كان فيه بالفعل هذا المنتج في الكارت
      existingCart[existingIndex].quantity += quantity;
    } else {
      // اذا كان مش موجود
      existingCart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    console.log("Product added to localStorage!", item);
    // ممكن تنتقل للعربة اذا أردت
    navigate("/cart");
  };
  useEffect(() => {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);
  const handleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };
  const isInWishlist = (id) => wishlist.some((item) => item._id === id);

  return (
    <div className="productDetails">
      <div className="container">
        <div className="product">
          <div className="imgs">
            <div className="imgsbanner">
              {Array.isArray(product.imagesUrl) &&
                product.imagesUrl.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Product Thumbnail"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Product Image"
                className="main-img"
              />
            )}
          </div>

          <div className="content">
            <h1>{product.title}</h1>
            <h2 style={{ fontWeight: "400", marginBottom: "30px" }}>
              ${product.price}{" "}
              <sub style={{ fontWeight: "200" }}>
                <del>${product.price * 1.2}</del>
              </sub>
            </h2>

            {/* Colors */}
            <div className="color">
              <span>Select color:</span>
              {Array.isArray(product.colors) &&
                product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-item ${
                      selectedColor === color ? "active" : ""
                    }`}
                    style={{ background: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
            </div>

            {/* Storage */}
            <div className="storage">
              {Array.isArray(product.storages) &&
                product.storages.map((storage, index) => (
                  <div
                    key={index}
                    className={`storage-item ${
                      selectedStorage === storage ? "active" : ""
                    }`}
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage}
                  </div>
                ))}
            </div>

            {/* Specs */}
            <div className="specs">
              <ul>
                <div className="phone-details gap-3 d-flex flex-wrap align-items-center">
                  <li>
                    <PhoneFill /> Screen Size
                    <br />
                    <span style={{ color: "#000" }}>{product.screenSize}"</span>
                  </li>
                  <li>
                    <CpuFill /> RAM
                    <br />
                    <span style={{ color: "#000" }}>{product.ram} GB</span>
                  </li>
                  <li>
                    <BatteryCharging /> Battery
                    <br />
                    <span style={{ color: "#000" }}>{product.battery} mAh</span>
                  </li>
                </div>
                <p>{product.description}</p>
              </ul>
            </div>

            {/* Quantity controls */}
            <div className="quantity-controls d-flex align-items-center gap-2 mb-5">
              <button
                className="btn btn-secondary"
                disabled={quantity <= 1}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                -
              </button>
              <input
                className="form-control"
                type="number"
                value={quantity}
                readOnly
                min={1}
                max={product.stockQuantity}
                style={{ width: 100, textAlign: "center" }}
              />
              <button
                className="btn btn-secondary"
                disabled={quantity >= product.stockQuantity}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Actions */}
            {cartError && (
              <span className="error-message" style={{ color: "red" }}>
                {cartError}
              </span>
            )}
            <div className="actions">
              <button
                className="btn btn-secondary"
                onClick={() => handleWishlist(product)}
              >
                {isInWishlist(product._id)
                  ? "Added to wishlist"
                  : "Add to wishlist"}
                  {" "}
                {isInWishlist(product._id) ? <HeartFill /> : <Heart />}
              </button>
              <button onClick={handleAddToCart} className="btn btn-dark">
                Add to Cart
              </button>
            </div>
            <div className="phone-details gap-3 d-flex flex-wrap align-items-center">
              <div>
                {product.stockQuantity === 0 ? (
                  "Out of stock"
                ) : (
                  <span style={{ color: "green" }}>
                    {product.stockQuantity} in stock
                  </span>
                )}
              </div>
              <div>{product.brand}</div>
              <div>
                {product.guaranteed === 0
                  ? "No warranty"
                  : product.guaranteed === 1
                  ? "1 year warranty"
                  : `${product.guaranteed} years warranty`}
              </div>
            </div>
          </div>
        </div>
        <div className="product-reviews">
          <h2>Reviews</h2>
          <AddReview
            userId={userId}
            productId={productId}
            onReviewAdded={(review) => {
              setProduct((prev) => ({
                ...prev,
                reviews: [...(prev.reviews || []), review],
              }));
            }}
          />
          <div className="reviews">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <Review key={index} review={review} userId={review.userId} />
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// AddReview component (inline for simplicity)
function AddReview({ productId, onReviewAdded, userId }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // قم بإرسال الريفيو مع اليوزر
      const res = await instance.post(`/api/products/${productId}/add-review`, {
        userId,
        content,
      });

      console.log("Review added response.", res.data);

      if (res.data && res.data.review) {
        // أضف الريفيو للتخزين دون reload
        onReviewAdded(res.data.review);
        setContent("");
      } else if (res.data && res.data.product) {
        // كبديل اذا لم يتم إرجاع الريفيو مباشرة
        // قم بأخذ آخر مراجعة
        const reviews = res.data.product.reviews;
        const newReview = reviews[reviews.length - 1];
        onReviewAdded(newReview);
        setContent("");
      }
    } catch (err) {
      setError("Failed to add review.");
      console.error("Error adding review.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="add-review-form"
      onSubmit={handleSubmit}
      style={{ marginBottom: 24 }}
    >
      <div style={{ display: "flex", gap: 2, alignItems: "stretch" }}>
        <input
          className="form-control"
          placeholder="Write your review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          style={{
            width: "100%",
            borderRadius: 8,
            padding: 10,
            border: "1px solid #ccc",
            height: 44,
            marginBottom: 0,
          }}
        />
        <button
          type="submit"
          className="btn btn-dark"
          disabled={loading}
          hidden={loading || !content.trim()}
          style={{
            minWidth: 120,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? "Submitting…" : "Add Review"}
        </button>
      </div>
      {error && <span style={{ color: "#c00", fontSize: 14 }}>{error}</span>}
    </form>
  );
}

export default ProductDetails;
