import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import ToasterUi from 'toaster-ui';
import HashLoader from "react-spinners/HashLoader";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },    
  };
const Busdetails = () => {
    let[busdetail ,setBusdetail]=useState(null)
    let[userdetails,setUserdetails]=useState({})
    
    let[seats,setSeats]=useState(1)
    let[bookingdate,setBookingdate]=useState("")
    let {busid} =  useParams();
    let navigate =useNavigate()
    let[loading,setloading]=useState(true)
    const toaster = new ToasterUi();
     useEffect(()=>{
      
      setTimeout(() => {
        fetch("http://localhost:4000/bus/"+busid)
        .then((res)=>{ return res.json() })
        .then((data)=>{
                setBusdetail(data);
                setloading(false)
        })
      }, 3000);
        let data =JSON.parse(localStorage.getItem("userdetails"))
        setUserdetails(data)

        let date =JSON.parse(localStorage.getItem("bookingdate"))
        setBookingdate(date)
   } , [])
   let subtitle;
   const [modalIsOpen, setIsOpen] = useState(false);
 
   function openModal() {
     setIsOpen(true);
   }
 
   function afterOpenModal() {
     // references are now sync'd and can be accessed.
     subtitle.style.color = '#f00';
   }
 
   function closeModal() {
     setIsOpen(false);
   }
        // 1) add ticket obj to active_booking key in user obj  [PUT]
 
   let handlebookticket=()=>{
    let ticket ={
                  busname: busdetail.busname ,
                  busnumber:busdetail.busnumber,
                  seats: seats ,
                  from: busdetail.from ,
                  to:busdetail.to,
                  start:busdetail.start,
                  end:busdetail.end,
                  journey_time: busdetail.journey_time,
                  price:busdetail.price * seats,
                  date: bookingdate 
    }
    let updatedData={
                      ...userdetails,
                      active_booking:[...userdetails.active_booking,ticket]
    }
    let config={
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(updatedData)
    }

    fetch("http://localhost:5000/users/5",config)
    
   

// 2) increament the booked_seats value to prv + booked seats of current user [PUT]
 let updatedBusdata={...busdetail,booked_seats:Number(busdetail.booked_seats)+Number(seats)}
   
 let busConfig = {
                  method : "PUT",
                  headers : {"Content-Type":"application/json"},
                  body : JSON.stringify( updatedBusdata )
                }

  fetch("http://localhost:4000/bus/"+busid , busConfig)
  .then(()=>{
    toaster.addToast("Ticket Confirmed");
      closeModal();
      navigate("/profile")
  })
   }

 
    return ( 
        <div >
            <Navbar/>
            
              {loading &&<HashLoader color="#36d7b7" />}
            {busdetail &&
                <div className="details">
                    <div >
                        <h1>Journey from <span>{busdetail.from}</span> to <span>{busdetail.to}</span></h1>
                        <div className="bus-description">
                            <span >{busdetail.busname}--{busdetail.type}</span><br />
                            
                            <span>{busdetail.busnumber}</span>
                     </div>
                    <div className="journey-description">
                        <h2>DATE</h2>
                        <div>
                            <h1>{busdetail.start} - {busdetail.end}</h1>
                            <h1>{busdetail.from} - {busdetail.to}</h1>
                        </div>
                        <p>{busdetail.journey_time}</p>
                    </div>
                    <div className="ticket-description">
                        <label>Passengers</label>  <input type="number" placeholder="Number of seats" min="1" max={busdetail.seats-busdetail.book_seats}  />
                        <label>Total Price</label> <input type="text" value={busdetail.price * 1} readOnly />
                        <button onClick={openModal} >Book Ticket</button>
                    </div>
                    </div>
                    <div className="seat-selection">

                    </div>
                    {busdetail &&<Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal" >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Passenger Name :{userdetails.username}</h2>
                    <p>{userdetails.phone}</p>
                    <p>{busdetail.busname}-{busdetail.busnumber}</p>
                    <p>Date :{bookingdate}</p>
                    <p>{busdetail.from}-{busdetail.start}-to-{busdetail.to}-{busdetail.end}</p>
                    <button onClick={handlebookticket}>Pay</button>
                  
                     </Modal>}
                </div>
            }
            
        </div>
     );
}
 
export default Busdetails;