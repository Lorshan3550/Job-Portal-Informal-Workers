import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          How Career Connect Works!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Account Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => navigate("/register")} // Navigate to register page
          >
            <FaUserPlus className="text-5xl text-green-600 mb-4" />
            <p className="text-xl font-semibold">Create Account</p>
            <p className="text-gray-600 mt-2">
              Sign up to access personalized features, track progress, manage
              preferences, and stay updated with offers. Join our community for
              a more convenient, customized experience.
            </p>
          </div>

          {/* Find a Job/Post a Job Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <MdFindInPage className="text-5xl text-blue-600 mb-4" />
            <p className="text-xl font-semibold">Find a Job/Post a Job</p>
            <p className="text-gray-600 mt-2">
              Find or post jobs easily, whether you're looking for non-skilled
              work or hiring. Our platform connects workers and employers for
              fast, reliable opportunities.
            </p>
          </div>

          {/* Apply for Job Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <IoMdSend className="text-5xl text-purple-600 mb-4" />
            <p className="text-xl font-semibold">
              Apply For Job/Recruit Suitable Candidates
            </p>
            <p className="text-gray-600 mt-2">
              Apply for non-skilled jobs or recruit the right candidates
              quickly. Our platform connects employers with hardworking
              individuals, streamlining the hiring process for both parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
