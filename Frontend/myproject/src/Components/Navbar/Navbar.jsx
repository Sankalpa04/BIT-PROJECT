import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
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
          {/* Search Bar */}
          <input
            type="text"
            className="px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500">
            Search
          </button>
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
