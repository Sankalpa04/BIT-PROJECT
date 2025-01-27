import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // To fetch data from the backend

const HotelLists = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch the list of hotels from the backend
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/hotel"); // Replace with your API endpoint
      setHotels(response.data); // Assuming the response contains an array of hotels
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Hotel Lists</h2>
      <div className="flex justify-end mb-6">
        <Link
          to="/admin/addhotel"
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
        >
          Add Hotel
        </Link>
      </div>

      {/* Render hotels in a table */}
      {hotels.length > 0 ? (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">S.N.</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr key={hotel.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{hotel.name}</td>
                <td className="px-4 py-2 border">{hotel.address}</td>
                <td className="px-4 py-2 border">{hotel.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No hotels to display. Add a new hotel to get started.</p>
      )}
    </div>
  );
};

export default HotelLists;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; // To fetch data from the backend

// const HotelLists = () => {
//     const [hotels, setHotels] = useState([]);

//     // Fetch the list of hotels from the backend
//     useEffect(() => {
//         fetchHotels();
//     }, []);

//     const fetchHotels = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/hotel');  // Replace with your API endpoint
//             setHotels(response.data);  // Assuming the response contains an array of hotels
//         } catch (error) {
//             console.error('Error fetching hotels:', error);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Hotel Lists</h2>
//             <div className="flex justify-end mb-6">
//                 <Link
//                     to="/admin/addhotel"
//                     className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
//                 >
//                     Add Hotel
//                 </Link>
//             </div>

//             {/* Render list of hotels */}
//             <div className="space-y-4">
//                 {hotels.length > 0 ? (
//                     hotels.map((hotel) => (
//                         <div key={hotel.id} className="bg-white p-4 rounded-md shadow-md">
//                             <h3 className="text-lg font-semibold text-gray-800">{hotel.name}</h3>
//                             <p className="text-gray-600">Location: {hotel.address}</p>
//                             <p className="text-gray-600">Description: {hotel.description}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-600">No hotels to display. Add a new hotel to get started.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HotelLists;
