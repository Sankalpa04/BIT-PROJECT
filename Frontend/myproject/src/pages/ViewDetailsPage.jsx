import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../Config/axiosConfig";

const ViewDetailsPage = () => {
  const { id } = useParams(); // Get hotelId from URL params
  const [hotelData, setHotelData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch hotel data from the backend
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axiosInstance.get(`/hotel/${id}`);
        // const hotel = response.data;
        console.log(response, "Check");
        setHotelData(response.data);
        setReviews(hotel.reviews || []);
        setRating(
          hotel.reviews?.reduce((acc, review) => acc + review.rating, 0) /
            hotel.reviews?.length || 0
        ); // Calculate average rating
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotelData();
  }, [id]);

  const submitReview = async () => {
    const newReview = { text: reviewText, rating };

    // Send the review to the backend
    try {
      await axios.post(`/hotel/${id}/reviews`, { review: newReview });
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewText("");
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!hotelData) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hotel Name and Details */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">{hotelData?.name}</h1>
        <p className="text-lg text-gray-600 mt-4">{hotelData?.description}</p>
      </section>

      {/* Photos Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {hotelData?.photos.map((photo, index) => ( */}
            <img
              // key={index}
              src={`http://localhost:5000/public/uploads/${hotelData.image}`}
              alt={`Hotel photo`}
              className="rounded-lg shadow-md object-cover w-full h-64"
            />
          {/* ))} */}
        </div>
      </section>
      {/* Main Content: Details and Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Details */}
        <div className="col-span-2">
          {/* Rooms Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* {hotelData?.rooms.map((room, index) => ( */}
                <div
                  // key={index}
                  className="bg-white shadow-lg rounded-lg p-6 border"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{hotelData.name}</h3>
                  <p className="text-gray-600 mt-2">
                    Price: ${hotelData.price} per night
                  </p>
                  <p className="text-gray-600 mt-2">
                    Offer Price: ${hotelData.offerPrice} per night
                  </p>
                  {/* <p className="text-gray-600 mt-1">
                    Capacity: {room.capacity} guests
                  </p> */}
                </div>
              {/* ))} */}
            </div>
          </section>
        </div>

        {/* Right: Reviews Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Reviews & Ratings
          </h2>
          {/* Overall Rating */}
          <div className="flex items-center mb-6">
            <p className="text-2xl font-semibold mr-2">{rating.toFixed(1)}</p>
            <div className="text-yellow-500">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </div>
          </div>

          {/* List of Reviews */}
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="font-semibold">{review.text}</p>
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </li>
            ))}
          </ul>

          {/* Submit a Review */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="flex items-center mt-4">
              <label className="mr-4 text-lg">Your Rating:</label>
              <select
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="text-center mt-8">
        <Link to={`/hotel/${id}/book`}>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ViewDetailsPage;

// import React, { useState } from "react";
// import hotels from "../Components/Assets/hotelsdata";
// import ViewDetailsPage from "./ViewDetailsPage";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   const [hotelList, setHotelList] = useState(hotels); // Correctly initializing with imported hotels data
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [destination, setDestination] = useState("");

//   const handleSortChange = (order) => {
//     const sortedHotels = [...hotelList].sort((a, b) => {
//       return order === "asc" ? a.price - b.price : b.price - a.price;
//     });
//     setHotelList(sortedHotels);
//     setSortOrder(order);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send 'destination' state to your backend API
//     console.log("Destination to search:", destination);
//     // Example of API call:
//     // fetch(`your-backend-api-url/search?destination=${destination}`)
//     //   .then(response => response.json())
//     //   .then(data => {
//     //     // Handle the response data as needed
//     //   })
//     //   .catch(error => console.error('Error searching hotels:', error));
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
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Destination"
//             className="form-control px-4 py-2 w-full max-w-md mx-auto rounded-md shadow-lg text-black"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//           />
//           <div className="flex justify-center space-x-4 mt-4">
//             <button
//               type="submit"
//               className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
//             >
//               Search
//             </button>
//           </div>
//         </form>

//         {/* Sort Section */}
//         <div className="flex justify-center space-x-4 mt-4">
//           <button
//             onClick={() => handleSortChange("asc")}
//             className={`px-4 py-2 rounded-md ${
//               sortOrder === "asc" ? "bg-gray-700" : "bg-gray-400"
//             } text-white`}
//           >
//             Sort by Price: Low to High
//           </button>
//           <button
//             onClick={() => handleSortChange("desc")}
//             className={`px-4 py-2 rounded-md ${
//               sortOrder === "desc" ? "bg-gray-700" : "bg-gray-400"
//             } text-white`}
//           >
//             Sort by Price: High to Low
//           </button>
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
//                 <p className="text-gray-800 font-bold mt-2">${hotel.price}/night</p>
//                 <Link to={`/hotel/${hotel.id}`}>
//                   <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
//                     View Details
//                   </button>
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

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import hotels from "../Components/Assets/hotelsdata";

// const ViewDetailsPage = () => {
//   const { id } = useParams(); // Get hotelId from URL params
//   const [hotelData, setHotelData] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");

//   const hotel = hotels.find((hotel) => hotel.id === Number(id));

//   useEffect(() => {
//     if (hotel) {
//       setHotelData(hotel);
//       setReviews(hotel.reviews);
//       setRating(
//         hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
//           hotel.reviews.length
//       ); // Calculate average rating
//     } else {
//       console.log("Hotel not found in the data");
//     }
//   }, [id]);

//   const submitReview = () => {
//     const newReview = { text: reviewText, rating };
//     setReviews((prevReviews) => [...prevReviews, newReview]);
//     setReviewText("");
//     alert("Review submitted successfully!");
//   };

//   if (!hotelData) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Hotel Name and Details */}
//       <section className="text-center mb-8">
//         <h1 className="text-4xl font-semibold text-gray-900">{hotelData?.name}</h1>
//         <p className="text-lg text-gray-600 mt-4">{hotelData?.details}</p>
//       </section>

//       {/* Photos Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Photos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotelData?.photos.map((photo, index) => (
//             <img
//               key={index}
//               src={photo}
//               alt={`Hotel photo ${index + 1}`}
//               className="rounded-lg shadow-md object-cover w-full h-64"
//             />
//           ))}
//         </div>
//       </section>

//       {/* Main Content: Details and Reviews */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left: Details */}
//         <div className="col-span-2">
//           {/* Rooms Section */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rooms</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {hotelData?.rooms.map((room, index) => (
//                 <div
//                   key={index}
//                   className="bg-white shadow-lg rounded-lg p-6 border"
//                 >
//                   <h3 className="text-xl font-semibold text-gray-800">
//                     {room.type}
//                   </h3>
//                   <p className="text-gray-600 mt-2">
//                     Price: ${room.price} per night
//                   </p>
//                   <p className="text-gray-600 mt-1">
//                     Capacity: {room.capacity} guests
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Date Availability */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               Availability
//             </h2>
//             <p className="text-lg text-gray-700">
//               Available from: {hotelData?.availability.startDate} to{" "}
//               {hotelData?.availability.endDate}
//             </p>
//           </section>
//         </div>

//         {/* Right: Reviews Section */}
//         <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Reviews & Ratings
//           </h2>
//           {/* Overall Rating */}
//           <div className="flex items-center mb-6">
//             <p className="text-2xl font-semibold mr-2">{rating.toFixed(1)}</p>
//             <div className="text-yellow-500">
//               {"★".repeat(Math.round(rating))}
//               {"☆".repeat(5 - Math.round(rating))}
//             </div>
//           </div>

//           {/* List of Reviews */}
//           <ul className="space-y-4">
//             {reviews.map((review, index) => (
//               <li key={index} className="bg-white rounded-lg p-4 shadow-sm">
//                 <p className="font-semibold">{review.text}</p>
//                 <div className="text-yellow-500">
//                   {"★".repeat(review.rating)}
//                   {"☆".repeat(5 - review.rating)}
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Submit a Review */}
//           <div className="mt-6">
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               placeholder="Write your review here..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//             ></textarea>
//             <div className="flex items-center mt-4">
//               <label className="mr-4 text-lg">Your Rating:</label>
//               <select
//                 className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={rating}
//                 onChange={(e) => setRating(parseInt(e.target.value))}
//               >
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <option key={star} value={star}>
//                     {star}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onClick={submitReview}
//             >
//               Submit Review
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Book Now Button */}
//       <div className="text-center mt-8">
//         <Link to={`/hotel/${id}/book`}>
//           <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">
//             Book Now
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ViewDetailsPage;

// // import React, { useState, useEffect } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import hotels from "../Components/Assets/hotelsdata";

// // const ViewDetailsPage = () => {
// //   const { id } = useParams(); // Get hotelId from URL params
// //   const [hotelData, setHotelData] = useState(null);
// //   const [reviews, setReviews] = useState([]);
// //   const [rating, setRating] = useState(0);
// //   const [reviewText, setReviewText] = useState("");

// //   const hotel = hotels.find((hotel) => hotel.id === Number(id));

// //   useEffect(() => {
// //     if (hotel) {
// //       setHotelData(hotel);
// //       setReviews(hotel.reviews);
// //       setRating(
// //         hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
// //           hotel.reviews.length
// //       ); // Calculate average rating
// //     } else {
// //       console.log("Hotel not found in the data");
// //     }
// //   }, [id]);

// //   const submitReview = () => {
// //     const newReview = { text: reviewText, rating };
// //     setReviews((prevReviews) => [...prevReviews, newReview]);
// //     setReviewText("");
// //     alert("Review submitted successfully!");
// //   };

// //   if (!hotelData) return <div className="text-center py-8">Loading...</div>;

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Hotel Name and Details */}
// //       <section className="text-center mb-8">
// //         <h1 className="text-4xl font-semibold text-gray-900">{hotelData?.name}</h1>
// //         <p className="text-lg text-gray-600 mt-4">{hotelData?.details}</p>
// //       </section>

// //       {/* Rooms Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rooms</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {hotelData?.rooms.map((room, index) => (
// //             <div key={index} className="bg-white shadow-lg rounded-lg p-6 border">
// //               <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
// //               <p className="text-gray-600 mt-2">Price: ${room.price} per night</p>
// //               <p className="text-gray-600 mt-1">Capacity: {room.capacity} guests</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Date Availability */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Availability</h2>
// //         <p className="text-lg text-gray-700">
// //           Available from: {hotelData?.availability.startDate} to{" "}
// //           {hotelData?.availability.endDate}
// //         </p>
// //       </section>

// //       {/* Photos Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Photos</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {hotelData?.photos.map((photo, index) => (
// //             <img
// //               key={index}
// //               src={photo}
// //               alt={`Hotel photo ${index + 1}`}
// //               className="rounded-lg shadow-md object-cover w-full h-64"
// //             />
// //           ))}
// //         </div>
// //       </section>

// //       {/* Reviews and Star Rating */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews & Ratings</h2>
// //         <div className="flex items-center mb-4">
// //           <p className="text-2xl font-semibold mr-2">{rating.toFixed(1)}</p>
// //           <div className="text-yellow-500">
// //             {"★".repeat(Math.round(rating))}
// //             {"☆".repeat(5 - Math.round(rating))}
// //           </div>
// //         </div>
// //         <ul className="space-y-4">
// //           {reviews.map((review, index) => (
// //             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <p className="font-semibold">{review.text}</p>
// //               <div className="text-yellow-500">
// //                 {"★".repeat(review.rating)}
// //                 {"☆".repeat(5 - review.rating)}
// //               </div>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Submit Review */}
// //         <div className="mt-6">
// //           <textarea
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             rows="4"
// //             placeholder="Write your review here..."
// //             value={reviewText}
// //             onChange={(e) => setReviewText(e.target.value)}
// //           ></textarea>
// //           <div className="flex items-center mt-4">
// //             <label className="mr-4 text-lg">Your Rating:</label>
// //             <select
// //               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={rating}
// //               onChange={(e) => setRating(parseInt(e.target.value))}
// //             >
// //               {[1, 2, 3, 4, 5].map((star) => (
// //                 <option key={star} value={star}>
// //                   {star}
// //                 </option>
// //               ))}
              
// //             </select>
// //           </div>
// //           <button
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             onClick={submitReview}
// //           >
// //             Submit Review
// //           </button>
// //         </div>
// //       </section>

// //       {/* Book Now Button */}
// //       <div className="text-center mt-8">
// //         <Link to={`/hotel/${id}/book`}>
// //           <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">
// //             Book Now
// //           </button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewDetailsPage;

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import hotels from "../Components/Assets/hotelsdata";
// // import { Link } from "react-router-dom";

// // const ViewDetailsPage = () => {
// //   const { id } = useParams(); // Get hotelId from URL params
// //   const [hotelData, setHotelData] = useState(null);
// //   const [reviews, setReviews] = useState([]);
// //   const [rating, setRating] = useState(0);
// //   const [reviewText, setReviewText] = useState("");

// //   const hotel = hotels.find((hotel) => hotel.id === Number(id));

// //   useEffect(() => {
// //     if (hotel) {
// //       setHotelData(hotel);
// //       setReviews(hotel.reviews);
// //       setRating(
// //         hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
// //           hotel.reviews.length
// //       ); // Calculate average rating
// //     } else {
// //       console.log("Hotel not found in the data");
// //     }
// //   }, [id]);

// //   const submitReview = () => {
// //     const newReview = { text: reviewText, rating };
// //     setReviews((prevReviews) => [...prevReviews, newReview]);
// //     setReviewText("");
// //     alert("Review submitted successfully!");
// //   };

// //   if (!hotelData) return <div className="text-center py-8">Loading...</div>;

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-8">
// //       {/* Hotel Name and Details */}
// //       <section className="text-center mb-8">
// //         <h1 className="text-4xl font-semibold text-gray-900">{hotelData?.name}</h1>
// //         <p className="text-lg text-gray-600 mt-4">{hotelData?.details}</p>
// //       </section>

// //       {/* Rooms Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rooms</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {hotelData?.rooms.map((room, index) => (
// //             <div key={index} className="bg-white shadow-lg rounded-lg p-6 border">
// //               <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
// //               <p className="text-gray-600 mt-2">Price: ${room.price} per night</p>
// //               <p className="text-gray-600 mt-1">Capacity: {room.capacity} guests</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Date Availability */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Availability</h2>
// //         <p className="text-lg text-gray-700">
// //           Available from: {hotelData?.availability.startDate} to{" "}
// //           {hotelData?.availability.endDate}
// //         </p>
// //       </section>

// //       {/* Photos Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Photos</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {hotelData?.photos.map((photo, index) => (
// //             <img
// //               key={index}
// //               src={photo}
// //               alt={`Hotel photo ${index + 1}`}
// //               className="rounded-lg shadow-md object-cover w-full h-64"
// //             />
// //           ))}
// //         </div>
// //       </section>

// //       {/* Reviews and Star Rating */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reviews & Ratings</h2>
// //         <div className="flex items-center mb-4">
// //           <p className="text-2xl font-semibold mr-2">{rating.toFixed(1)}</p>
// //           <div className="text-yellow-500">
// //             {"★".repeat(Math.round(rating))}
// //             {"☆".repeat(5 - Math.round(rating))}
// //           </div>
// //         </div>
// //         <ul className="space-y-4">
// //           {reviews.map((review, index) => (
// //             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <p className="font-semibold">{review.text}</p>
// //               <div className="text-yellow-500">
// //                 {"★".repeat(review.rating)}
// //                 {"☆".repeat(5 - review.rating)}
// //               </div>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Submit Review */}
// //         <div className="mt-6">
// //           <textarea
// //             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             rows="4"
// //             placeholder="Write your review here..."
// //             value={reviewText}
// //             onChange={(e) => setReviewText(e.target.value)}
// //           ></textarea>
// //           <div className="flex items-center mt-4">
// //             <label className="mr-4 text-lg">Your Rating:</label>
// //             <select
// //               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={rating}
// //               onChange={(e) => setRating(parseInt(e.target.value))}
// //             >
// //               {[1, 2, 3, 4, 5].map((star) => (
// //                 <option key={star} value={star}>
// //                   {star}
// //                 </option>
// //               ))}
              
// //             </select>
// //           </div>
// //           <button
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             onClick={submitReview}
// //           >
// //             Submit Review
// //           </button>
// //         </div>
// //       </section>

// //       {/* Book Now Button */}
// //       <div className="text-center mt-8">
// //         <Link to={`/${id}/book`} ><button  className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">
// //           Book Now
// //         </button> 
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewDetailsPage;

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import hotels from "../Components/Assets/hotelsdata";

// // const ViewDetailsPage = () => {
// //   // const [hotelList, setHotelList] = useState();
// //   const { id } = useParams(); // Get hotelId from URL params
// //   const [hotelData, setHotelData] = useState(null);
// //   const [reviews, setReviews] = useState([]);
// //   const [rating, setRating] = useState(0);
// //   const [reviewText, setReviewText] = useState("");
// //   console.log("Hotel ID from URL:", id); // Log hotelId to check its value

// //   const hotel = hotels.find((hotel) => hotel.id === Number(id));
// //   // setHotelData(hotel) 
// //   console.log(hotel, 'hotelsdata');

// //   console.log(hotel.name)
// //   useEffect(() => {
// //     // Ensure hotelId is parsed correctly as a number

// //     if (hotel) {
// //       setHotelData(hotel);
// //       setReviews(hotel.reviews);
// //       setRating(
// //         hotel.reviews.reduce((acc, review) => acc + review.rating, 0) /
// //           hotel.reviews.length
// //       ); // Calculate average rating
// //     } else {
// //       console.log("Hotel not found in the data"); // Log if hotel is not found
// //     }
// //   }, [id]);

// //   const submitReview = () => {
// //     const newReview = { text: reviewText, rating };
// //     setReviews((prevReviews) => [...prevReviews, newReview]);
// //     setReviewText("");
// //     alert("Review submitted successfully!");
// //   };

// //   // if (!hotelData) return <div>Loading...</div>;

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       {/* Hotel Name and Details */}
// //       <section className="text-center mb-8">
// //         <h1 className="text-4xl font-bold">{hotelData?.name}</h1>
// //         <p className="text-gray-700 mt-4">{hotelData?.details}</p>
// //       </section>

// //       {/* Rooms Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-bold mb-4">Rooms</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {hotelData?.rooms.map((room, index) => (
// //             <div
// //               key={index}
// //               className="bg-white shadow-md rounded-lg p-4 border"
// //             >
// //               <h3 className="text-xl font-bold">{room.type}</h3>
// //               <p className="text-gray-600">Price: ${room.price} per night</p>
// //               <p className="text-gray-600">Capacity: {room.capacity} guests</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Date Availability */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-bold mb-4">Availability</h2>
// //         <p className="text-gray-700">
// //           Available from: {hotelData?.availability.startDate} to{" "}
// //           {hotelData?.availability.endDate}
// //         </p>
// //       </section>

// //       {/* Photos Section */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-bold mb-4">Photos</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {hotelData?.photos.map((photo, index) => (
// //             <img
// //               key={index}
// //               src={photo}
// //               alt={`Hotel photo ${index + 1}`}
// //               className="rounded-lg shadow-md"
// //             />
// //           ))}
// //         </div>
// //       </section>

// //       {/* Reviews and Star Rating */}
// //       <section className="mb-8">
// //         <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
// //         <div className="flex items-center mb-4">
// //           <p className="text-xl font-bold mr-2">{rating.toFixed(1)}</p>
// //           <div className="text-yellow-500">
// //             {"★".repeat(Math.round(rating))}
// //             {"☆".repeat(5 - Math.round(rating))}
// //           </div>
// //         </div>
// //         <ul className="space-y-4">
// //           {reviews.map((review, index) => (
// //             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <p className="font-semibold">{review.text}</p>
// //               <div className="text-yellow-500">
// //                 {"★".repeat(review.rating)}
// //                 {"☆".repeat(5 - review.rating)}
// //               </div>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Submit Review */}
// //         <div className="mt-4">
// //           <textarea
// //             className="w-full p-2 border rounded-lg"
// //             rows="4"
// //             placeholder="Write your review here..."
// //             value={reviewText}
// //             onChange={(e) => setReviewText(e.target.value)}
// //           ></textarea>
// //           <div className="flex items-center mt-2">
// //             <label className="mr-2">Your Rating:</label>
// //             <select
// //               className="p-2 border rounded-lg"
// //               value={rating}
// //               onChange={(e) => setRating(parseInt(e.target.value))}
// //             >
// //               {[1, 2, 3, 4, 5].map((star) => (
// //                 <option key={star} value={star}>
// //                   {star}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <button
// //             className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
// //             onClick={submitReview}
// //           >
// //             Submit Review
// //           </button>
// //         </div>
// //       </section>

// //       {/* Book Now Button */}
// //       <div className="text-center mt-8">
// //         <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-500">
// //           Book Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewDetailsPage;

// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import HotelDetailsComponent from "../Components/Details/HotelDetailsComponent"
// // import hotels from "../Components/Assets/hotelsdata";

// // const ViewDetailsPage = () => {
// //   const { id } = useParams(); // Extract 'id' from URL
// //   const hotel = hotels.find((hotel) => hotel.id === parseInt(id)); // Find the hotel by id
// //   console.log(id);
// //   if (!hotel) {
// //     return <p className="text-center text-red-500">Hotel not found.</p>;
// //   }

// //   return <HotelDetailsComponent hotel={hotels} />;
// // };

// // export default ViewDetailsPage;
