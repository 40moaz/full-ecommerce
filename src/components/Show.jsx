import { Link } from "react-router-dom";
import Xiaomi14Pro from "../assets/Xiaomi 14 Pro.png";
import SamsungGalaxyS24Ultra from "../assets/Samsung Galaxy S24 Ultra.png";
import OnePlus12 from "../assets/OnePlus12.png";
import "../styles/Show.css";
export const Show = () => {
  return (
    <section className="show d-flex justify-content-cente flex-wrap">
        <div className="left">
            <div className="xiaomi d-flex justify-content-between align-items-center flex-wrap">
                <div className="img">
                    <img src={Xiaomi14Pro} style={{marginLeft: "50px", marginBottom: "30px"}} alt="Xiaomi 14 Pro Image" width={100} />
                </div>
                <div className="content">
                    <h3 className="fw-bold fs-2">Xiaomi 14 Pro</h3>
                    <p className="text-secondary" style={{fontSize: "14px"}}>Compact powerhouse with Leica camera system and<br/> blazing-fast charging.</p>
                </div>
            </div>
            <div className="samsung d-flex justify-content-between align-items-center flex-wrap">
                <div className="img">
                    <img src={SamsungGalaxyS24Ultra} style={{marginLeft: "50px", marginBottom: "30px"}} alt="Samsung Galaxy s24 ultra Image" width={120} />
                </div>
                <div className="content">
                    <h3 style={{fontWeight: '300'}} className="fs-2">Samsung Galaxy <span className="fw-bold">S24 Ultra</span></h3>
                    <p className="text-secondary" style={{fontSize: "14px"}}>Flagship performance with Snapdragon 8 Gen 3, 200MP camera, and <br/>AI-enhanced features.</p>
                </div>
            </div>
        </div>
        <div className="right d-flex justify-content-between align-items-center flex-wrap">
            <div className="content">
                <h2 style={{fontWeight: "300", fontSize: "50px"}}>OnePlus <span className="fw-bold">12</span></h2>
                <p className="text-secondary">Flagship killer with smooth OxygenOS and<br/> top-tier performance.</p>
                <Link to={'/products'} className="btn btn-dark">Shop Now</Link>
            </div>
            <div className="img">
                <img src={OnePlus12} alt="MacBook Pro 14" width={270} />
            </div>
        </div>
    </section>
  )
}
export default Show;