import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [hotelList, setHotelList] = useState([]); // Initialize with an empty array
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true); // To track data loading state
  const [error, setError] = useState(null); // To handle errors
  const [search, setSearch] = useState(''); // Initialize with an empty search value
  const [query, setQuery] = useState(''); // Initialize with an empty array

  // Fetch hotels from the backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hotel?search=${query}`); // Replace with your backend endpoint
        setHotelList(response.data); // Assuming the backend returns an array of hotels
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotels.");
        setLoading(false);
      }
    };
    if (query || query === "") fetchHotels();
  }, [query]);

  // Handle sorting
  const handleSortChange = (order) => {
    const sortedHotels = [...hotelList].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setHotelList(sortedHotels);
    setSortOrder(order);
  };
  const handleSearch = () => {
    setQuery(search); // Set the `query` state to trigger the search
  };

  // Render loading, error, or content
  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center text-white bg-blue-500 py-12">
        <h2 className="text-3xl font-semibold">Find Your Perfect Stay</h2>
        <p className="mt-4 text-lg">
          Search for hotels, compare prices, and book the best deals.
        </p>

        {/* Search Section */}
        <div className="mt-8 space-y-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Destination"
            className="form-control px-4 py-2 w-full max-w-md mx-auto rounded-md shadow-lg text-black"
          />
          <div className="flex justify-center space-x-4 mt-4">
            <button onClick={handleSearch} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
              Search
            </button>
          </div>

          {/* Sort Section */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleSortChange("asc")}
              className={`px-4 py-2 rounded-md ${
                sortOrder === "asc" ? "bg-gray-700" : "bg-gray-400"
              } text-white`}
            >
              Sort by Price: Low to High
            </button>
            <button
              onClick={() => handleSortChange("desc")}
              className={`px-4 py-2 rounded-md ${
                sortOrder === "desc" ? "bg-gray-700" : "bg-gray-400"
              } text-white`}
            >
              Sort by Price: High to Low
            </button>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="p-5 bg-gray-100">
        <h3 className="text-center text-2xl font-semibold mb-6">Top Hotels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hotelList.map((hotel) => (
            <div
              key={hotel._id} // Use MongoDB's unique ID
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:5000/public/uploads/${hotel.image}`} // Fallback if no image
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold">{hotel.name}</h5>
                <p className="text-gray-800 font-bold mt-2">${hotel.price}/night</p>
                <Link to={`/hotel/${hotel._id}`}>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;


// import React, { useState } from "react";
// import hotels from "../Components/Assets/hotelsdata";
// import ViewDetailsPage from "./ViewDetailsPage";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   const [hotelList, setHotelList] = useState(hotels); // Correctly initializing with imported hotels data
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleSortChange = (order) => {
//     const sortedHotels = [...hotelList].sort((a, b) => {
//       return order === "asc" ? a.price - b.price : b.price - a.price;
//     });
//     setHotelList(sortedHotels);
//     setSortOrder(order);
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="text-center text-white bg-blue-500 py-12">
//         <h2 className="text-3xl font-semibold">Find Your Perfect Stay</h2>
//         <p className="mt-4 text-lg">
//           Search for hotels, compare prices, and book the best deals.
//         </p>

//         {/* Search Section */}
//         <div className="mt-8 space-y-4">
//           <input
//             type="text"
//             placeholder="Destination"
//             className="form-control px-4 py-2 w-full max-w-md mx-auto rounded-md shadow-lg text-black"
//           />
//           {/* <div className="flex space-x-4 justify-center">
//             <input
//               type="date"
//               className="form-control text-black px-3 py-2 w-36 rounded-md shadow-lg"
//             />
//             <input
//               type="date"
//               className="form-control text-black px-3 py-2 w-34 rounded-md shadow-lg"
//             />
//           </div> */}
//           <div className="flex justify-center space-x-4 mt-4">
//             <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
//               Search
//             </button>
//           </div>
//           {/* Sort Section */}
//           <div className="flex justify-center space-x-4 mt-4">
//             <button
//               onClick={() => handleSortChange("asc")}
//               className={`px-4 py-2 rounded-md ${
//                 sortOrder === "asc" ? "bg-gray-700" : "bg-gray-400"
//               } text-white`}
//             >
//               Sort by Price: Low to High
//             </button>
//             <button
//               onClick={() => handleSortChange("desc")}
//               className={`px-4 py-2 rounded-md ${
//                 sortOrder === "desc" ? "bg-gray-700" : "bg-gray-400"
//               } text-white`}
//             >
//               Sort by Price: High to Low
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Hotels Section */}
//       <section className="p-5 bg-gray-100">
//         <h3 className="text-center text-2xl font-semibold mb-6">Top Hotels</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {hotelList.map((hotel, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <img
//                 src={hotel.img}
//                 alt={hotel.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h5 className="text-xl font-semibold">{hotel.name}</h5>
//                 {/* <p className="text-gray-600 mt-2">{hotel.description}</p> */}
//                 <p className="text-gray-800 font-bold mt-2">${hotel.price}/night</p>
//                 <Link to={`/hotel/${hotel.id}`}><button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
//                   View Details
//                 </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
