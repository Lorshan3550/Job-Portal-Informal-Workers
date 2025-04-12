import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // const handleResetPassword = (e) => {
  //   e.preventDefault();

  //   if (!password || !confirmPassword) {
  //     setMessage("Please fill in all fields.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match.");
  //     return;
  //   }

  //   // Simulate password reset success
  //   setMessage("Your password has been reset successfully!");

  //   // Redirect to login page after 2 seconds
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 2000);
  // };

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (!password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/change-password",
        {
          newPassword: password,
          confirmNewPassword: confirmPassword,
        },
        {
          withCredentials: true, // VERY IMPORTANT: sends the cookie containing the token
        }
      );
  
      setMessage(response.data.message || "Password reset successful!");
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong.";
      setMessage(errorMsg);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Reset Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your new password below.
        </p>

        {message && (
          <p className="text-sm text-center text-green-800 bg-green-100 p-2 rounded-lg mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleResetPassword}>
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 transition"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 transition"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login Button */}
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

export default ResetPassword;
