import { Facebook, Instagram, Tiktok, Twitter } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="footer-dark text-white py-5">
      <div className="container">
        <div className="row text-start">
          {/* Left Section */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-4">cyber</h5>
            <p style={{color: "#CFCFCF", fontWeight: "200"}} className="small">
              We are a residential interior design firm located in Portland. Our boutique-studio offers more than
            </p>
            <div className="d-flex gap-3 mt-3">
              <i className="bi bi-twitter fs-5"></i>
              <i className="bi bi-facebook fs-5"></i>
              <i className="bi bi-tiktok fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
            </div>
          </div>

          {/* Middle Section */}
          <div className="col-md-4 mb-4">
            <h6 className=" mb-4">Services</h6>
            <ul style={{color: "#CFCFCF", fontWeight: "200"}} className="list-unstyled small">
              <li>Bonus program</li>
              <li>Gift cards</li>
              <li>Credit card payment</li>
              <li>Service contracts</li>
              <li>Non-cash account</li>
              <li>Payment</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="col-md-4 mb-4">
            <h6 className=" mb-4">Assistance to the buyer</h6>
            <ul style={{color: "#CFCFCF", fontWeight: "200"}} className="list-unstyled small">
              <li>First order</li>
              <li>Terms of delivery</li>
              <li>Exchange and return of goods</li>
              <li>Guarantee</li>
              <li>Frequently asked questions</li>
              <li>Terms of use of the site</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <Twitter size={24} className="me-3" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <Facebook size={24} className="me-3" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="me-3">
                <Tiktok size={24} className="me-3" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
            </a>
          </div>
        <div className="text-center mt-2">
          <p className="mb-0" style={{color: "#CFCFCF", fontWeight: "200"}}>
            Made with ❤️ by <a href="https://www.facebook.com/moaz.programmer/" target="_blank" rel="noopener noreferrer" style={{color: "#CFCFCF", textDecoration: "underline"}}>Moaz ALi</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
