import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const Home = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search for jobs");

  // Sample job data
  const jobs = [
    { id: 1, title: "Cleaner", location: "Colombo", type: "Full-time", description: "Looking for a reliable cleaner." },
    { id: 2, title: "Construction Worker", location: "Kandy", type: "Part-time", description: "Construction job in need of workers." },
    { id: 3, title: "Security Guard", location: "Galle", type: "Full-time", description: "Secure and protect properties." },
    { id: 4, title: "Driver", location: "Colombo", type: "Full-time", description: "Looking for a reliable Driver." },
    { id: 5, title: "Gardener", location: "Kandy", type: "Part-time", description: "Construction job in need of workers." },
    { id: 6, title: "Plumber", location: "Galle", type: "Full-time", description: "Secure and protect properties." },
    { id: 7, title: "Cleaner", location: "Colombo", type: "Full-time", description: "Looking for a reliable cleaner." },
    { id: 8, title: "Construction Worker", location: "Kandy", type: "Part-time", description: "Construction job in need of workers." },
    { id: 9, title: "Security Guard", location: "Galle", type: "Full-time", description: "Secure and protect properties." },
    // Add more jobs as needed
  ];

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(
    (job) =>
      (search === "" || job.title.toLowerCase().includes(search.toLowerCase())) &&
      (location === "" || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (jobType === "" || job.type.toLowerCase().includes(jobType.toLowerCase()))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderText((prevText) => {
        if (prevText === "Search for jobs") {
          return "Search by District";
        } else if (prevText === "Search by District") {
          return "Search by Job Title";
        } else {
          return "Search for jobs";
        }
      });
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Reset all filters
  const handleReset = () => {
    setSearch("");
    setLocation("");
    setJobType("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      {/* Search and Filters */}
      <section className="container mx-auto py-6 px-4 ">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Find a Job</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex items-center border border-gray-300 rounded-md w-full md:w-2/3">
              <FaSearch className="ml-3 text-gray-600" />
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder={placeholderText}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ animation: "placeholderEffect 9s infinite" }} // Add running effect
              />
            </div>

            {/* Location Filter */}
            <div className="flex items-center border border-gray-300 rounded-md w-full md:w-1/3">
              <FaMapMarkerAlt className="ml-3 text-gray-600" />
              <input
                type="text"
                className="w-full px-4 py-2"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            {/* Job Type Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="fulltime"
                name="jobType"
                value="Full-time"
                checked={jobType === "Full-time"}
                onChange={() => setJobType("Full-time")}
              />
              <label htmlFor="fulltime" className="text-sm text-gray-700">
                Full-time
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="parttime"
                name="jobType"
                value="Part-time"
                checked={jobType === "Part-time"}
                onChange={() => setJobType("Part-time")}
              />
              <label htmlFor="parttime" className="text-sm text-gray-700">
                Part-time
              </label>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Reset Filters
            </button>
          </div>
          
        </div>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500 flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-green-800" />
                  <span>{job.location}</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                <p className="text-sm text-gray-500 mt-2">Job Type: {job.type}</p>
                <Link
                  to={`/job/${job.id}`}
                  className="mt-4 inline-block text-green-800 hover:text-green-900"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-700">
              No jobs found for your search criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;


