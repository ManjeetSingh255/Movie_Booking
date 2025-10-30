import React, { useState, useEffect } from 'react';
import { dummyBookingData } from '../../assets/assets'; 
import Loading from '../../components/Loading'; 

// Assuming the necessary utilities are imported
import { dateFormat } from '../../lib/dateFormat'; 
import Title from '../../components/admin/title';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    // Simulating API call delay and success
    setBookings(dummyBookingData)
    setIsLoading(false);
  };
  
  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <>
      <Title text1="List" text2=" Bookings" />
      
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Seats</th>
              <th className="p-2 font-medium">Amount</th>
            </tr>
          </thead>
          
          {/* 🟢 NEW CODE ADDED BELOW: Table Body with Mapped Rows */}
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10">
                
                {/* User Name */}
                <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
                
                {/* Movie Name */}
                <td className="p-2">{item.show.movie.title}</td>
                
                {/* Show Time */}
                <td className="p-2">{dateFormat(item.show.showDateTime)}</td>
                
                {/* Seats (CORRECTED LOGIC: joins the bookedSeats array) */}
                <td className="p-2">{item.bookedSeats.join(", ")}</td>
                
                {/* Amount */}
                <td className="p-2">{currency} {item.amount}</td>
                
              </tr>
            ))}
          </tbody>
          {/* End of new code */}
        </table>
      </div>
    </>
  ) : <Loading />;
};

export default ListBookings;