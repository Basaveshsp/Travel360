import Footer from "./Footer";
import Navbar from "./Navbar";
import Profiledetails from "./Profiledetails";

const Profile = () => {
    return ( 
        <div className="profile-box">
        <Navbar/>
        <Profiledetails/>
        <Footer/>
        </div>
     );
}
 
export default Profile;