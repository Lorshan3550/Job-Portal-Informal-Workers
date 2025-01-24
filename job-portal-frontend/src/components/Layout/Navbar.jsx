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
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gray-800 text-white ${
        isAuthorized ? "navbarShow" : "navbarHide"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="logo relative">
          <img src="/logo.png" alt="logo" className="h-8" />
          <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white animate-pulse">
            JOBSPHERE
          </span>
        </div>
        <ul
          className={`flex space-x-6 md:space-x-8 ${
            !show ? "hidden md:flex" : "show-menu flex flex-col md:flex-row"
          }`}
        >
          <li>
            <Link
              to={"/"}
              className="hover:text-amber-400"
              onClick={() => setShow(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/job/getall"}
              className="hover:text-amber-400"
              onClick={() => setShow(false)}
            >
              All Jobs
            </Link>
          </li>
          <li>
            <Link
              to={"/applications/me"}
              className="hover:text-amber-400"
              onClick={() => setShow(false)}
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
                  to={"/job/post"}
                  className="hover:text-amber-400"
                  onClick={() => setShow(false)}
                >
                  Post New Jobs
                </Link>
              </li>
              <li>
                <Link
                  to={"/job/me"}
                  className="hover:text-amber-400"
                  onClick={() => setShow(false)}
                >
                  View Your Job
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>

        <div
          className="hamburger md:hidden text-2xl"
          onClick={() => setShow(!show)}
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
