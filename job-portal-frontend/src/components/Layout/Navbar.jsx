import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegNoteSticky } from "react-icons/fa6";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("token");
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <nav className="bg-green-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col  items-center space-x-2">
          <span className="text-xl font-bold tracking-wide">JOBSPHERE</span>
          <img src="/logo.png" alt="logo" className="h-10" />
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
        </div>

        {/* Navigation Menu */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-green-900 md:bg-transparent flex flex-col md:flex-row items-center md:space-x-8 transition-all duration-300 ${show ? "block" : "hidden md:flex"
            }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              onClick={() => setShow(false)}
              className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
            >
              ALL JOBS
            </Link>
          </li>

          {(user?.role === 'Client' || user?.role === 'JobSeeker') && (
            <>
              <li>
                <Link
                  to="/review/me"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  MY REVIEWS
                </Link>
              </li>
              <li>
                <Link
                  to="/review"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  ALL REVIEWS
                </Link>
              </li>
            </>
          )}



          {user?.role === "Client" && (
            <>
              <li>
                <Link
                  to="/job/post"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to="/applications/client"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  VIEW YOUR APPLICATIONS
                </Link>
              </li>
              <li>
                <Link
                  to="/job/me"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  VIEW YOUR JOBS
                </Link>
              </li>

            </>
          )}

          {user?.role === "JobSeeker" && (
            <li>
              <Link
                to="/applications/me"
                onClick={() => setShow(false)}
                className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
              >
                MY APPLICATIONS
              </Link>
            </li>
          )}

          {(user?.role === 'JobSeeker' || user?.role === "Client") && (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  PROFILE
                </Link>
              </li>
              <li>
                <Link
                  to="/notification"
                  onClick={() => setShow(false)}
                  className="block px-4 py-2 hover:bg-green-800 rounded-lg md:hover:bg-transparent md:hover:text-gray-200"
                >
                  NOTIFICATIONS

                </Link>
              </li>
            </>
          )}



          {/* Auth Buttons */}
          {isAuthorized ? (
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 bg-white text-green-900 rounded-lg hover:bg-green-200 transition duration-300 text-center"
              >
                LOGOUT
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="block px-4 py-2 bg-white text-green-900 rounded-lg hover:bg-green-200 transition duration-300"
              >
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
