import Home from "../components/Home";
import Show from "../components/Show";
import Products from "../components/Products";
import Banner from "../components/Banner";
export const HomePage = () => {
  return (
    <div className='homePage'>
        <Home/>
        <Show/>
        <Products/>
        <Banner/>
    </div>
  )
}
export default HomePage;