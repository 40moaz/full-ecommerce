import Iphone from "../assets/Iphone Image.png";
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <section className="home">
      <div className="content">
        <h4 className="fs-6 text-secondary">Pro.Beyond.</h4>
        <h1 style={{ fontSize: "60px", fontWeight: "300" }}>
          IPhone 14 <span className="fw-bold">Pro</span>
        </h1>
        <p className="text-secondary">
          Created to change everything for the better. For everyone
        </p>
        <Link to="/products" className="btn btn-light">
          Shop Now
        </Link>
      </div>
      <div className="img">
        <img src={Iphone} width={314} alt="Iphone Image" />
      </div>
    </section>
  );
};
export default Home;
