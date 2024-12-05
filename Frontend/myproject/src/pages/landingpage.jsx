import React, { useState } from "react";

const LandingPage = () => {
  const [hotels, setHotels] = useState([
    { name: "Luxury Hotel", price: 120, img: "https://via.placeholder.com/300x200", description: "Starting at $120/night" },
    { name: "Cozy Stay", price: 80, img: "https://via.placeholder.com/300x200", description: "Starting at $80/night" },
    { name: "Beach Resort", price: 150, img: "https://via.placeholder.com/300x200", description: "Starting at $150/night" }
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (order) => {
    const sortedHotels = [...hotels].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setHotels(sortedHotels);
    setSortOrder(order);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center text-white bg-blue-500 py-12">
        <h2 className="text-3xl font-semibold">Find Your Perfect Stay</h2>
        <p className="mt-4 text-lg">Search for hotels, compare prices, and book the best deals.</p>

        {/* Search Section */}
        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Destination"
            className="form-control px-4 py-2 w-full max-w-md mx-auto rounded-md shadow-lg text-black"
          />
          <div className="flex space-x-4 justify-center">
            <input
              type="date"
              className="form-control text-black px-3 py-2 w-36 rounded-md shadow-lg"
            />
            <input
              type="date"
              className="form-control text-black px-3 py-2 w-34 rounded-md shadow-lg"
            />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">Search</button>
          </div>
          {/* Sort Section */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleSortChange("asc")}
              className={`px-4 py-2 rounded-md ${sortOrder === "asc" ? "bg-gray-700" : "bg-gray-400"} text-white`}
            >
              Sort by Price: Low to High
            </button>
            <button
              onClick={() => handleSortChange("desc")}
              className={`px-4 py-2 rounded-md ${sortOrder === "desc" ? "bg-gray-700" : "bg-gray-400"} text-white`}
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
          {hotels.map((hotel, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={hotel.img}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold">{hotel.name}</h5>
                <p className="text-gray-600 mt-2">{hotel.description}</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
