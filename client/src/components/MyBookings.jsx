// import React, { useState } from 'react'
// import { dummyBookingData } from '../assets/assets'
// import { useEffect } from 'react'
// import Loading from './Loading'
// import BlurCircle from './BlurCircle'
// import timeFormat from '../lib/timeFormat'
// import { dateFormat } from '../lib/dateFormat'
// import { UserButton } from '@clerk/clerk-react'
// const MyBookings = () => {
//     const currency = import.meta.env.VITE_CURRENCY
//     const [bookings, setBookings] = useState([])
//     const [isLoading, setIsLoading] = useState(true)
//     const getMyBookings = async() =>{
//         setBookings(dummyBookingData)
//         setIsLoading(false)
//     }
//     useEffect(()=>{
//             getMyBookings()
//     },[])
//   return  !isLoading ?(
//     <div className = 'relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
//       <BlurCircle top = '100px' left ='100px'/>
//       <div>
//         <BlurCircle bottom = '0px' left ='600px'/>
//       </div>
//       <h1 className='text-lg font-semi-bold mb-4'>My Bookings</h1>
//       {bookings.map((item,index)=>(
//         <div key ={index} className = 'flex flex-col md:flex:row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'  >
//               <div classNmae= 'flex flex-col md:flex-row' >
//                  <img src={item.show.movie.poster_path} alt=" " className= 'md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
//                  <div className= 'flex flex-col p-4'>
//                     <p className = 'text-lg font-semibold'>{item.show.movie.title}</p>
//                     <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runTime)}</p>
//                     <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.movie.showDateTime)}</p>

//                  </div>
//               </div>

//              <div className ='flex flex-col md:items-end md:text-right justify-between p-4' >
//               <div className='flex items-center gap-4'>
//                 <p className='text-2xl font-semibold mb-3'>{currency }{item.amount}</p>
//                 {!item.isPaid && <button className ='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
//               </div>
//               <div className='text-sm'>
//                <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length }</p>
//                <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ") }</p>

//               </div>
//              </div>


//           </div>
//       ) )}
//     </div>
//   ) :<Loading/>
// }

// export default MyBookings

import React, { useState, useEffect, useCallback } from 'react' // 🟢 Added useCallback
import { dummyBookingData } from '../assets/assets'
import Loading from './Loading'
import BlurCircle from './BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { UserButton } from '@clerk/clerk-react'

const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // 🟢 Added useCallback for stability and to clear ESLint warnings
    const getMyBookings = useCallback(async () => {
        setBookings(dummyBookingData)
        setIsLoading(false)
    }, [])
    
    // 🟢 Added dependency to useEffect
    useEffect(() => {
        getMyBookings()
    }, [getMyBookings])

    return !isLoading ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='100px'/>
            <div>
                <BlurCircle bottom='0px' left='600px'/>
            </div>
            <h1 className='text-lg font-semi-bold mb-4'>My Bookings</h1>
            {bookings.map((item, index) => (
                <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
                    
                    {/* 🟢 Corrected typo: classNmae -> className */}
                    <div className='flex flex-col md:flex-row' > 
                        <img src={item.show.movie.poster_path} alt=" " className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
                        <div className='flex flex-col p-4'>
                            <p className='text-lg font-semibold'>{item.show.movie.title}</p>
                            
                            {/* 🟢 FIX 1: Accessing runtime correctly (item.show.movie.runtime) */}
                            <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
                            
                            {/* 🟢 FIX 2: Accessing showDateTime correctly (item.show.showDateTime) */}
                            <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>

                        </div>
                    </div>

                    <div className='flex flex-col md:items-end md:text-right justify-between p-4' >
                        <div className='flex items-center gap-4'>
                            <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
                            {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
                        </div>
                        <div className='text-sm'>
                            <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
                            <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : <Loading/>
}

export default MyBookings
