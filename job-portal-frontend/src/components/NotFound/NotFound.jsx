// import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Footer from "../Layout/Footer";

const NotFound = () => {
  const navigate = useNavigate();  // Initialize navigate function

  const handleClick = () => {
    navigate("/");  // Redirect to the home page
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (Fixed at the top) */}
      <nav className="bg-green-800 text-white fixed top-0 left-0 w-full z-10 py-4">
        {/* Navbar content */}
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-white text-center mt-16">
        <div className="space-y-8 max-w-md mx-auto">
          {/* Image Section */}
          <section className="flex justify-center">
            <img
              src="/notfound1.jpg"
              alt="notfound"
              className="max-w-xs mx-auto border-2 border-gray-300 rounded-lg shadow-xl"
            />
          </section>

          {/* Error Message Section */}
          <section>
            <h4 className="text-sm text-gray-800 mt-4 mb-6 text-center leading-relaxed">
              Sorry, the page you look for doesn't exist.
            </h4>
          </section>

          {/* Button Section */}
          <section>
            <button
              onClick={handleClick}  // Add the onClick event handler
              className="bg-green-800 hover:bg-green-900 focus:ring-2 focus:ring-green-800 active:bg-green-900 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
              Back to Home
            </button>
          </section>
        </div>
      </div>

      {/* Footer (Fixed at the bottom) */}
      <Footer/>
    </div>
  );
};

export default NotFound;
