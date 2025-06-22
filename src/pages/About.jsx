import "../styles/About.css";
import aboutImg from "../assets/aboutImg.png";
import { Link } from "react-router-dom";
import FreeDelivery from "../assets/feature-1-free-delivery.png";
import Cashback from "../assets/feature-2-cashback.png";
import Quality from "../assets/features-3-premium-quality.png";
import HoursSupport from "../assets/features-4-24-hours-support.png";

const About = () => (
  <div className="about-classic">
    <header className="about-header">
      <h1>About Us</h1>
    </header>
    <section className="about-main">
      <div className="about-img-wrapper">
        <img src={aboutImg} alt="About" className="about-img" />
      </div>
      <div className="about-content">
        <h2>Know About Our Ecommerce Business, History</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.
        </p>
        <Link to="/contact">
          <button className="classic-btn">Contact Us</button>
        </Link>
      </div>
    </section>
    <section className="about-features">
      <h2>Our Features</h2>
      <div className="features-list">
        <div className="feature-card">
          <img src={FreeDelivery} alt="Free Delivery" />
          <h4>Free Delivery</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto debitis fuga perspiciatis.</p>
        </div>
        <div className="feature-card">
          <img src={Cashback} alt="Cashback" />
          <h4>100% Cash Back</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto debitis fuga perspiciatis.</p>
        </div>
        <div className="feature-card">
          <img src={Quality} alt="Quality" />
          <h4>Quality Product</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto debitis fuga perspiciatis.</p>
        </div>
        <div className="feature-card">
          <img src={HoursSupport} alt="24 Hours Support" />
          <h4>24/7 Support</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto debitis fuga perspiciatis.</p>
        </div>
      </div>
    </section>
  </div>
);

export default About;
