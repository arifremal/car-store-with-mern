import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import BookingRow from "./BookingRow";


const Bookings = () => {
    const {user}= useContext(AuthContext)
    const [bookings,setBookings] = useState([])
    const url = `http://localhost:5000/bookings?email=${user?.email}`
    useEffect(()=>{
        fetch(url)
        .then(res=> res.json())
        .then(data=> setBookings(data))
    },[url])
    const handleDelete = id =>{
        const procced = confirm('sure')
        if(procced){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:'DELETE'
            })
            .then(res=> res.json())
            .then( data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('deleted')
                    const remaining = bookings.filter(booking=> booking._id !== id)
                    setBookings(remaining)
                }
            })
    
        }
      }
      const handleConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify({status:'confirm'})

        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if (data.modifiedCount>0){
            const remaining = bookings.filter(booking=> booking._id !== id)
            const update = bookings.find(booking=> booking._id !== id)
            update.status='confirm'
            const newBookings = [update, ...remaining]
            setBookings(newBookings)
          }
        })
      
      }
    return (
        <div>
            <h2 className="text-center" >Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Email</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     
     {
        bookings.map(booking=><BookingRow key={booking._id}
            booking={booking} handleDelete={handleDelete}handleConfirm={handleConfirm} ></BookingRow>)
     }
      
    
    </tbody>
   
  
  </table>
</div>
        </div>
    );
};

export default Bookings;