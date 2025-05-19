import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PostReview = () => {
  const navigate = useNavigate();

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

  const [jobs, setJobs] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [role, setRole] = useState(""); // Dynamically set based on user role
  const [reviewerId, setReviewerId] = useState(""); // Logged-in user's ID

  // Fetch admin-approved jobs and user details
  useEffect(() => {
    const fetchJobsAndUser = async () => {
      try {
        // Fetch logged-in user details
        const { data: userData } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setReviewerId(userData.user._id); // Set the logged-in user's ID
        setRole(userData.user.role); // Set the user's role

        // Fetch admin-approved jobs
        const { data: jobsData } = await axios.get(
          "http://localhost:4000/api/v1/job/getallapprovedjobs",
          { withCredentials: true }
        );
        setJobs(jobsData.jobs);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch jobs or user details."
        );
      }
    };

    fetchJobsAndUser();
  }, []);

  // Fetch job seekers who applied to a specific job (for clients)
  const fetchJobSeekers = async (jobId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/application/job/${jobId}`,
        { withCredentials: true }
      );
      console.log(data);
      setJobSeekers(data.jobSeekers);
      console.log("Job Seekers:", jobSeekers);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch job seekers for the selected job."
      );
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Fetch job seekers when a job is selected (for clients)
    if (name === "jobId" && role === "Client") {
      fetchJobSeekers(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reviewData = { ...formData, reviewerId }; // Include reviewerId in the request
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/review/create",
        reviewData,
        { withCredentials: true }
      );
      toast.success(data.message || "Review posted successfully!");
      navigate("/review");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to post the review."
      );
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Post a Review</h1>
          <button
            onClick={() => navigate("/review")}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Job
            </label>
            <select
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
              required
            >
              <option value="">Select a job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          {/* Job Seeker Selection (for Clients) */}
          {role === "Client" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Job Seeker
              </label>
              <select
                name="revieweeId"
                value={formData.revieweeId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                required
              >
                <option value="">Select a job seeker</option>
                {jobSeekers.map((jobSeeker) => (
                  <option key={jobSeeker.workerId} value={jobSeeker.workerId}>
                    {`${jobSeeker.firstName} ${jobSeeker.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostReview;