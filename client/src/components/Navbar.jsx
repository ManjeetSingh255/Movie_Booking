
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk(); // ✅ Correct Clerk function
  const  navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-transparent">
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="h-auto w-36" />
      </Link>

      {/* Navigation Links */}
      <div
        className={`
          max-md:fixed max-md:top-0 max-md:left-0
          max-md:flex max-md:flex-col max-md:items-center max-md:justify-center
          max-md:bg-black/90 max-md:backdrop-blur
          max-md:h-screen max-md:w-full
          md:flex md:static md:flex-row md:gap-8 md:px-8
          py-4 md:rounded-full md:bg-white/10 md:border md:border-gray-300/20
          transition-all duration-300
          ${isOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
        `}
      >
        {/* Close icon for mobile */}
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white"
          onClick={() => setIsOpen(false)}
        />

        {/* Nav links */}
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/">Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/movies">Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/">Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/">Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to="/favorite">Favorite</Link>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer text-white" />
        {!user ? (
          <button
            onClick={() => openSignIn()} // ✅ Opens Clerk modal
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium text-white"
          >
            Login
          </button>
        ) : (
          <UserButton > 
            <UserButton.MenuItems>
              <UserButton.Action label = "My Bookings" labelIcon = {<TicketPlus width = {15}/>} onClick = {()=>navigate('/my-bookings')}/>
            </UserButton.MenuItems>
           </UserButton>
        )}
      </div>

      {/* Hamburger icon */}
      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white"
        onClick={() => setIsOpen(true)}
      />
    </div>
  );
};

export default Navbar;
