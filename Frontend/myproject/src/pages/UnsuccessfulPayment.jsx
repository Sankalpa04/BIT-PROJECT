import React from "react";
import { useNavigate } from "react-router-dom";

const UnsuccessfulPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Unsuccessful</h1>
        <p className="text-gray-700 mb-6">
          Oops! Something went wrong with your payment. Please try again.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Go to home
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsuccessfulPayment;
