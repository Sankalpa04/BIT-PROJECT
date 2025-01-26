import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <h2 className="text-2xl font-bold py-4 text-center border-b border-gray-700">
                Admin Panel
            </h2>
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded-md hover:bg-gray-700 transition ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/bookings"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded-md hover:bg-gray-700 transition ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/hotels"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded-md hover:bg-gray-700 transition ${
                                    isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            Hotel Lists
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
