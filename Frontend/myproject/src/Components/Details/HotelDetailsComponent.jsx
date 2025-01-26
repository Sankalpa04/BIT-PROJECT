
// import React, { useState, useEffect } from "react";
// import hotels from "../Assets/hotelsdata"; // Import hotels data directly

// const HotelDetailsComponent = ({ hotelId }) => {
//   const [hotelData, setHotelData] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");

//   useEffect(() => {
    
//     // Find the hotel by ID from the imported data
//     const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));
//     if (hotel) {
//       setHotelData(hotel);
//       setReviews(hotel.reviews);
//       setRating(hotel.reviews.reduce((acc, review) => acc + review.rating, 0) / hotel.reviews.length); // Calculate average rating
//     }
//   }, [hotelId]);

//   const submitReview = () => {
//     // Update local reviews state directly
//     const newReview = { text: reviewText, rating };
//     setReviews((prevReviews) => [...prevReviews, newReview]);
//     setReviewText("");
//     alert("Review submitted successfully!");
//   };

//   if (!hotelData) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hotel Name and Details */}
//       <section className="text-center mb-8">
//         <h1 className="text-4xl font-bold">{hotelData.name}</h1>
//         <p className="text-gray-700 mt-4">{hotelData.details}</p>
//       </section>

//       {/* Rooms Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotelData.rooms.map((room, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded-lg p-4 border"
//             >
//               <h3 className="text-xl font-bold">{room.type}</h3>
//               <p className="text-gray-600">Price: ${room.price} per night</p>
//               <p className="text-gray-600">Capacity: {room.capacity} guests</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Date Availability */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Availability</h2>
//         <p className="text-gray-700">
//           Available from: {hotelData.availability.startDate} to{" "}
//           {hotelData.availability.endDate}
//         </p>
//       </section>

//       {/* Photos Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Photos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {hotelData.photos.map((photo, index) => (
//             <img
//               key={index}
//               src={photo}
//               alt={`Hotel photo ${index + 1}`}
//               className="rounded-lg shadow-md"
//             />
//           ))}
//         </div>
//       </section>

//       {/* Reviews and Star Rating */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
//         <div className="flex items-center mb-4">
//           <p className="text-xl font-bold mr-2">{rating.toFixed(1)}</p>
//           <div className="text-yellow-500">
//             {"★".repeat(Math.round(rating))}
//             {"☆".repeat(5 - Math.round(rating))}
//           </div>
//         </div>
//         <ul className="space-y-4">
//           {reviews.map((review, index) => (
//             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
//               <p className="font-semibold">{review.text}</p>
//               <div className="text-yellow-500">
//                 {"★".repeat(review.rating)}
//                 {"☆".repeat(5 - review.rating)}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* Submit Review */}
//         <div className="mt-4">
//           <textarea
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           ></textarea>
//           <div className="flex items-center mt-2">
//             <label className="mr-2">Your Rating:</label>
//             <select
//               className="p-2 border rounded-lg"
//               value={rating}
//               onChange={(e) => setRating(parseInt(e.target.value))}
//             >
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
//             onClick={submitReview}
//           >
//             Submit Review
//           </button>
//         </div>
//       </section>

//       {/* Book Now Button */}
//       <div className="text-center mt-8">
//         <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-500">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HotelDetailsComponent;

// import React, { useState, useEffect } from "react";
// import hotels from "../Assets/hotelsdata"; // Import hotels data directly

// const HotelDetailsComponent = ({ hotelId }) => {
//   const [hotelData, setHotelData] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");

//   useEffect(() => {
//     // Find the hotel by ID from the imported data
//     const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));
//     if (hotel) {
//       setHotelData(hotel);
//       setReviews(hotel.reviews);
//       setRating(hotel.reviews.reduce((acc, review) => acc + review.rating, 0) / hotel.reviews.length); // Calculate average rating
//     }
//   }, [hotelId]);

//   const submitReview = async () => {
//     // Since we're not submitting to an API, we'll just update the local state for now
//     const newReview = { text: reviewText, rating };
//     setReviews((prevReviews) => [...prevReviews, newReview]);
//     setReviewText("");
//     alert("Review submitted successfully!");
//   };

//   if (!hotelData) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hotel Name and Details */}
//       <section className="text-center mb-8">
//         <h1 className="text-4xl font-bold">{hotelData.name}</h1>
//         <p className="text-gray-700 mt-4">{hotelData.details}</p>
//       </section>

//       {/* Rooms Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotelData.rooms.map((room) => (
//             <div
//               key={room.type}
//               className="bg-white shadow-md rounded-lg p-4 border"
//             >
//               <h3 className="text-xl font-bold">{room.type}</h3>
//               <p className="text-gray-600">Price: ${room.price} per night</p>
//               <p className="text-gray-600">Capacity: {room.capacity} guests</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Date Availability */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Availability</h2>
//         <p className="text-gray-700">
//           Available from: {hotelData.availability.startDate} to{" "}
//           {hotelData.availability.endDate}
//         </p>
//       </section>

//       {/* Photos Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Photos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {hotelData.photos.map((photo, index) => (
//             <img
//               key={index}
//               src={photo}
//               alt={`Hotel photo ${index + 1}`}
//               className="rounded-lg shadow-md"
//             />
//           ))}
//         </div>
//       </section>

//       {/* Reviews and Star Rating */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
//         <div className="flex items-center mb-4">
//           <p className="text-xl font-bold mr-2">{rating.toFixed(1)}</p>
//           <div className="text-yellow-500">
//             {"★".repeat(Math.round(rating))}
//             {"☆".repeat(5 - Math.round(rating))}
//           </div>
//         </div>
//         <ul className="space-y-4">
//           {reviews.map((review, index) => (
//             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
//               <p className="font-semibold">{review.text}</p>
//               <div className="text-yellow-500">
//                 {"★".repeat(review.rating)}
//                 {"☆".repeat(5 - review.rating)}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* Submit Review */}
//         <div className="mt-4">
//           <textarea
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           ></textarea>
//           <div className="flex items-center mt-2">
//             <label className="mr-2">Your Rating:</label>
//             <select
//               className="p-2 border rounded-lg"
//               value={rating}
//               onChange={(e) => setRating(parseInt(e.target.value))}
//             >
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
//             onClick={submitReview}
//           >
//             Submit Review
//           </button>
//         </div>
//       </section>

//       {/* Book Now Button */}
//       <div className="text-center mt-8">
//         <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-500">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HotelDetailsComponent;



// import React, { useState, useEffect } from "react";

// const HotelDetailsComponent = ({ hotelId }) => {
//   const [hotelData, setHotelData] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");

//   useEffect(() => {
//     // Fetch hotel data from backend
//     const fetchHotelData = async () => {
//       try {
//         const response = await fetch(`/api/hotels/${hotelId}`);
//         const data = await response.json();
//         setHotelData(data);
//         setReviews(data.reviews);
//         setRating(data.averageRating);
//       } catch (error) {
//         console.error("Error fetching hotel data:", error);
//       }
//     };

//     fetchHotelData();
//   }, [hotelId]);

//   const submitReview = async () => {
//     try {
//       const response = await fetch(`/api/hotels/${hotelId}/reviews`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: reviewText, rating }),
//       });

//       if (response.ok) {
//         const newReview = await response.json();
//         setReviews((prevReviews) => [...prevReviews, newReview]);
//         setReviewText("");
//         alert("Review submitted successfully!");
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   if (!hotelData) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Hotel Name and Details */}
//       <section className="text-center mb-8">
//         <h1 className="text-4xl font-bold">{hotelData.name}</h1>
//         <p className="text-gray-700 mt-4">{hotelData.details}</p>
//       </section>

//       {/* Rooms Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Rooms</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {hotelData.rooms.map((room) => (
//             <div
//               key={room.id}
//               className="bg-white shadow-md rounded-lg p-4 border"
//             >
//               <h3 className="text-xl font-bold">{room.type}</h3>
//               <p className="text-gray-600">Price: ${room.price} per night</p>
//               <p className="text-gray-600">Capacity: {room.capacity} guests</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Date Availability */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Availability</h2>
//         <p className="text-gray-700">
//           Available from: {hotelData.availability.startDate} to{" "}
//           {hotelData.availability.endDate}
//         </p>
//       </section>

//       {/* Photos Section */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Photos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {hotelData.photos.map((photo, index) => (
//             <img
//               key={index}
//               src={photo}
//               alt={`Hotel photo ${index + 1}`}
//               className="rounded-lg shadow-md"
//             />
//           ))}
//         </div>
//       </section>

//       {/* Reviews and Star Rating */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Reviews & Ratings</h2>
//         <div className="flex items-center mb-4">
//           <p className="text-xl font-bold mr-2">{rating.toFixed(1)}</p>
//           <div className="text-yellow-500">
//             {"★".repeat(Math.round(rating))}
//             {"☆".repeat(5 - Math.round(rating))}
//           </div>
//         </div>
//         <ul className="space-y-4">
//           {reviews.map((review, index) => (
//             <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
//               <p className="font-semibold">{review.text}</p>
//               <div className="text-yellow-500">
//                 {"★".repeat(review.rating)}
//                 {"☆".repeat(5 - review.rating)}
//               </div>
//             </li>
//           ))}
//         </ul>

//         {/* Submit Review */}
//         <div className="mt-4">
//           <textarea
//             className="w-full p-2 border rounded-lg"
//             rows="4"
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           ></textarea>
//           <div className="flex items-center mt-2">
//             <label className="mr-2">Your Rating:</label>
//             <select
//               className="p-2 border rounded-lg"
//               value={rating}
//               onChange={(e) => setRating(parseInt(e.target.value))}
//             >
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
//             onClick={submitReview}
//           >
//             Submit Review
//           </button>
//         </div>
//       </section>

//       {/* Book Now Button */}
//       <div className="text-center mt-8">
//         <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-500">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HotelDetailsComponent;