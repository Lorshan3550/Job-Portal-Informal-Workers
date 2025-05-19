// // import React, { useContext, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Context } from "../../main";

// // const Jobs = () => {
// //   const { isAuthorized } = useContext(Context);
// //   const navigateTo = useNavigate();
// //   const [searchQuery, setSearchQuery] = useState("");

// //   // Sample job data for UI testing
// //   const sampleJobs = [
// //     { _id: "1", title: "Construction Worker", category: "Construction", country: "Colombo" },
// //     { _id: "2", title: "Housekeeper", category: "Hospitality", country: "Galle" },
// //     { _id: "3", title: "Delivery Driver", category: "Logistics", country: "Kandy" },
// //     { _id: "4", title: "Warehouse Assistant", category: "Retail", country: "Kurunegala" },
// //     { _id: "5", title: "Security Guard", category: "Security", country: "Colombo" },
// //     { _id: "6", title: "Gardener", category: "Landscaping", country: "Matara" },
// //   ];

// //   // If user is not authorized, redirect to home
// //   if (!isAuthorized) {
// //     navigateTo("/");
// //   }

// //   // Filtering jobs based on search query
// //   const filteredJobs = sampleJobs.filter(
// //     (job) =>
// //       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       job.country.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   return (
// //     <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
// //           ALL AVAILABLE JOBS
// //         </h1>

// //         {/* Search Bar */}
// //         <div className="flex justify-center mb-6">
// //           <input
// //             type="text"
// //             placeholder="Search by Job Title, Category, or District..."
// //             className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>

// //         {/* Job Listings */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredJobs.length > 0 ? (
// //             filteredJobs.map((job) => (
// //               <div
// //                 key={job._id}
// //                 className="relative bg-gradient-to-br from-white to-gray-100 shadow-lg p-6 rounded-2xl border border-gray-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
// //               >
// //                 <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
// //                 <p className="text-gray-600 mt-2">{job.category}</p>
// //                 <p className="text-gray-500">{job.country}</p>

// //                 <Link
// //                   to={`/job/${job._id}`}
// //                   className="inline-block mt-5 bg-green-800 text-white text-lg rounded-full px-6 py-2 shadow-md border-2 border-transparent hover:border-white hover:bg-green-700 hover:scale-105 transition-all duration-300"
// //                 >
// //                   Job Details
// //                 </Link>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500 text-center col-span-full">
// //               No matching jobs found.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Jobs;

// // import React, { useContext, useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { Context } from "../../main";
// // import axios from "axios";

// // const Jobs = () => {
// //   const { isAuthorized } = useContext(Context);
// //   const navigateTo = useNavigate();
// //   const [jobs, setJobs] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!isAuthorized) {
// //       navigateTo("/"); // Redirect if not authorized
// //       return;
// //     }

// //     const fetchJobs = async () => {
// //       try {
// //         const { data } = await axios.get(
// //           "http://localhost:4000/api/v1/job/getall",
// //           { withCredentials: true }
// //         );
// //         setJobs(data.jobs);
// //       } catch (error) {
// //         console.error("Error fetching jobs:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchJobs();
// //   }, [isAuthorized, navigateTo]);

// //   // Filtering jobs based on search query
// //   const filteredJobs = jobs.filter(
// //     (job) =>
// //       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       job.district.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   if (loading) {
// //     return (
// //       <section className="min-h-screen flex justify-center items-center">
// //         <h2 className="text-2xl font-semibold text-gray-700">Loading jobs...</h2>
// //       </section>
// //     );
// //   }

// //   return (
// //     <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
// //           ALL AVAILABLE JOBS
// //         </h1>

// //         {/* Search Bar */}
// //         <div className="flex justify-center mb-6">
// //           <input
// //             type="text"
// //             placeholder="Search by Job Title, Category, or District..."
// //             className="w-full max-w-lg px-4 py-3 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 shadow-sm"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>

// //         {/* Job Listings */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredJobs.length > 0 ? (
// //             filteredJobs.map((job) => (
// //               <div
// //                 key={job._id}
// //                 className="relative bg-gradient-to-br from-white to-gray-100 shadow-lg p-6 rounded-2xl border border-gray-300 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
// //               >
// //                 <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
// //                 <p className="text-gray-600 mt-2">{job.category}</p>
// //                 <p className="text-gray-500 capitalize">{job.district}, {job.city}</p>

// //                 <Link
// //                   to={`/job/${job._id}`}
// //                   className="inline-block mt-5 bg-green-800 text-white text-lg rounded-full px-6 py-2 shadow-md border-2 border-transparent hover:border-white hover:bg-green-700 hover:scale-105 transition-all duration-300"
// //                 >
// //                   Job Details
// //                 </Link>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-500 text-center col-span-full">
// //               No matching jobs found.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Jobs;


// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// import axios from "axios";
// import { FaMoneyBillWave, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Import icons

// const Jobs = () => {
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 6;

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

//   // Filter jobs by search query
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.district.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const calculateDaysLeft = (deadline) => {
//     const now = new Date();
//     const end = new Date(deadline);
//     const difference = end - now;
//     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
//     return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
//   };

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
//         <div className="flex justify-center mb-8">
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
//           {currentJobs.length > 0 ? (
//             currentJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="relative bg-white shadow-lg p-6 rounded-2xl border hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
//               >
//                 <h2 className="text-2xl font-bold text-green-800 mb-2">{job.title}</h2>
//                 <p className="text-gray-600 mb-2">{job.category}</p>

//                 {/* Location */}
//                 <div className="flex items-center text-gray-500 text-sm mb-2">
//                   <FaMapMarkerAlt className="mr-2" />
//                   <span className="capitalize">{job.district}, {job.city}</span>
//                 </div>

//                 {/* Salary */}
//                 {job.fixedSalary && (
//                   <div className="flex items-center text-gray-500 text-sm mb-2">
//                     <FaMoneyBillWave className="mr-2" />
//                     <span>Rs. {job.fixedSalary.toLocaleString()}</span>
//                   </div>
//                 )}

//                 {/* Deadline */}
//                 <div className="flex items-center text-gray-500 text-sm mb-4">
//                   <FaClock className="mr-2" />
//                   <span>{calculateDaysLeft(job.applyDeadline)}</span>
//                 </div>

//                 {/* Job Details Link */}
//                 <Link
//                   to={`/job/${job._id}`}
//                   className="inline-block mt-2 bg-green-700 text-white text-lg rounded-full px-5 py-2 hover:bg-green-800 transition-all duration-300"
//                 >
//                   View Details ${job._id}
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No matching jobs found.
//             </p>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-10 space-x-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//             className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             disabled={indexOfLastJob >= filteredJobs.length}
//             onClick={() => paginate(currentPage + 1)}
//             className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
//           >
//             Next
//           </button>
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
// import { FaMoneyBillWave, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Import icons

// const Jobs = () => {
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 6;

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/job/getallapprovedjobs",
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
//   }, []);

//   // Filter jobs by search query
//   const filteredJobs = jobs.filter(
//     (job) =>
//       job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       job.district.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const calculateDaysLeft = (deadline) => {
//     const now = new Date();
//     const end = new Date(deadline);
//     const difference = end - now;
//     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
//     return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
//   };

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
//         <div className="flex justify-center mb-8">
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
//           {currentJobs.length > 0 ? (
//             currentJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="relative bg-white shadow-lg p-6 rounded-2xl border hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
//               >
//                 <h2 className="text-2xl font-bold text-green-800 mb-2">{job.title}</h2>
//                 <p className="text-gray-600 mb-2">{job.category}</p>

//                 {/* Location */}
//                 <div className="flex items-center text-gray-500 text-sm mb-2">
//                   <FaMapMarkerAlt className="mr-2" />
//                   <span className="capitalize">{job.district}, {job.city}</span>
//                 </div>

//                 {/* Salary */}
//                 {job.fixedSalary && (
//                   <div className="flex items-center text-gray-500 text-sm mb-2">
//                     <FaMoneyBillWave className="mr-2" />
//                     <span>Rs. {job.fixedSalary.toLocaleString()}</span>
//                   </div>
//                 )}

//                 {/* Deadline */}
//                 <div className="flex items-center text-gray-500 text-sm mb-4">
//                   <FaClock className="mr-2" />
//                   <span>{calculateDaysLeft(job.applyDeadline)}</span>
//                 </div>

//                 {/* Job Details Link */}
//                 <Link
//                   to={`/job/${job._id}`}
//                   className="inline-block mt-2 bg-green-700 text-white text-lg rounded-full px-5 py-2 hover:bg-green-800 transition-all duration-300"
//                 >
//                   View Details
//                 </Link>

//                 {/* Apply Button (only for authorized users) */}
//                 {isAuthorized && (
//                   <button
//                     onClick={() => navigateTo(`/application/${job._id}`)}
//                     className="inline-block mt-4 bg-blue-600 text-white text-lg rounded-full px-5 py-2 hover:bg-blue-700 transition-all duration-300"
//                   >
//                     Apply Now
//                   </button>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No matching jobs found.
//             </p>
//           )}
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-10 space-x-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => paginate(currentPage - 1)}
//             className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             disabled={indexOfLastJob >= filteredJobs.length}
//             onClick={() => paginate(currentPage + 1)}
//             className="px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
//           >
//             Next
//           </button>
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
// import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

// const Jobs = () => {
//   const { isAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [recommendedJobs, setRecommendedJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 5;

//   // Fetch all jobs, categories, and recommended jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/job/getallapprovedjobs",
//           { withCredentials: true }
//         );
//         setJobs(data.jobs);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/job/approved-jobs-by-category",
//           { withCredentials: true }
//         );
//         setCategories(data.categorizedJobs);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     const fetchRecommendedJobs = async () => {
//       if (user?.role === "JobSeeker") {
//         try {
//           const { data } = await axios.get(
//             "http://localhost:4000/api/v1/job/recommended-jobs",
//             { withCredentials: true }
//           );
//           setRecommendedJobs(data.jobs);
//         } catch (error) {
//           console.error("Error fetching recommended jobs:", error);
//         }
//       }
//     };

//     fetchJobs();
//     fetchCategories();
//     fetchRecommendedJobs();
//   }, [user]);

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const calculateDaysLeft = (deadline) => {
//     const now = new Date();
//     const end = new Date(deadline);
//     const difference = end - now;
//     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
//     return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
//   };

//   const handleSearch = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/job/search-approved-jobs",
//         { params: searchQuery, withCredentials: true }
//       );
//       setJobs(data.jobs);
//     } catch (error) {
//       console.error("Error searching jobs:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="min-h-screen flex justify-center items-center">
//         <h2 className="text-2xl font-semibold text-gray-700">Loading jobs...</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-12 px-4 mt-16">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Sidebar */}
//         <aside className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Job Categories</h2>
//           <ul className="space-y-2">
//             {Object.entries(categories).map(([category, { count }]) => (
//               <li key={category}>
//                 <button
//                   className={`w-full text-left px-4 py-2 rounded-lg ${
//                     count > 0
//                       ? "bg-green-100 hover:bg-green-200 text-green-800"
//                       : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   }`}
//                   onClick={() => count > 0 && setJobs(categories[category].jobs)}
//                   disabled={count === 0}
//                 >
//                   {category} ({count})
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="col-span-3">
//           {/* Search Bar */}
//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, title: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Category"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, category: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Skills"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({
//                     ...searchQuery,
//                     requiredSkills: e.target.value,
//                   })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Province"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, province: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="District"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, district: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, city: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Work Type"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, workType: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Education"
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({ ...searchQuery, education: e.target.value })
//                 }
//               />
//               <select
//                 className="border rounded-lg px-4 py-2"
//                 onChange={(e) =>
//                   setSearchQuery({
//                     ...searchQuery,
//                     isCVRequired: e.target.value,
//                   })
//                 }
//               >
//                 <option value="">CV Required?</option>
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//             <button
//               onClick={handleSearch}
//               className="mt-4 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
//             >
//               Search
//             </button>
//           </div>

//           {/* Recommended Jobs */}
//           {user?.role === "JobSeeker" && recommendedJobs.length > 0 && (
//             <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {recommendedJobs.map((job) => (
//                   <JobCard key={job._id} job={job} />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Job Listings */}
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">All Jobs</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {currentJobs.map((job) => (
//                 <JobCard key={job._id} job={job} />
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-6 space-x-4">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => paginate(currentPage - 1)}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <button
//                 disabled={indexOfLastJob >= jobs.length}
//                 onClick={() => paginate(currentPage + 1)}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// // Job Card Component
// const JobCard = ({ job }) => {
//   const calculateDaysLeft = (deadline) => {
//     const now = new Date();
//     const end = new Date(deadline);
//     const difference = end - now;
//     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
//     return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
//   };

//   return (
//     <div className="bg-white shadow-lg p-4 rounded-lg border hover:shadow-2xl transition-all duration-300">
//       <h3 className="text-lg font-semibold text-green-800">{job.title}</h3>
//       <p className="text-gray-600">{job.district}</p>
//       <p className="text-gray-500 text-sm">
//         <FaClock className="inline-block mr-1" />
//         {calculateDaysLeft(job.applyDeadline)}
//       </p>
//       <Link
//         to={`/job/${job._id}`}
//         className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// };

// export default Jobs;

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { sriLankaProvinces, workTypes, educationLevels, jobCategories, jobSkills } from "../Auth/_utils/constants";
import { useRef } from "react";

const Jobs = () => {
  const { user } = useContext(Context);
  const navigateTo = useNavigate();


  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState({});
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const jobsPerPage = 5;
  const [skillsFilter, setSkillsFilter] = useState(""); // For filtering the skills dropdown
  const [skillsFilter1, setSkillsFilter1] = useState(""); // For filtering the skills dropdown



  const [jobSeekerSearch, setJobSeekerSearch] = useState({
    skills: [],
    province: "",
    district: "",
    city: "",
  });
  const [jobSeekerResults, setJobSeekerResults] = useState([]);
  const [expandedJobSeeker, setExpandedJobSeeker] = useState(null);
  const [jobSeekerLoading, setJobSeekerLoading] = useState(false);


  // Fetch all jobs, categories, and recommended jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getallapprovedjobs",
          { withCredentials: true }
        );
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/approved-jobs-by-category",
          { withCredentials: true }
        );
        console.log("Fetch Categories : ", data)
        setCategories({ All: { jobs: [...jobs], count: [...jobs].length }, ...data.categorizedJobs });
        console.log("Fetch Categories : ", categories)

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecommendedJobs = async () => {
      if (user?.role === "JobSeeker") {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/api/v1/job/recommended-jobs",
            { withCredentials: true }
          );
          setRecommendedJobs(data.jobs);
        } catch (error) {
          console.error("Error fetching recommended jobs:", error);
        }
      }
    };

    fetchJobs();
    fetchCategories();
    fetchRecommendedJobs();
  }, [user]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const calculateDaysLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const difference = end - now;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
  };

  const handleSearch = async () => {
    try {
      console.log("search Query : ", searchQuery)
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/job/search-approved-jobs",
        { params: searchQuery, withCredentials: true }
      );
      setJobs(data.jobs);
      setSelectedCategory("Search Results");
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  const resetSearch = () => {
    setSearchQuery({});
    setSelectedCategory("All Jobs");
    fetchJobs();
  };

  // Handle skills input (multi-select or comma separated)
  const handleSkillsInput = (e) => {
    const value = e.target.value;
    setJobSeekerSearch((prev) => ({
      ...prev,
      skills: value
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s),
    }));
  };

  // Handle province change and reset district
  const handleProvinceChange = (e) => {
    setJobSeekerSearch((prev) => ({
      ...prev,
      province: e.target.value,
      district: "",
    }));
  };

  // Search JobSeekers
  const handleJobSeekerSearch = async () => {
    setJobSeekerLoading(true);
    try {
      const params = {
        ...jobSeekerSearch,
        skills: jobSeekerSearch.skills.join(","),
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/client/filter-jobseekers",
        { params, withCredentials: true }
      );
      setJobSeekerResults(data.jobSeekers);
    } catch (error) {
      setJobSeekerResults([]);
    }
    setJobSeekerLoading(false);
  };

  // Filter jobSkills based on the filter input
  const filteredJobSkills = jobSkills.filter(skill =>
    skill.toLowerCase().includes(skillsFilter.toLowerCase())
  );

  // Filter jobSkills based on the filter input
  const filteredJobSkills1 = jobSkills.filter(skill =>
    skill.toLowerCase().includes(skillsFilter1.toLowerCase())
  );

  // Reset JobSeeker search
  const resetJobSeekerSearch = () => {
    setJobSeekerSearch({ skills: [], province: "", district: "", city: "" });
    setJobSeekerResults([]);
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Categories</h2>
          <ul className="space-y-2">
            {Object.entries(categories).map(([category, { count }]) => (
              <li key={category}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${count > 0
                    ? "bg-green-100 hover:bg-green-200 text-green-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={() => {
                    if (count > 0) {
                      setJobs(categories[category].jobs);
                      setSelectedCategory(category);
                    }
                  }}
                  disabled={count === 0}
                >
                  {category} ({count})
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-span-3">
          {/* --- Search JobSeekers Section (Client Only) --- */}
          {user?.role === "Client" && (
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Search JobSeekers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Skills input (multi-select or comma separated) */}
                <input
                  type="text"
                  placeholder="Type to filter skills"
                  className="border rounded-lg px-4 py-2 mb-2 w-full"
                  value={skillsFilter1}
                  onChange={e => setSkillsFilter1(e.target.value)}
                />
                <select
                  multiple
                  className="border rounded-lg px-4 py-2 h-32 w-full"
                  value={jobSeekerSearch.skills}
                  onChange={e => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setJobSeekerSearch(prev => ({ ...prev, skills: selected }));
                  }}
                >
                  {filteredJobSkills1.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>

                {/* Province */}
                <select
                  className="border rounded-lg px-4 py-2"
                  value={jobSeekerSearch.province}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {sriLankaProvinces.map((prov) => (
                    <option key={prov.province} value={prov.province}>
                      {prov.province}
                    </option>
                  ))}
                </select>
                {/* District */}
                <select
                  className="border rounded-lg px-4 py-2"
                  value={jobSeekerSearch.district}
                  onChange={(e) =>
                    setJobSeekerSearch((prev) => ({
                      ...prev,
                      district: e.target.value,
                    }))
                  }
                  disabled={!jobSeekerSearch.province}
                >
                  <option value="">Select District</option>
                  {sriLankaProvinces
                    .find((prov) => prov.province === jobSeekerSearch.province)
                    ?.districts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                </select>
                {/* City */}
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-lg px-4 py-2"
                  value={jobSeekerSearch.city}
                  onChange={(e) =>
                    setJobSeekerSearch((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleJobSeekerSearch}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
                  disabled={jobSeekerLoading}
                >
                  {jobSeekerLoading ? "Searching..." : "Search"}
                </button>
                <button
                  onClick={resetJobSeekerSearch}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  disabled={jobSeekerLoading}
                >
                  Reset
                </button>
              </div>
              {/* Results */}
              {jobSeekerResults.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Found {jobSeekerResults.length} JobSeeker(s)
                  </h3>
                  <div className="space-y-4">
                    {jobSeekerResults.map((js) => (
                      <div
                        key={js._id}
                        className="bg-gray-50 border rounded-lg shadow p-4 transition-all"
                      >
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() =>
                            setExpandedJobSeeker(
                              expandedJobSeeker === js._id ? null : js._id
                            )
                          }
                        >
                          <div>
                            <span className="font-semibold text-green-800">
                              {js.firstName} {js.lastName}
                            </span>
                            <span className="ml-2 text-gray-600">
                              ({js.district})
                            </span>
                          </div>
                          <button className="text-green-700 font-bold">
                            {expandedJobSeeker === js._id ? "Hide" : "View"}
                          </button>
                        </div>
                        {expandedJobSeeker === js._id && (
                          <div className="mt-4 text-gray-700 space-y-2">
                            <div>
                              <strong>Email:</strong> {js.email}
                            </div>
                            <div>
                              <strong>Phone:</strong> {js.phone}
                            </div>
                            <div>
                              <strong>Province:</strong> {js.province}
                            </div>
                            <div>
                              <strong>City:</strong> {js.location}
                            </div>
                            <div>
                              <strong>Skills:</strong>{" "}
                              {js.skills && js.skills.length > 0
                                ? js.skills.join(", ")
                                : "N/A"}
                            </div>
                            <div>
                              <strong>Personal Summary:</strong>{" "}
                              {js.personalSummary || "N/A"}
                            </div>
                            <div>
                              <strong>Achievements:</strong>{" "}
                              {js.achievements && js.achievements.length > 0
                                ? js.achievements.join(", ")
                                : "N/A"}
                            </div>
                            <div>
                              <strong>Work Experiences:</strong>{" "}
                              {js.workExperiences && js.workExperiences.length > 0
                                ? js.workExperiences.join(", ")
                                : "N/A"}
                            </div>
                            <div>
                              <strong>Date of Birth:</strong>{" "}
                              {js.dateOfBirth
                                ? new Date(js.dateOfBirth).toLocaleDateString()
                                : "N/A"}
                            </div>
                            <div>
                              <strong>Gender:</strong> {js.gender}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {jobSeekerResults.length === 0 && jobSeekerLoading === false && (
                <div className="mt-8 text-gray-500 text-center">
                  No job seekers found.
                </div>
              )}
            </div>
          )}
          {/* --- End Search JobSeekers Section --- */}
          {/* Search Bar */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Search Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border rounded-lg px-4 py-2"
                value={searchQuery.title || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, title: e.target.value })
                }
              />

              {/* Category */}
              <select
                className="border rounded-lg px-4 py-2"
                value={searchQuery.category || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {jobCategories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Type to filter skills"
                className="border rounded-lg px-4 py-2 mb-2 w-full"
                value={skillsFilter}
                onChange={e => setSkillsFilter(e.target.value)}
              />
              <select
                multiple
                className="border rounded-lg px-4 py-2 h-32 w-full"
                value={searchQuery.requiredSkills ? searchQuery.requiredSkills.split(",") : []}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setSearchQuery({ ...searchQuery, requiredSkills: selected.join(",") });
                }}
              >
                {filteredJobSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-lg px-4 py-2"
                value={searchQuery.province || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, province: e.target.value })
                }
              >
                <option value="">Select Province</option>
                {sriLankaProvinces.map((prov) => (
                  <option key={prov.province} value={prov.province}>
                    {prov.province}
                  </option>
                ))}
              </select>
              <select
                className="border rounded-lg px-4 py-2"
                value={searchQuery.district || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, district: e.target.value })
                }
              >
                <option value="">Select District</option>
                {sriLankaProvinces
                  .find((prov) => prov.province === searchQuery.province)
                  ?.districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                placeholder="City"
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, city: e.target.value })
                }
              />
              <select
                className="border rounded-lg px-4 py-2"
                value={searchQuery.workType || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, workType: e.target.value })
                }
              >

                <option value="">Select Work Type</option>
                {workTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                className="border rounded-lg px-4 py-2"
                value={searchQuery.education || ""}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, education: e.target.value })
                }
              >
                <option value="">Select Education Level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    isCVRequired: e.target.value,
                  })
                }
              >
                <option value="">CV Required?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleSearch}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
              >
                Search
              </button>
              <button
                onClick={resetSearch}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>

          {/* All Jobs */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={indexOfLastJob >= jobs.length}
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Recommended Jobs */}
          {user?.role === "JobSeeker" && recommendedJobs.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

// Job Card Component
const JobCard = ({ job }) => {
  const calculateDaysLeft = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const difference = end - now;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed";
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg border hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-green-800">{job.title}</h3>
      <p className="text-gray-600">{job.district}</p>
      <p className="text-gray-500 text-sm">
        <FaClock className="inline-block mr-1" />
        {calculateDaysLeft(job.applyDeadline)}
      </p>
      <Link
        to={`/job/${job._id}`}
        className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
      >
        View Details
      </Link>
    </div>
  );
};

export default Jobs;
