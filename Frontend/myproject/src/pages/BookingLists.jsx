import React, { useState, useEffect } from "react";
import axios from "axios"; // To fetch data from the backend

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the list of bookings from the backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/booking"); // Replace with your API endpoint
      setBookings(response.data); // Assuming the response contains an array of bookings
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  // Render
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Booking List</h2>

      {bookings.length > 0 ? (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{booking.userName}</td>
                <td className="px-4 py-2 border">
                  {new Date(booking.bookedDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">
          No bookings to display. Please check back later.
        </p>
      )}
    </div>
  );
};

export default BookingList;
