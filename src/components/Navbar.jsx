import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar-box">
            <div className="logo">
             {/* <Link to="/"><img src="https://e7.pngegg.com/pngimages/175/280/png-clipart-package-tour-travel-agent-bus-airline-ticket-dubai-travels-agency-freight-transport-service.png" alt="img not found" /></Link> */}
             <Link to="/"><img src="https://freepngimg.com/save/18969-travel-insurance-png-picture/294x249" alt="img not found" /></Link>
             <Link to="/"><img src="https://lh3.googleusercontent.com/B9OyywH2XvQx46tA2vyoawodLQThVyZNs71jSmxOA9gnvFG15Ka4syGBAIlBCzJXlokRI7KaVt1yJg2ZJT-ciMCJ4NbmAymJsttL-59tJQ" alt="img not found" /></Link>
                
            </div>
            <div className="bus-flight">
               <Link to="/searchbuses"> <span>Bus</span></Link>
              <Link to="/">  <span>Flight</span></Link>
            </div>
            <div className="active-profile">
                <Link to="/"><span>Active</span></Link>
               <Link to="/profile"> <span>Profile</span></Link>
            </div>
        </div>
    );
}

export default Navbar;