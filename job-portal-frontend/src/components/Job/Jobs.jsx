// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../../main";

// const Jobs = () => {
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Sample job data for UI testing
//   const sampleJobs = [
//     { _id: "1", title: "Construction Worker", category: "Construction", country: "Colombo" },
//     { _id: "2", title: "Housekeeper", category: "Hospitality", country: "Galle" },
//     { _id: "3", title: "Delivery Driver", category: "Logistics", country: "Kandy" },
//     { _id: "4", title: "Warehouse Assistant", category: "Retail", country: "Kurunegala" },
//     { _id: "5", title: "Security Guard", category: "Security", country: "Colombo" },
//     { _id: "6", title: "Gardener", category: "Landscaping", country: "Matara" },
//   ];

//   // If user is not authorized, redirect to home
//   if (!isAuthorized) {
//     navigateTo("/");
//   }

//   // Filtering jobs based on search query
//   const filteredJobs = sampleJobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.country.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           ALL AVAILABLE JOBS
//         </h1>

//         {/* Search Bar */}
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search by Job Title, Category, or District..."
//             className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Job Listings */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="relative bg-gradient-to-br from-white to-gray-100 shadow-lg p-6 rounded-2xl border border-gray-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
//                 <p className="text-gray-600 mt-2">{job.category}</p>
//                 <p className="text-gray-500">{job.country}</p>

//                 <Link
//                   to={`/job/${job._id}`}
//                   className="inline-block mt-5 bg-green-800 text-white text-lg rounded-full px-6 py-2 shadow-md border-2 border-transparent hover:border-white hover:bg-green-700 hover:scale-105 transition-all duration-300"
//                 >
//                   Job Details
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No matching jobs found.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Jobs;

// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// import axios from "axios";

// const Jobs = () => {
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/"); // Redirect if not authorized
//       return;
//     }

//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/job/getall",
//           { withCredentials: true }
//         );
//         setJobs(data.jobs);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [isAuthorized, navigateTo]);

//   // Filtering jobs based on search query
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.district.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <section className="min-h-screen flex justify-center items-center">
//         <h2 className="text-2xl font-semibold text-gray-700">Loading jobs...</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           ALL AVAILABLE JOBS
//         </h1>

//         {/* Search Bar */}
//         <div className="flex justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search by Job Title, Category, or District..."
//             className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Job Listings */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="relative bg-gradient-to-br from-white to-gray-100 shadow-lg p-6 rounded-2xl border border-gray-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
//               >
//                 <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
//                 <p className="text-gray-600 mt-2">{job.category}</p>
//                 <p className="text-gray-500 capitalize">{job.district}, {job.city}</p>

//                 <Link
//                   to={`/job/${job._id}`}
//                   className="inline-block mt-5 bg-green-800 text-white text-lg rounded-full px-6 py-2 shadow-md border-2 border-transparent hover:border-white hover:bg-green-700 hover:scale-105 transition-all duration-300"
//                 >
//                   Job Details
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No matching jobs found.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Jobs;


import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { FaMoneyBillWave, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Import icons

const Jobs = () => {
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/"); // Redirect if not authorized
      return;
    }

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getall",
          { withCredentials: true }
        );
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]);

  // Filter jobs by search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateDaysLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const difference = end - now;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
  };

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Loading jobs...</h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          ALL AVAILABLE JOBS
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by Job Title, Category, or District..."
            className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div
                key={job._id}
                className="relative bg-white shadow-lg p-6 rounded-2xl border hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <h2 className="text-2xl font-bold text-green-800 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.category}</p>

                {/* Location */}
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span className="capitalize">{job.district}, {job.city}</span>
                </div>

                {/* Salary */}
                {job.fixedSalary && (
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <FaMoneyBillWave className="mr-2" />
                    <span>Rs. {job.fixedSalary.toLocaleString()}</span>
                  </div>
                )}

                {/* Deadline */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaClock className="mr-2" />
                  <span>{calculateDaysLeft(job.applyDeadline)}</span>
                </div>

                {/* Job Details Link */}
                <Link
                  to={`/job/${job._id}`}
                  className="inline-block mt-2 bg-green-700 text-white text-lg rounded-full px-5 py-2 hover:bg-green-800 transition-all duration-300"
                >
                  View Details ${job._id}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No matching jobs found.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={indexOfLastJob >= filteredJobs.length}
            onClick={() => paginate(currentPage + 1)}
            className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
};

export default Jobs;


