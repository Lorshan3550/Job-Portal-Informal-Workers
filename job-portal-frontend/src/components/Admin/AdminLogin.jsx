import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill, RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/admin/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAdminAuthorized(true);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  if (isAdminAuthorized) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/admin.jpg" alt="Admin Logo" className="mx-auto w-20 h-20" />
        </div>
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h3>
        <form onSubmit={handleAdminLogin} className="w-full">
          {/* Email Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <MdOutlineMailOutline className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500" />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {showPassword ? (
              <RiEyeFill
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <RiEyeCloseFill
                className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg border border-transparent hover:bg-gray-900 hover:border-white transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;