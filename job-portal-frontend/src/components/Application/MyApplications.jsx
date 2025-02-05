import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-3xl font-bold text-green-800 mb-4">Welcome to the Job Portal for Non-Skilled Workers</h1>
    <p className="text-gray-600 text-lg mb-6 text-center max-w-md">
      Find job opportunities easily and apply with just a few clicks.
    </p>
    <Link to="/jobs" className="bg-green-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
      Browse Jobs
    </Link>
  </div>
);

const Jobs = () => (
  <div className="min-h-screen bg-gray-100 p-6">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Available Jobs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-800">Construction Worker</h3>
        <p className="text-gray-600">Location: Colombo</p>
        <button className="mt-3 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Apply Now
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-800">Warehouse Helper</h3>
        <p className="text-gray-600">Location: Kandy</p>
        <button className="mt-3 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <nav className="bg-green-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-white text-lg font-bold">Job Portal</Link>
          <div>
            <Link to="/" className="text-white px-4">Home</Link>
            <Link to="/jobs" className="text-white px-4">Jobs</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
};

export default App;
