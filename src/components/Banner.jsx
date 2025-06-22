import { Link } from "react-router-dom"

const Banner = () => {
  return (
    <div className='banner'>
        <div className='banner-content'>
            <h1 style={{fontWeight: "200", fontSize: "60px"}}>Big Summer <span style={{fontWeight: "500"}}>Sale</span></h1>
            <p style={{color: "#787878", fontSize: "15px"}}>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
            <Link className='btn btn-primary' to={"/products"}>Shop Now</Link>
        </div>
    </div>
  )
}

export default Banner