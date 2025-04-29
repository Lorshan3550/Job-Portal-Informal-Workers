import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/job/getmyjobs", {
          withCredentials: true,
        });
        setMyJobs(data.myJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error(error.response?.data?.message || "Failed to fetch jobs.");
      }
    };

    fetchJobs();
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message || "Job updated successfully!");
      setEditingMode(null);
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(error.response?.data?.message || "Failed to update job.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) {
      return; // Exit if the user cancels the action
    }
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });
      toast.success(data.message || "Job deleted successfully!");
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message || "Failed to delete job.");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job))
    );
  };

  return (
    <div className="myJobs page bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-8 mt-16">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-semibold mb-6 text-center text-black-700">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((job) => (
              <div
                className="card p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
                key={job._id}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.title}
                        onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">Category:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.category}
                        onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">Salary:</span>
                      <input
                        type="number"
                        disabled={editingMode !== job._id}
                        value={job.fixedSalary}
                        onChange={(e) => handleInputChange(job._id, "fixedSalary", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">Description:</span>
                      <textarea
                        rows={5}
                        value={job.description}
                        disabled={editingMode !== job._id}
                        onChange={(e) => handleInputChange(job._id, "description", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      {editingMode === job._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(job._id)}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleDisableEdit()}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(job._id)}
                          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No jobs posted yet. Start by posting your first job!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
