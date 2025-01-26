import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo.png'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-12 rounded-full mr-3"
          />
          <span className="text-2xl font-semibold">Oho Nepal</span>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/contact" className="hover:text-gray-400">Contact Us</a>
        </div>

        {/* Search and Signup Section */}
        <div className="flex items-center space-x-4">
        
          {/* Signup Button */}
          <Link to='/signup'><button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
            Sign Up
          </button></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
