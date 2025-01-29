import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "",
        { email, password, role },
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
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // if (isAuthorized) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 ">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <img src="logo.png" alt="Logo" className="mx-auto w-20 h-20" />
        </div>
        <h3 className="text-2xl font-semibold text-center text-green-800 mb-6">
          Login to your account
        </h3>
        <form onSubmit={handleLogin} className="w-full">
          {/* <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            >
              <option value="">Select Role</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
            <FaRegUser className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500" />
          </div> */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
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
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <RiLock2Fill className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500" />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-800 text-white font-semibold rounded-lg border border-transparent hover:bg-green-900 hover:border-white transition duration-300"
          >
            Login
          </button>

          <Link
            to={"/forgot-password"}
            className="block text-end mt-4 text-sm text-green-800 hover:text-green-900 transition duration-300"
          >
            Forgot Password?
          </Link>

          {/* <Link
            to={"/register"}
            className="block text-center mt-4 text-sm text-green-800 border border-green-800 rounded-lg py-2 px-4 hover:bg-green-800 hover:text-white transition duration-300"
          >
            Register Now
          </Link> */}
          <div className="mt-4 col-span-2 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
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
