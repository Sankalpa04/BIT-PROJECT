import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page. Please log in with the proper credentials.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Go to Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
