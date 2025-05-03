// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Review = () => {
//   const [reviewsGiven, setReviewsGiven] = useState([]);
//   const [reviewsReceived, setReviewsReceived] = useState([]);
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deleteModal, setDeleteModal] = useState({ show: false, reviewId: null });

//   const navigate = useNavigate();

//   // Fetch reviews of the logged-in user
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/review/review",
//           { withCredentials: true }
//         );
//         console.log(data);
//         setReviewsGiven(data.reviewsGiven);
//         setReviewsReceived(data.reviewsReceived);
//       } catch (error) {
//         console.error(error);
//         toast.error(
//           error.response?.data?.message || "Failed to fetch reviews."
//         );
//       }
//     };

//     fetchReviews();
//   }, []);

//   const toggleCard = (reviewId) => {
//     setExpandedCard((prev) => (prev === reviewId ? null : reviewId));
//   };

//   const handleDelete = async (reviewId) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.delete(
//         `http://localhost:4000/api/v1/review/${reviewId}`,
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Review deleted successfully!");
//       setReviewsGiven((prev) => prev.filter((review) => review._id !== reviewId));
//       setDeleteModal({ show: false, reviewId: null });
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to delete the review."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
//       <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-semibold text-gray-800">My Reviews</h1>
//           <button
//             onClick={() => navigate("/review/post")}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
//           >
//             Create Review
//           </button>
//         </div>

//         {reviewsGiven.length === 0 ? (
//           <h4 className="text-center text-gray-500 text-lg">
//             No Reviews Found
//           </h4>
//         ) : (
//           reviewsGiven.map((review) => (
//             <div
//               key={review._id}
//               className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out mb-6"
//             >
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Title:</span> {review.title || "No Title"}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Rating:</span> {review.rating}/5
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-semibold">Anonymous:</span>{" "}
//                     {review.isAnonymous ? "Yes" : "No"}
//                   </p>
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <button
//                     onClick={() => navigate(`/review/update/${review._id}`)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() =>
//                       setDeleteModal({ show: true, reviewId: review._id })
//                     }
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => toggleCard(review._id)}
//                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
//                   >
//                     {expandedCard === review._id ? "Collapse" : "Expand"}
//                   </button>
//                 </div>
//               </div>
//               {expandedCard === review._id && (
//                 <div className="mt-4 space-y-2">
//                   <p>
//                     <span className="font-semibold">Comments:</span>{" "}
//                     {review.comments || "No Comments"}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Work Quality:</span>{" "}
//                     {review.workQuality || "N/A"}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Professionalism:</span>{" "}
//                     {review.professionalism || "N/A"}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Communication:</span>{" "}
//                     {review.communication || "N/A"}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Workplace Quality:</span>{" "}
//                     {review.workPlaceQuality || "N/A"}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteModal.show && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-lg font-semibold mb-4">
//                 Are you sure you want to delete this review?
//               </h3>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setDeleteModal({ show: false, reviewId: null })}
//                   className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   No
//                 </button>
//                 <button
//                   onClick={() => handleDelete(deleteModal.reviewId)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//                   disabled={loading}
//                 >
//                   {loading ? "Deleting..." : "Yes"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Review;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const MyReview = () => {
  const [reviewsGiven, setReviewsGiven] = useState([]);
  const [reviewsReceived, setReviewsReceived] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, reviewId: null });

  const navigate = useNavigate();

  // Fetch reviews of the logged-in user
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/review/review",
          { withCredentials: true }
        );
        setReviewsGiven(data.reviewsGiven);
        setReviewsReceived(data.reviewsReceived);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch reviews."
        );
      }
    };

    fetchReviews();
  }, []);

  const toggleCard = (reviewId) => {
    setExpandedCard((prev) => (prev === reviewId ? null : reviewId));
  };

  const handleDelete = async (reviewId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/review/review/${reviewId}`,
        { withCredentials: true }
      );
      toast.success(data.message || "Review deleted successfully!");
      setReviewsGiven((prev) => prev.filter((review) => review._id !== reviewId));
      setReviewsReceived((prev) => prev.filter((review) => review._id !== reviewId));
      setDeleteModal({ show: false, reviewId: null });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to delete the review."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderReviewCard = (review, isGiven) => (
    <div
      key={review._id}
      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out mb-6"
    >
      <div className="flex justify-between items-center sm:flex-col md:flex-row">
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Title:</span> {review.title || "No Title"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Rating:</span> {review.rating}/5
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Anonymous:</span>{" "}
            {review.isAnonymous ? "Yes" : "No"}
          </p>
          {/* <p className="text-gray-700">
            <span className="font-semibold">Status:</span> {review.adminApproval || "Pending"}
          </p> */}

          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${review.adminApproval === "Approved"
                  ? "bg-green-100 text-green-800"
                  : review.adminApproval === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {review.adminApproval || "Pending"}
            </span>
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          {isGiven && (
            <>
              <button
                onClick={() => navigate(`/review/update/${review._id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={() =>
                  setDeleteModal({ show: true, reviewId: review._id })
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={() => toggleCard(review._id)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            {expandedCard === review._id ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
      {expandedCard === review._id && (
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Comments:</span>{" "}
            {review.comments || "No Comments"}
          </p>
          <p>
            <span className="font-semibold">Work Quality:</span>{" "}
            {review.workQuality || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Professionalism:</span>{" "}
            {review.professionalism || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Communication:</span>{" "}
            {review.communication || "N/A"}
          </p>
          {review.workPlaceQuality && (
            <p>
              <span className="font-semibold">Workplace Quality:</span>{" "}
              {review.workPlaceQuality}
            </p>
          )}
          {review.completedWork !== undefined && (
            <p>
              <span className="font-semibold">Completed Work:</span>{" "}
              {review.completedWork ? "Yes" : "No"}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">My Reviews</h1>
          <button
            onClick={() => navigate("/review/post")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Create Review
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Reviews Given
          </h2>
          {reviewsGiven.length === 0 ? (
            <h4 className="text-center text-gray-500 text-lg">
              No Reviews Given
            </h4>
          ) : (
            reviewsGiven.map((review) => renderReviewCard(review, true))
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Reviews Received
          </h2>
          {reviewsReceived.length === 0 ? (
            <h4 className="text-center text-gray-500 text-lg">
              No Reviews Received
            </h4>
          ) : (
            reviewsReceived.map((review) => renderReviewCard(review, false))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this review?
              </h3>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteModal({ show: false, reviewId: null })}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  No
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.reviewId)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyReview;