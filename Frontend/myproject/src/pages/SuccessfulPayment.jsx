import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
