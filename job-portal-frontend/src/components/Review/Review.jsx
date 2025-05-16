// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";

// const Review = () => {
//   const [activeTab, setActiveTab] = useState("Client Reviews");
//   const [clientReviews, setClientReviews] = useState({});
//   const [jobSeekerReviews, setJobSeekerReviews] = useState({});
//   const [jobSortOrder, setJobSortOrder] = useState("recent");
//   const [reviewSortOrder, setReviewSortOrder] = useState("recent");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/review/approved-and-notflagged",
//           { withCredentials: true }
//         );
//         setClientReviews(data.clientReviews);
//         setJobSeekerReviews(data.jobSeekerReviews);
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const sortJobs = (jobs) => {
//     return Object.entries(jobs).sort(([jobIdA, jobA], [jobIdB, jobB]) => {
//       const dateA = moment(jobA.reviews[0]?.createdAt || jobA.reviews[0]?.updatedAt);
//       const dateB = moment(jobB.reviews[0]?.createdAt || jobB.reviews[0]?.updatedAt);
//       return jobSortOrder === "recent" ? dateB - dateA : dateA - dateB;
//     });
//   };

//   const sortReviews = (reviews) => {
//     return [...reviews].sort((a, b) => {
//       const dateA = moment(a.createdAt || a.updatedAt);
//       const dateB = moment(b.createdAt || b.updatedAt);
//       return reviewSortOrder === "recent" ? dateB - dateA : dateA - dateB;
//     });
//   };

//   const renderReviews = (reviews) => {
//     const sortedReviews = sortReviews(reviews);

//     return sortedReviews.map((review) => (
//       <div
//         key={review._id}
//         className="border rounded-lg p-4 mb-4 shadow-md bg-white"
//       >
//         <div className="flex justify-between items-center">
//           <h5 className="font-semibold text-lg">
//             {review.isAnonymous
//               ? review.type === "JobSeekerToClient"
//                 ? "Anonymous JobSeeker"
//                 : "Anonymous Client"
//               : `${review.reviewerId.firstName} ${review.reviewerId.lastName}`}
//           </h5>
//           <span className="text-sm text-gray-500">
//             {moment(review.createdAt).format("MMM DD, YYYY")}
//           </span>
//         </div>
//         <p className="text-gray-700 mt-2">
//           <span className="font-semibold">Title:</span> {review.title}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Rating:</span> {review.rating}/5
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Comments:</span> {review.comments}
//         </p>
//         <button
//           className="text-blue-500 mt-2"
//           onClick={() => alert(JSON.stringify(review, null, 2))}
//         >
//           View More Details
//         </button>
//       </div>
//     ));
//   };

//   const renderJobs = (jobs) => {
//     const sortedJobs = sortJobs(jobs);

//     return sortedJobs.map(([jobId, job]) => (
//       <div key={jobId} className="mb-6">
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//           <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-xl">{job.jobTitle}</h4>
//             <span className="text-sm text-gray-500">
//               {job.reviews.length} Review(s)
//             </span>
//           </div>
//         </div>
//         <div className="mt-4">{renderReviews(job.reviews)}</div>
//       </div>
//     ));
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">Reviews</h1>
//       <div className="flex justify-center space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "Client Reviews"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => handleTabChange("Client Reviews")}
//         >
//           Client Reviews
//         </button>
//         <button
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "JobSeeker Reviews"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => handleTabChange("JobSeeker Reviews")}
//         >
//           JobSeeker Reviews
//         </button>
//       </div>

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <label className="font-semibold text-gray-700 mr-2">Sort Jobs:</label>
//           <select
//             className="border rounded-lg px-3 py-2"
//             onChange={(e) => setJobSortOrder(e.target.value)}
//           >
//             <option value="recent">Recent to Old</option>
//             <option value="oldest">Old to Recent</option>
//           </select>
//         </div>
//         <div>
//           <label className="font-semibold text-gray-700 mr-2">
//             Sort Reviews:
//           </label>
//           <select
//             className="border rounded-lg px-3 py-2"
//             onChange={(e) => setReviewSortOrder(e.target.value)}
//           >
//             <option value="recent">Recent to Old</option>
//             <option value="oldest">Old to Recent</option>
//           </select>
//         </div>
//       </div>

//       <div>
//         {activeTab === "Client Reviews"
//           ? renderJobs(clientReviews)
//           : renderJobs(jobSeekerReviews)}
//       </div>
//     </div>
//   );
// };

// export default Review;

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Review = () => {
  const [activeTab, setActiveTab] = useState("Client Reviews");
  const [clientReviews, setClientReviews] = useState({});
  const [jobSeekerReviews, setJobSeekerReviews] = useState({});
  const [jobSortOrder, setJobSortOrder] = useState("recent");
  const [reviewSortOrder, setReviewSortOrder] = useState("recent");
  const [expandedJobs, setExpandedJobs] = useState({});
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/review/approved-and-notflagged",
          { withCredentials: true }
        );
        setClientReviews(data.clientReviews);
        setJobSeekerReviews(data.jobSeekerReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleJobExpansion = (jobId) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const sortJobs = (jobs) => {
    return Object.entries(jobs).sort(([jobIdA, jobA], [jobIdB, jobB]) => {
      const dateA = moment(jobA.reviews[0]?.createdAt || jobA.reviews[0]?.updatedAt);
      const dateB = moment(jobB.reviews[0]?.createdAt || jobB.reviews[0]?.updatedAt);
      return jobSortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });
  };

  const sortReviews = (reviews) => {
    return [...reviews].sort((a, b) => {
      const dateA = moment(a.createdAt || a.updatedAt);
      const dateB = moment(b.createdAt || b.updatedAt);
      return reviewSortOrder === "recent" ? dateB - dateA : dateA - dateB;
    });
  };

  const renderReviews = (reviews) => {
    const sortedReviews = sortReviews(reviews);

    return sortedReviews.map((review) => (
      <div
        key={review._id}
        className="border rounded-lg p-4 mb-4 shadow-md bg-white"
      >
        <div className="flex justify-between items-center">
          <h5 className="font-semibold text-lg">
            {review.isAnonymous
              ? review.type === "JobSeekerToClient"
                ? "Anonymous JobSeeker"
                : "Anonymous Client"
              : `${review.reviewerId.firstName} ${review.reviewerId.lastName}`}
          </h5>
          <span className="text-sm text-gray-500">
            {moment(review.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">{review.type === "JobSeekerToClient" 
          ? "Client Name"
          : "JobSeeker Name"}:</span> 
          {review.revieweeId.firstName} {review.revieweeId.lastName}
        </p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Title:</span> {review.title}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Rating:</span> {review.rating}/5
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Comments:</span> {review.comments}
        </p>
        <button
          className="text-blue-500 mt-2"
          onClick={() => toggleReviewExpansion(review._id)}
        >
          {expandedReviews[review._id] ? "Hide Details" : "View More Details"}
        </button>
        {expandedReviews[review._id] && (
          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">Professionalism:</span>{" "}
              {review.professionalism || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Communication:</span>{" "}
              {review.communication || "N/A"}
            </p>
            {review.type === "JobSeekerToClient" && (
              <p className="text-gray-700">
                <span className="font-semibold">Workplace Quality:</span>{" "}
                {review.workPlaceQuality || "N/A"}
              </p>
            )}
            {review.type === "ClientToJobSeeker" && (
              <p className="text-gray-700">
                <span className="font-semibold">Work Quality:</span>{" "}
                {review.workQuality || "N/A"}
              </p>
            )}
          </div>
        )}
      </div>
    ));
  };

  const renderJobs = (jobs) => {
    const sortedJobs = sortJobs(jobs);

    return sortedJobs.map(([jobId, job]) => (
      <div key={jobId} className="mb-6">
        <div
          className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
          onClick={() => toggleJobExpansion(jobId)}
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl">{job.jobTitle}</h4>
            <span className="text-sm text-gray-500">
              {job.reviews.length} Review(s)
            </span>
          </div>
        </div>
        {expandedJobs[jobId] && (
          <div className="mt-4">{renderReviews(job.reviews)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Reviews</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "Client Reviews"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("Client Reviews")}
        >
          Client Reviews
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "JobSeeker Reviews"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("JobSeeker Reviews")}
        >
          JobSeeker Reviews
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="font-semibold text-gray-700 mr-2">Sort Jobs:</label>
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setJobSortOrder(e.target.value)}
          >
            <option value="recent">Recent to Old</option>
            <option value="oldest">Old to Recent</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-gray-700 mr-2">
            Sort Reviews:
          </label>
          <select
            className="border rounded-lg px-3 py-2"
            onChange={(e) => setReviewSortOrder(e.target.value)}
          >
            <option value="recent">Recent to Old</option>
            <option value="oldest">Old to Recent</option>
          </select>
        </div>
      </div>

      <div>
        {activeTab === "Client Reviews"
          ? renderJobs(clientReviews)
          : renderJobs(jobSeekerReviews)}
      </div>
    </div>
  );
};

export default Review;