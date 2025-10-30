import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import {Toaster} from 'react-hot-toast';
import Footer from "./components/Footer";

// 🟢 CORRECTED IMPORTS: Added 'pages/' prefix
import Layout from "./pages/admin/Layout"; 
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShow"; // Note: File name is AddShow.jsx in image, not AddShows.jsx
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <> 
    <Toaster/>
    
    {/* Show Navbar only if it's not an admin route */}
    { !isAdminRoute && <Navbar />} 
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
      
      {/* Admin Routes */}
      <Route path='/admin/*' element={<Layout />}>
        <Route index element={<Dashboard />} /> 
        
        {/* Note: I corrected the component name for AddShows to match the AddShow.jsx file in your image */}
        <Route path="add-shows" element={<AddShows />} /> 
        <Route path="list-shows" element={<ListShows />} />
        <Route path="list-bookings" element={<ListBookings />} />
      </Route>

      </Routes>
      
      {/* Show Footer only if it's not an admin route */}
      { !isAdminRoute && <Footer />}
    </>
  );
};

export default App;