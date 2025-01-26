import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "", // Replace with your logout API endpoint
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav
      className={`${
        isAuthorized ? "block" : "hidden"
      } fixed top-0 left-0 w-full bg-green-800 text-white shadow-lg z-50`}
    >
      <div className="container mx-auto px-8  flex items-center justify-between">
        {/* Logo Section */}
        <div className="logo relative flex">
          <img src="/logo.png" alt="logo" className="h-18" />
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white animate-pulse">
            JOBSPHERE
          </span>
        </div>

        {/* Menu Items */}
        <ul
          className={`menu flex flex-col md:flex-row md:items-center md:space-x-8 ${
            show
              ? "absolute top-full left-0 bg-green-800 w-full py-4 md:py-0"
              : "hidden md:flex"
          }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className="hover:text-gray-200"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className="hover:text-gray-200"
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className="hover:text-gray-200"
            >
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to="/applications/me"
              onClick={() => setShow(false)}
              className="hover:text-gray-200"
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link
                  to="/job/post"
                  onClick={() => setShow(false)}
                  className="hover:text-gray-200"
                >
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to="/job/me"
                  onClick={() => setShow(false)}
                  className="hover:text-gray-200"
                >
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : null}

          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-green-800 hover:bg-green-900 px-4 py-2 rounded-lg text-sm"
          >
            LOGOUT
          </button>
        </ul>

        {/* Hamburger Icon */}
        <div
          className="hamburger text-2xl cursor-pointer md:hidden"
          onClick={() => setShow(!show)}
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
