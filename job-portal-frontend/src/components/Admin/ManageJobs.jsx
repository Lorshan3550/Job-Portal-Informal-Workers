import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all"); // Filter: all, approved, rejected
  const [expandedJobId, setExpandedJobId] = useState(null); // Track expanded job

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApprove = async (jobId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/job/update-approval/${jobId}`,
        { adminApproval: true },
        { withCredentials: true }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, adminApproval: true, reasonForRejection: null } : job
        )
      );
      toast.success("Job approved successfully!");
    } catch (error) {
      console.error("Error approving job:", error);
      toast.error("Failed to approve the job.");
    }
  };

  const handleReject = async (jobId) => {
    const reasonForRejection = prompt("Please provide a reason for rejection:");
    if (!reasonForRejection || reasonForRejection.trim() === "") {
      toast.error("Rejection reason is required.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/v1/job/update-approval/${jobId}`,
        { adminApproval: false, reasonForRejection },
        { withCredentials: true }
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, adminApproval: false, reasonForRejection } : job
        )
      );
      toast.success("Job rejected successfully!");
    } catch (error) {
      console.error("Error rejecting job:", error);
      toast.error("Failed to reject the job.");
    }
  };

  const toggleExpand = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === "approved") return job.adminApproval === true;
    if (filter === "rejected") return job.adminApproval === false;
    return true; // Show all jobs
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Jobs</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All Jobs
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg ${
            filter === "approved" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-2 rounded-lg ${
            filter === "rejected" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300"
          >
            {/* Job Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.category}</p>
                <p className="text-sm font-semibold">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      job.adminApproval
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.adminApproval ? "Approved" : "Not Approved"}
                  </span>
                </p>
                {job.reasonForRejection && (
                  <p className="text-sm text-red-600">
                    <strong>Reason for Rejection:</strong> {job.reasonForRejection}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleApprove(job._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <FaCheck className="inline mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <FaTimes className="inline mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => toggleExpand(job._id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {expandedJobId === job._id ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Job Details */}
            {expandedJobId === job._id && (
              <div className="mt-4">
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                <p>
                  <strong>Skills Required:</strong> {job.requiredSkills.join(", ")}
                </p>
                <p>
                  <strong>Location:</strong> {job.city}, {job.district}, {job.province}
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {job.fixedSalary
                    ? `Rs. ${job.fixedSalary}`
                    : `Rs. ${job.salaryFrom} - Rs. ${job.salaryTo}`}
                </p>
                <p>
                  <strong>Work Type:</strong> {job.workType}
                </p>
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p>
                  <strong>Application Deadline:</strong>{" "}
                  {new Date(job.applyDeadline).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;