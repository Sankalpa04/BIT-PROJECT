import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Assuming you use axios to fetch data from an API

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http:/localhost:5000/bookings'); // Replace with your API endpoint
      setBookings(response.data);  // Assuming the response is an array of bookings
    } catch (error) {
      console.error('Error fetching bookings: ', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bookings</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">User Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{booking.userName}</td>
                <td className="px-4 py-2">{booking.email}</td>
                <td className="px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
