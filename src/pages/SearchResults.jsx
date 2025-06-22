import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "../axiosInstance/Instance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/search?q=${query}`);
        setResults(response.data.products);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Search Results for "<span className="text-primary">{query}</span>"
      </h2>

      {loading ? (
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <Skeleton height={250} />
                <div className="card-body">
                  <h5 className="card-title">
                    <Skeleton width={`80%`} />
                  </h5>
                  <p>
                    <Skeleton count={2} />
                  </p>
                  <h6>
                    <Skeleton width={60} />
                  </h6>
                  <Skeleton width={100} height={36} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="row">
          {results.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imagesUrl[0]}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="text-muted small">
                    {product.description?.slice(0, 60)}...
                  </p>
                  <h6 className="text-primary">${product.price.toFixed(2)}</h6>
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-dark mt-2"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
