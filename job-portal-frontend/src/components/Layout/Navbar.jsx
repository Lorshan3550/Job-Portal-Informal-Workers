import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../main";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await axios.get("", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`${
        isAuthorized ? "block" : "hidden"
      } fixed top-0 left-0 w-full bg-green-900 text-white shadow-lg z-50`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between ">
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
            <NavLink
              to="/"
              onClick={() => setShow(false)}
              className={({ isActive }) =>
                isActive
                  ? "hover:text-gray-200 bg-white text-green-900 px-4 py-2 rounded-lg"
                  : "hover:text-gray-200 hover:border-2 hover:border-white hover:rounded-lg px-4 py-2"
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutus"
              onClick={() => setShow(false)}
              className={({ isActive }) =>
                isActive
                  ? "hover:text-gray-200 bg-white text-green-900 px-4 py-2 rounded-lg"
                  : "hover:text-gray-200 hover:border-2 hover:border-white hover:rounded-lg px-4 py-2"
              }
            >
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/job/getall"
              onClick={() => setShow(false)}
              className={({ isActive }) =>
                isActive
                  ? "hover:text-gray-200 bg-white text-green-900 px-4 py-2 rounded-lg"
                  : "hover:text-gray-200 hover:border-2 hover:border-white hover:rounded-lg px-4 py-2"
              }
            >
              ALL JOBS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/applications/me"
              onClick={() => setShow(false)}
              className={({ isActive }) =>
                isActive
                  ? "hover:text-gray-200 bg-white text-green-900 px-4 py-2 rounded-lg"
                  : "hover:text-gray-200 hover:border-2 hover:border-white hover:rounded-lg px-4 py-2"
              }
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </NavLink>
          </li>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center space-x-2 px-4 py-2 hover:text-gray-200 hover:bg-green-800 rounded-lg"
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-green-900 rounded-lg shadow-lg">
                <NavLink
                  to="/profile/edit"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdown(false)}
                >
                  Edit 
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
