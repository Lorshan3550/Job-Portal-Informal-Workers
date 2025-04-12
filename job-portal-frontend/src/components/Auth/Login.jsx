// src/pages/Login.js
import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill, RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Context } from "../../main";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {isAuthorized, setIsAuthorized } = useContext(Context);
  const [redirect, setRedirect] = useState(false);

  // const validateForm = () => {
  //   if (!email || !password) {
  //     toast.error("All fields are required");
  //     return false;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast.error("Invalid email format");
  //     return false;
  //   }
  //   if (password.length < 6) {
  //     toast.error("Password must be at least 6 characters long");
  //     return false;
  //   }
  //   return true;
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   //if (!validateForm()) return;
    
  //   const demoEmail = "demo@gmail.com";
  //   const demoPassword = "12345678";

  //   if (email === demoEmail && password === demoPassword) {
  //     toast.success("Login successful");
  //     localStorage.setItem("token", "demo_token_123"); // simulate token
  //     setIsAuthorized(true);
  //     setEmail("");
  //     setPassword("");
  //     setRedirect(true);
  //   } else {
  //     toast.error("Invalid credentials");
  //   }
  // };

  // if (redirect) {
  //   return <Navigate to="/" />;
  // }

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Output : ", data);
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error : ", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 ">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col w-full max-w-md">
        <div className="text-center mb-6">
          <img src="logo.png" alt="Logo" className="mx-auto w-20 h-20" />
        </div>
        <h3 className="text-2xl font-semibold text-center text-green-800 mb-6">
          Login to your account
        </h3>
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <MdOutlineMailOutline className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500" />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            {/* <RiLock2Fill className="absolute top-1/2 transform -translate-y-1/2 right-10 text-gray-500" /> */}
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

          <button
            type="submit"
            className="w-full py-3 bg-green-800 text-white font-semibold rounded-lg border border-transparent hover:bg-green-900 hover:border-white transition duration-300"
          >
            Login
          </button>

          <Link
            to="/forgot-password"
            className="block text-end mt-4 text-sm text-green-800 hover:text-green-900 transition duration-300"
          >
            Forgot Password?
          </Link>

          <div className="mt-4 col-span-2 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? {" "}
              <Link
                to="/register"
                className="text-green-700 font-semibold cursor-pointer hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;