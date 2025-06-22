import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="container-fluid bg-light py-5">
      <div className="container py-4">
        <div className="row align-items-center">
          {/* النص */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-4 fw-light">
              Big Summer <span className="fw-bold text-primary">Sale</span>
            </h1>
            <p className="text-muted mt-3">
              Commodo fames vitae vitae leo mauris in. Eu consequat.
            </p>
            <Link to="/products" className="btn btn-primary mt-3 px-4 py-2">
              Shop Now
            </Link>
          </div>

          {/* الصورة أو شكل جمالي */}
          <div className="col-md-6 text-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/044/637/679/non_2x/summer-sale-poster-or-banner-template-featuring-a-tropical-beach-scene-with-sun-and-party-elements-product-display-tropical-summer-scene-perfect-for-promoting-your-summer-products-on-blue-background-vector.jpg"
              alt="Sale Banner"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
