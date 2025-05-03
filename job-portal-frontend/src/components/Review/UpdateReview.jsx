import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateReview = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams(); // Get reviewId from the URL

  const [formData, setFormData] = useState({
    jobId: "",
    revieweeId: "",
    rating: "",
    comments: "",
    title: "",
    workQuality: "",
    professionalism: "",
    communication: "",
    isAnonymous: false,
    workPlaceQuality: "",
    completedWork: false,
  });

  const [role, setRole] = useState(""); // Dynamically set based on user role
  const [jobTitle, setJobTitle] = useState(""); // To store job title if needed

  // Fetch review details and user role
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        // Fetch logged-in user details
        const { data: userData } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setRole(userData.user.role); // Set the user's role

        // console.log("Review Id", reviewId);

        // Fetch review details
        const { data: reviewData } = await axios.get(
          `http://localhost:4000/api/v1/review/review/${reviewId}`,
          { withCredentials: true }
        );


        const review = reviewData.review
        // console.log("Review Data", reviewData.review);

        setFormData({
          jobId: review.jobId?._id || "",
          revieweeId: review.revieweeId?._id || "",
          rating: review.rating || "",
          comments: review.comments || "",
          title: review.title || "",
          workQuality: review.workQuality || "",
          professionalism: review.professionalism || "",
          communication: review.communication || "",
          isAnonymous: review.isAnonymous || false,
          workPlaceQuality: review.workPlaceQuality || "",
          completedWork: review.completedWork || false,
        });

        // Set the job title if needed
        setJobTitle(review.jobId?.title || ""); // Set the job title if needed

      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch review details."
        );
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/review/review/${reviewId}`,
        {
          rating: formData.rating,
          comments: formData.comments,
          title: formData.title,
          workQuality: formData.workQuality,
          professionalism: formData.professionalism,
          communication: formData.communication,
          isAnonymous: formData.isAnonymous,
          workPlaceQuality: formData.workPlaceQuality,
          completedWork: formData.completedWork,
        },
        { withCredentials: true }
      );
      toast.success(data.message || "Review updated successfully!");
      navigate("/review");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update the review."
      );
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Update Review</h1>
          <button
            onClick={() => navigate("/review")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="jobId"
              value={jobTitle}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 bg-gray-100"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Enter a rating"
              min="1"
              max="5"
              required
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Enter your comments"
              rows="4"
            ></textarea>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Enter a title for the review"
            />
          </div>

          {/* Fields specific to JobSeeker */}
          {role === "JobSeeker" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Workplace Quality (1-5)
              </label>
              <input
                type="number"
                name="workPlaceQuality"
                value={formData.workPlaceQuality}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                placeholder="Rate the workplace quality"
                min="1"
                max="5"
              />
            </div>
          )}

          {/* Fields specific to Client */}
          {role === "Client" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Work Quality (1-5)
                </label>
                <input
                  type="number"
                  name="workQuality"
                  value={formData.workQuality}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  placeholder="Rate the work quality"
                  min="1"
                  max="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Completed Work
                </label>
                <input
                  type="checkbox"
                  name="completedWork"
                  checked={formData.completedWork}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </>
          )}

          {/* Professionalism */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Professionalism (1-5)
            </label>
            <input
              type="number"
              name="professionalism"
              value={formData.professionalism}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Rate professionalism"
              min="1"
              max="5"
            />
          </div>

          {/* Communication */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Communication (1-5)
            </label>
            <input
              type="number"
              name="communication"
              value={formData.communication}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              placeholder="Rate communication"
              min="1"
              max="5"
            />
          </div>

          {/* Anonymous */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Anonymously
            </label>
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Update Review
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateReview;