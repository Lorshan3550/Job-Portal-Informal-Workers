import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("ClientToJobSeeker");
  const [activeSubTab, setActiveSubTab] = useState("All Reviews");
  const [flaggingReview, setFlaggingReview] = useState(null);
  const [flaggedReason, setFlaggedReason] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/review/reviews",
          { withCredentials: true }
        );
        setReviews(data.reviews);
        filterReviews(data.reviews, activeTab, activeSubTab);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        toast.error("Failed to fetch reviews.");
      }
    };

    fetchReviews();
  }, [activeTab, activeSubTab]);

  const filterReviews = (allReviews, tab, subTab) => {
    let filtered = allReviews.filter((review) => review.type === tab);

    if (subTab === "Flagged Reviews") {
      filtered = filtered.filter((review) => review.flagged);
    } else if (subTab === "Pending Reviews") {
      filtered = filtered.filter((review) => review.adminApproval === "Pending");
    } else if (subTab === "Approved Reviews") {
      filtered = filtered.filter((review) => review.adminApproval === "Approved");
    } else if (subTab === "Rejected Reviews") {
      filtered = filtered.filter((review) => review.adminApproval === "Rejected");
    }

    setFilteredReviews(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveSubTab("All Reviews");
  };

  const handleSubTabChange = (subTab) => {
    setActiveSubTab(subTab);
  };

  const handleFlagSubmit = async (reviewId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/review/flag/${reviewId}`,
        { flagged: true, flaggedReason },
        { withCredentials: true }
      );
      toast.success("Review flagged successfully!");
      setFlaggingReview(null);
      setFlaggedReason("");

      // Refresh reviews
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/review/reviews",
        { withCredentials: true }
      );
      setReviews(data.reviews);
      filterReviews(data.reviews, activeTab, activeSubTab);
    } catch (error) {
      console.error("Failed to flag review:", error);
      toast.error("Failed to flag review.");
    }
  };

  const handleAction = async (reviewId, action) => {
    try {
      if (["Approved", "Rejected", "Pending"].includes(action)) {
        await axios.put(
          `http://localhost:4000/api/v1/review/review/adminApproval/${reviewId}`,
          { adminApproval: action },
          { withCredentials: true }
        );
        toast.success(`Review marked as ${action}!`);
      } else if (action === "Delete") {
        await axios.delete(
          `http://localhost:4000/api/v1/review/delete-review/${reviewId}`,
          { withCredentials: true }
        );
        toast.success("Review deleted successfully!");
      }

      // Refresh reviews
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/review/reviews",
        { withCredentials: true }
      );
      setReviews(data.reviews);
      filterReviews(data.reviews, activeTab, activeSubTab);
    } catch (error) {
      console.error(`Failed to ${action} review:`, error);
      toast.error(`Failed to ${action} review.`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Reviews</h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "ClientToJobSeeker"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("ClientToJobSeeker")}
        >
          ClientToJobSeeker
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "JobSeekerToClient"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("JobSeekerToClient")}
        >
          JobSeekerToClient
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All Reviews", "Flagged Reviews", "Pending Reviews", "Approved Reviews", "Rejected Reviews"].map(
          (subTab) => (
            <button
              key={subTab}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeSubTab === subTab
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleSubTabChange(subTab)}
            >
              {subTab}
            </button>
          )
        )}
      </div>

      {/* Reviews */}
      <div>
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-semibold text-lg">
                  {review.isAnonymous
                    ? `${review.reviewerId.firstName} ${review.reviewerId.lastName} (Anonymous)`
                    : `${review.reviewerId.firstName} ${review.reviewerId.lastName}`}
                </h5>
                <p className="text-sm text-gray-500">
                  Admin Approval:{" "}
                  <span
                    className={`font-semibold ${
                      review.adminApproval === "Approved"
                        ? "text-green-500"
                        : review.adminApproval === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {review.adminApproval}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Flagged:{" "}
                  <span
                    className={`font-semibold ${
                      review.flagged ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {review.flagged ? "Yes" : "No"}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setFlaggingReview(review._id)}
                >
                  Flag
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(review._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(review._id, "Rejected")}
                >
                  Reject
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(review._id, "Pending")}
                >
                  Pending
                </button>
                <button
                  className="bg-red-700 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAction(review._id, "Delete")}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Flagging Form */}
            {flaggingReview === review._id && (
              <div className="mt-4">
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter reason for flagging"
                  value={flaggedReason}
                  onChange={(e) => setFlaggedReason(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleFlagSubmit(review._id)}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setFlaggingReview(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">Title:</span> {review.title}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rating:</span> {review.rating}/5
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Comments:</span>{" "}
                {review.comments}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;