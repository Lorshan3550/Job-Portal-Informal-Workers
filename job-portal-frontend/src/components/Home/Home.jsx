// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

// const Home = () => {
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobType, setJobType] = useState("");
//   const [placeholderText, setPlaceholderText] = useState("Search for jobs");

//   // Sample job data
//   const jobs = [
//     {
//       id: 1,
//       title: "Cleaner",
//       location: "Colombo",
//       type: "Full-time",
//       description: "Looking for a reliable cleaner.",
//     },
//     {
//       id: 2,
//       title: "Construction Worker",
//       location: "Kandy",
//       type: "Part-time",
//       description: "Construction job in need of workers.",
//     },
//     {
//       id: 3,
//       title: "Security Guard",
//       location: "Galle",
//       type: "Full-time",
//       description: "Secure and protect properties.",
//     },
//     {
//       id: 4,
//       title: "Driver",
//       location: "Colombo",
//       type: "Full-time",
//       description: "Looking for a reliable Driver.",
//     },
//     {
//       id: 5,
//       title: "Electrician",
//       location: "Mannar",
//       type: "Full-time",
//       description: "Looking for a skilled Electrician.",
//     },
//     {
//       id: 6,
//       title: "Plumber",
//       location: "Jaffna",
//       type: "Full-time",
//       description: "Looking for a skilled Plumber.",
//     },
//   ];

//   // Filter jobs based on search criteria
//   const filteredJobs = jobs.filter(
//     (job) =>
//       (search === "" ||
//         job.title.toLowerCase().includes(search.toLowerCase())) &&
//       (location === "" ||
//         job.location.toLowerCase().includes(location.toLowerCase())) &&
//       (jobType === "" || job.type.toLowerCase().includes(jobType.toLowerCase()))
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderText((prevText) => {
//         if (prevText === "Search for jobs") {
//           return "Search by District";
//         } else if (prevText === "Search by District") {
//           return "Search by Job Title";
//         } else {
//           return "Search for jobs";
//         }
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // Reset all filters
//   const handleReset = () => {
//     setSearch("");
//     setLocation("");
//     setJobType("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 animate-gradient mt-16">
//       <section className="container mx-auto py-6 px-4">
//         <div className="bg-gradient-to-r from-green-500 via-green-200 to-green-500 bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-lg relative overflow-hidden">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
//             Find a Job
//           </h2>
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex items-center border border-gray-300 rounded-lg w-full md:w-2/3 bg-white bg-opacity-30">
//               <FaSearch className="ml-3 text-gray-600" />
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 bg-transparent placeholder-gray-600 focus:outline-none"
//                 placeholder={placeholderText}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center border border-gray-300 rounded-lg w-full md:w-1/3 bg-white bg-opacity-30">
//               <FaMapMarkerAlt className="ml-3 text-gray-600" />
//               <input
//                 type="text"
//                 className="w-full px-4 py-2 bg-transparent placeholder-gray-600 focus:outline-none"
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 mb-6 justify-center">
//   <button
//     className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
//       jobType === "Full-time"
//         ? "bg-green-600 text-white"
//         : "bg-gray-200 hover:bg-green-500 hover:text-white"
//     }`}
//     onClick={() => setJobType("Full-time")}
//   >
//     Full-time
//   </button>
//   <button
//     className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
//       jobType === "Part-time"
//         ? "bg-green-600 text-white"
//         : "bg-gray-200 hover:bg-green-500 hover:text-white"
//     }`}
//     onClick={() => setJobType("Part-time")}
//   >
//     Part-time
//   </button>
// </div>

//           <div className="flex justify-center">
//             <button
//               onClick={handleReset}
//               className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="container mx-auto py-6 px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div
//                 key={job.id}
//                 className="bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {job.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 flex items-center space-x-2">
//                   <FaMapMarkerAlt className="text-green-700" />
//                   <span>{job.location}</span>
//                 </p>
//                 <p className="text-sm text-gray-600 mt-2">{job.description}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Job Type: {job.type}
//                 </p>
//                 <Link
//                   to={`/job/${job.id}`}
//                   className="mt-4 inline-block text-green-800 hover:text-green-900 font-semibold"
//                 >
//                   View Details →
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center text-gray-700">
//               No jobs found for your search criteria.
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <section className="homePage page pt-16">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
      </section>
    </>
  );
};

export default Home;