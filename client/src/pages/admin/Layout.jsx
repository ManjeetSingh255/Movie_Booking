
import React from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <AdminNavbar/>
      
      {/* 🟢 CORRECTION: Added h-[calc(100vh-64px)] here. This ensures this div 
         takes up the exact height remaining below the 64px tall Navbar. */}
      <div className='flex h-[calc(100vh-64px)]'> 
        
        {/* The sidebar component already has its height calculated internally */}
        <AdminSidebar/>
        
        {/* Removed redundant height calculation from here */}
        <div className = 'flex-1 py-10 px-4 md:px-10 overflow-y-auto'>
            <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;