import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../main";
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
  const [showPhone, setShowPhone] = useState(false);
  const { isAuthorized } = useContext(Context);

  const handlePhoneClick = () => {
    setShowPhone(!showPhone);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+94 77 234 5678")
      .then(() => {
        alert("Phone number copied to clipboard!");
        setShowPhone(false); // Hide the phone number section after copying
      })
      .catch((err) => {
        console.error("Failed to copy phone number: ", err);
      });
  };

  // Close the phone number section when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".phone-section")) {
        setShowPhone(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <footer
      // className={`${
      //   isAuthorized ? "block" : "hidden"
      // } bg-green-50 py-8 text-center`}
    >
      {/* Social Media Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <a
          href="https://www.facebook.com" // Link to Facebook
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center justify-center hover:bg-green-100 transition"
        >
          <FaFacebook className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on Facebook
          </span>
        </a>

        <a
          href="https://www.instagram.com" // Link to Instagram
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition"
        >
          <FaInstagram className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on Instagram
          </span>
        </a>

        <a
          href="https://www.linkedin.com" // Link to LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition"
        >
          <FaLinkedin className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on LinkedIn
          </span>
        </a>

        <a
          href="https://www.twitter.com" // Link to Twitter
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition"
        >
          <FaTwitter className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on Twitter
          </span>
        </a>

        <a
          href="https://www.google.com" // Link to Google
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition"
        >
          <FaGoogle className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Find us on Google
          </span>
        </a>

        {/* Phone Section */}
        <div
          className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition phone-section cursor-pointer"
          onClick={handlePhoneClick} // Make the entire section clickable
        >
          <FaPhone className="text-green-800 text-2xl mb-3" />
          <span className="text-black-700 font-medium text-center text-sm">
            Call us now
          </span>

          {showPhone && (
            <div className="mt-2">
              <span className="text-green-800 font-medium text-lg">
                +94 77 234 5678
              </span>
              <button
                onClick={handleCopyPhone}
                className="ml-4 bg-green-800 text-white px-2 py-1 rounded-md hover:bg-green-900 transition"
              >
                Copy Number
              </button>
            </div>
          )}
        </div>

        {/* Email Section */}
        <div className="bg-white rounded-lg shadow-md px-6 py-4 flex flex-col items-center hover:bg-green-100 transition">
          <a href="mailto:jobsphere@gmail.com" className="flex flex-col items-center">
            <FaEnvelope className="text-green-800 text-2xl mb-3" />
            <span className="text-black-700 font-medium text-center text-sm">
              Send us an Email
            </span>
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-green-900 text-white py-6">
        <p className="text-sm font-semibold">&copy; 2025 JOBSPHERE. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
