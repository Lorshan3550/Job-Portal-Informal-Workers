import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleVerifyCode = (e) => {
    e.preventDefault();

    // Simulated correct verification code
    const correctCode = "123456";

    if (!code) {
      setMessage("Please enter the verification code.");
      return;
    }

    if (code !== correctCode) {
      setMessage("Invalid verification code. Try again.");
      return;
    }

    setMessage("Verification successful!");

    // Redirect to Reset Password page after 2 seconds
    setTimeout(() => {
      navigate("/reset-password");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Verify Code
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        {message && (
          <p className="text-sm text-center text-green-800 bg-green-100 p-2 rounded-lg mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleVerifyCode}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Verification Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800 transition"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
