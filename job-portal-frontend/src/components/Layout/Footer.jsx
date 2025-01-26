import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGoogle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer
      className={`${
        isAuthorized ? "block" : "hidden"
      } bg-green-50 py-8 text-center`}
    >
      {/* Navigation Links */}

      {/* Social Media Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md px-8 py-6 flex flex-col items-center justify-center hover:bg-green-100 transition">
          <FaFacebook className="text-green-800 text-3xl mb-2" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on Facebook
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaInstagram className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Find us on Instagram
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaLinkedin className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Find us on LinkedIn
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaTwitter className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Find us on Twitter
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaGoogle className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Find us on Google
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaPhone className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Call us now
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <FaEnvelope className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center">
            Send us an Email
          </span>
        </div>
      </div>

      {/* App Links */}

      {/* Footer Note */}
      <div className="bg-green-900 text-white py-6">
        <p className="text-sm">2025 JobSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
