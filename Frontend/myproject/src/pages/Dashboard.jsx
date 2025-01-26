import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [hotelCount, setHotelCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);

    useEffect(() => {
        fetchHotelCount();
        fetchBookingCount();
    }, []);

    const fetchHotelCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/hotel/count');
            setHotelCount(response.data.count);
        } catch (error) {
            console.error('Error fetching hotel count: ', error);
        }
    };

    const fetchBookingCount = async () => {
        try {
            const response = await axios.get('/api/bookings/count');
            setBookingCount(response.data.count);
        } catch (error) {
            console.error('Error fetching booking count: ', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
            <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Hotels</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{hotelCount}</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{bookingCount}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
