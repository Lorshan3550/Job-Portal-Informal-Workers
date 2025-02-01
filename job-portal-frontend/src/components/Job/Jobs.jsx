import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";

const AllJobs = () => {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "Construction Worker",
      location: "Kilinochchi",
      salary: "LKR 1500/hour",
    },
    {
      id: 2,
      title: "Warehouse Assistant",
      location: "Mullaitivu",
      salary: "LKR 1450/hour",
    },
    {
      id: 3,
      title: "Cleaning Staff",
      location: "Nallur, Jaffna",
      salary: "LKR 1800/hour",
    },
    {
      id: 4,
      title: "Delivery Driver",
      location: "Vavuniya",
      salary: "LKR 2100/hour",
    },
    {
      id: 5,
      title: "Farm Worker",
      location: "Maradana, Colombo",
      salary: "LKR 2300/hour",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Find Your Job
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by job title or location..."
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 shadow-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-500" size={20} />
        </div>

        {/* Job Listings */}
        <div className="grid gap-6 font-bold">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <div>
                  <h2 className="text-lg  text-gray-700 flex items-center gap-2">
                    <Briefcase className="" size={20} /> {job.title}
                  </h2>
                  <p className="text-gray-500 flex items-center gap-2">
                    <MapPin className="text-blue-500" size={20} />{" "}
                    {job.location}
                  </p>
                  <p className="text-green-700  text-lg">{job.salary}</p>
                </div>
                <button
                  onClick={() => navigate(`/apply/${job.id}`)}
                  className="border-2 border-green-700 text-green-700 px-5 py-3 rounded-lg hover:bg-green-800 hover:text-white transition"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
