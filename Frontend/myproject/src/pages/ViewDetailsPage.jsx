import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../Config/axiosConfig";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const ViewDetailsPage = () => {
  const { id } = useParams(); // Get hotelId from URL params
  const [hotelData, setHotelData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedDate, setSelectedDate] = useState('');

  const stripePromise = loadStripe('pk_test_51QklFkCvFE50DHP4BVOLOOTKPFhdpKbdSkkYcfAtEjNI2u1s1X2DSKf4DLesBGey7kV88hFfdmc28P1rdq777bTi00O7qOPqdY'); 

  // Fetch hotel data from the backend
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axiosInstance.get(`/hotel/${id}`);
        // const hotel = response.data;
        console.log(response, "Check");
        setHotelData(response.data);
        setReviews(response.data.reviews || []);
        setRating(
          response.data.reviews?.reduce((acc, review) => acc + review.rating, 0) / 
            response.data.reviews?.length || 0
        );
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBookNow = async () => {
    if (!selectedDate) {
      alert('Please select a date!');
      return;
    }
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must log in to book!");
      return;
    }

    try {
      // Send booking data to the backend
      const response = await axios.post(`http://localhost:5000/hotel/book`, {
        date: selectedDate,
        id:id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  

      // Get the Stripe session ID from the backend
      const { sessionId } = response.data;
      console.log(sessionId, "sessionId");

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error redirecting to Stripe Checkout:', error);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

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
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Book Your Stay</h2>
        <label className="block text-lg">Select your date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleBookNow}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold mt-4 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Book Now
        </button>
      </section>
    </div>
  );
};

export default ViewDetailsPage;
