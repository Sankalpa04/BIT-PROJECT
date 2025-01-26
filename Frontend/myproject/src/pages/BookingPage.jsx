import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Load Stripe
const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id: hotelId } = useParams();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Create Payment Intent
      const { data } = await axios.post('/api/bookings', {
        date,
        userId: 'currentUserId', // Replace with actual user ID from your auth system
        hotelId,
        amount: 100, // Example amount, replace with dynamic value
      });

      const clientSecret = data.clientSecret;

      // Confirm Payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentResult.error) {
        console.error('Payment failed:', paymentResult.error.message);
        alert('Payment failed');
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        // Save Booking
        await axios.post('/api/confirm-booking', {
          date,
          userId: 'currentUserId', // Replace with actual user ID
          hotelId,
          paymentIntentId: paymentResult.paymentIntent.id,
        });

        alert('Booking successful!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Book Your Stay</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Select Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Card Details</label>
        <CardElement className="p-2 border border-gray-300 rounded-lg" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  );
};

const BookingPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default BookingPage;



// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';

// // Load Stripe
// const stripePromise = loadStripe('your-stripe-publishable-key'); // Replace with your publishable key

// // Checkout Component
// const CheckoutForm = ({ date, userId, hotelId }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       // Create Payment Intent
//       const { data } = await axios.post('/api/bookings', {
//         date,
//         userId,
//         hotelId,
//         amount: 100, // Example amount, replace with dynamic value
//       });

//       const clientSecret = data.clientSecret;

//       // Confirm Payment
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (paymentResult.error) {
//         console.error('Payment failed:', paymentResult.error.message);
//         alert('Payment failed');
//       } else if (paymentResult.paymentIntent.status === 'succeeded') {
//         // Save Booking
//         await axios.post('/api/confirm-booking', {
//           date,
//           userId,
//           hotelId,
//           paymentIntentId: paymentResult.paymentIntent.id,
//         });

//         alert('Booking successful!');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred during booking.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Book Now'}
//       </button>
//     </form>
//   );
// };

// // Wrapper for Stripe Elements
// const BookingPage = ({ date, userId, hotelId }) => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm date={date} userId={userId} hotelId={hotelId} />
//   </Elements>
// );

// export default BookingPage;