const Profiledetails = () => {
    return (
        <div className="profiledetails-box">
            <div className="userimagedetails">
                <div className="userimage">
                    <img src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTgLdqvzx6hNct7T-YALrAJouJPzTxvItVaIDGSdES_FulCApg_670DJXk0MmtFs6X6x1b6iCzWuNtNGCs" alt="image no found" />
                </div>
                <div className="userdetails">
                    <span>Name :</span> <span>Narendra Modi</span><br />
                    <span>Email :</span><span>narendramodi@gmail.com</span><br />
                    <span>Phone no :</span><span>7022561023</span><br />
                    <button>Logout</button>
                    <button>Delete Account</button>
                </div>
            </div>
            <div className="bookingsdetails">
                <button >Active Tasks</button>
                <button>Previous Bookings</button>
                <button>Help Desk</button>
            </div>
        </div>
      );
}
 
export default Profiledetails;