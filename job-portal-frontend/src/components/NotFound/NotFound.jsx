import React from "react";
import { Link } from "react-router-dom";

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
              className="inline-block px-6 py-3 text-2xl  text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600  focus:outline-none focus:ring-4 focus:ring-amber-300 transition-transform duration-300"
            >
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
