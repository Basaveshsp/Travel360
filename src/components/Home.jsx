import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Home = () => {
    return ( 
        <div className="home-box">
            <Navbar/>
            <Dashboard/>
            <Footer/>
        </div>
     );
}
 
export default Home;