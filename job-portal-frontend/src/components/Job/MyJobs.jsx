import React, { useContext, useEffect, useState } from "react";
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
    const fetchJobs = () => {
      const sampleJobs = [
        { _id: "1", title: "Data Entry Operator", country: "Sri Lanka", city: "Colombo", category: "Data Entry Operator", fixedSalary: 25000, expired: false, description: "Looking for a reliable data entry operator for part-time work.", location: "Work from home" },
        { _id: "2", title: "Cleaner", country: "Sri Lanka", city: "Kandy", category: "General Labour", fixedSalary: 20000, expired: false, description: "Seeking a cleaner for an office space.", location: "On-site in Kandy" },
        { _id: "3", title: "Security Guard", country: "Sri Lanka", city: "Galle", category: "General Labour", fixedSalary: 18000, expired: false, description: "Security guard needed for a residential area.", location: "On-site in Galle" },
      ];
      setMyJobs(sampleJobs);
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
    toast.success("Job updated successfully!");
    setEditingMode(null);
  };

  const handleDeleteJob = async (jobId) => {
    toast.success("Job deleted successfully!");
    setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? { ...job, [field]: value } : job)));
  };

  return (
    <div className="myJobs page bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-8 mt-16">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-semibold mb-6 text-center text-black-700">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((job) => (
              <div className="card p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105" key={job._id}>
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
                      <span className="font-medium text-lg">Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.country}
                        onChange={(e) => handleInputChange(job._id, "country", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== job._id}
                        value={job.city}
                        onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-lg">Category:</span>
                      <select
                        value={job.category}
                        onChange={(e) => handleInputChange(job._id, "category", e.target.value)}
                        disabled={editingMode !== job._id}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
                      >
                        <option value="Data Entry Operator">Data Entry Operator</option>
                        <option value="General Labour">General Labour</option>
                      </select>
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
                          <button onClick={() => handleUpdateJob(job._id)} className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none">
                            <FaCheck />
                          </button>
                          <button onClick={() => handleDisableEdit()} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none">
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEnableEdit(job._id)} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
                          Edit
                        </button>
                      )}
                    </div>
                    <button onClick={() => handleDeleteJob(job._id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none">
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
