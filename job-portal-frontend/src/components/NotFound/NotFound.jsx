import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const NotFound = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white text-center">
        <div className="space-y-8">
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
            <h3 className="text-sm  text-gray-800 mt-4 mb-6 text-center leading-relaxed">
              Sorry, the page you look for doesn't exist.
            </h3>
          </section>

          {/* Button Section */}
          <section>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-2xl text-green-900 rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-800 transition-transform duration-300">
              Back to Home
              <FaArrowRight className="ml-1 text-lg" />{" "}
              {/* Right arrow icon with margin */}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
