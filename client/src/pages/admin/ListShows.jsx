import React, { useState, useEffect } from 'react';
import { dummyShowsData } from '../../assets/assets'; 
import Title from '../../components/admin/title'; 
import Loading from '../../components/Loading'; 
// 🟢 NEW IMPORT: dateFormat for formatting the time
import { dateFormat } from '../../lib/dateFormat'; 

const ListShows = () => {
  
  const currency = import.meta.env.VITE_CURRENCY

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      // Dummy data setup (loads a single show)
      setShows([{
        movie: dummyShowsData[0],
        showDateTime: "2025-06-30T02:30:00.000Z",
        showPrice: 59,
        occupiedSeats: {
          A1: "user_1",
          B1: "user_2",
          C1: "user_3"
        }
      }]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); 
    }
  }
  
  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      <Title text1="List" text2=" Shows" /> 

      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 font-medium pl-5">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
          
          {/* 🟢 NEW CODE ADDED BELOW: Table Body with Mapped Rows */}
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                
                {/* Movie Name */}
                <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
                
                {/* Show Time */}
                <td className="p-2">{dateFormat(show.showDateTime)}</td>
                
                {/* Total Bookings (Count of occupiedSeats) */}
                <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
                
                {/* Earnings (Bookings * Price) */}
                <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                
              </tr>
            ))}
          </tbody>
          {/* End of new code */}
        </table>
      </div>
    </>
  ) : <Loading />;
}

export default ListShows;