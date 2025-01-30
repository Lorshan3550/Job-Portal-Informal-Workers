import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    // Simulate sending reset link
    setMessage("Password reset link has been sent to your email.");

    // Redirect to login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email to reset your password.
        </p>

        {message && (
          <p className="text-sm text-center text-green-800 bg-green-100 p-2 rounded-lg mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="inline-block w-full border-2 border-green-800 text-green-800 py-2 rounded-lg hover:bg-green-800 hover:text-white transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
