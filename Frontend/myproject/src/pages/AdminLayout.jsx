import React from 'react';
import Sidebar from './Sidebar';  // Sidebar component
import { Outlet } from 'react-router-dom'; // Renders the nested routes

const AdminLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-50 min-h-screen p-6">
                <Outlet /> {/* This will render the admin page components */}
            </div>
        </div>
    );
};

export default AdminLayout;
