import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Bookbus = () => {
  let date = useRef();

    let[from , setFrom] = useState("");
    let[to , setTo] = useState("");


    let[searchedBus , setSearchedBus] = useState(null);
    let[boardings , setboardings] = useState(null);
    let[destinations , setdestinations] = useState(null);



    useEffect(()=>{
        fetch("http://localhost:4000/bus")
       
          
        //   fetch("http://localhost:8080/getallbuses")
        .then((res)=>{return res.json()})
        .then((data)=>{
          let bp = [];
          let boardingPoints = data.map((bus)=>{ return bus.from });
          boardingPoints.forEach((val)=>{
                if(!bp.includes(val))
                {
                    bp.push(val)
                }
          })

          let dp = [];
          let destinationPoints = data.map((bus)=>{ return bus.to });
          destinationPoints.forEach((val)=>{
                if(!dp.includes(val))
                {
                    dp.push(val)
                }
          })
          setboardings(bp);
          setdestinations(dp);
        })

    } , [])

    let handleSearchBuses = (e)=>{
        e.preventDefault();

        fetch("http://localhost:4000/bus")
        // fetch("http://localhost:8080/getallbuses")
        .then((res)=>{return res.json()})
        .then((allBus)=>{
           let filteredBus =  allBus.filter((bus)=>{ 
                            return (bus.from.includes(from)) &&
                                   (bus.to.includes(to)) 
                        });

            console.log(filteredBus);
            setSearchedBus(filteredBus);
            localStorage.setItem("bookingdate",JSON.stringify(date.current.value))
        })
    }
    return ( 
       <div className="book-bus">
         <Navbar/>
            <div className="inputs">
                <h1>Search for the destination</h1>
                <form onSubmit={handleSearchBuses}>

                    <input type="text" placeholder="From" required value={from} onChange={(e)=>{ setFrom(e.target.value) }} />
                    
                    {boardings &&
                    <div className="boarding-points">
                        {
                            boardings.map((start )=>{ return(
                                <> {start.includes(from) &&  <span key={start} onClick={()=>{setFrom(start)}}>{start}</span>} </>
                            ) })
                        }
                    </div>}

                    <input type="text" placeholder="to" required value={to}  onChange={(e)=>{ setTo(e.target.value) }}/>
                    
                    {destinations &&
                    <div className="destination-points">
                        {
                            destinations.map((end)=>{ return(
                                <>{end.includes(to) &&  <span  key={end} onClick={()=>{setTo(end)}}>{end}</span>}</>
                            ) })
                        }
                    </div>}
                    <input type="date" required ref={date}/>
                    <input type="submit" value="Search bus"/>
                </form>
            </div>


            {searchedBus && <div className="bus-list">
                            <h3>Journey from {from} to {to} </h3>

                            {searchedBus.length>0 ? <table cellSpacing="20px">
                                <thead>
                                    <tr>
                                        <th>Bus</th>
                                        <th>Available</th>
                                        <th>Departure</th>
                                        <th>Araival</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody >
                                {
                                    searchedBus.map((bus)=>{
                                        return(<tr>
                                                    <td>{bus.busname}</td>
                                                    <td> 
                                                        <span>{bus.seats - bus.booked_seats} / </span>
                                                        <span>{bus.seats}</span> 
                                                    </td>
                                                    <td>
                                                        <span> {date.current.value} </span>
                                                        <span> {bus.start} </span>
                                                    </td>
                                                    <td>
                                                        <span> {date.current.value} </span>
                                                        <span> {bus.end} </span>
                                                    </td>
                                                    <td>
                                                        <span>{bus.journey_time}hrs</span>
                                                        <Link to={`/busdetail/${bus.id}`}><button>Book ticket</button></Link>
                                                    </td>
                                                </tr>)
                                    })
                                }
                                </tbody>
                                                    </table> 
                                                    :
                                                    <h1 className="error-message">Sorry user no buses for that location !!!! </h1>
                                                    }
                            </div>}


       
       </div>
     );
}
 
export default Bookbus;