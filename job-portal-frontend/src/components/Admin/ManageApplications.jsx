import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ManageApplications = () => {
  const [categorizedApplications, setCategorizedApplications] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null); // Track expanded job
  const [expandedApplicationId, setExpandedApplicationId] = useState(null); // Track expanded application

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/application/admin/get-categorized-applications",
          { withCredentials: true }
        );
        console.log(data);
        setCategorizedApplications(data.categorizedApplications);
      } catch (error) {
      
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const toggleJobExpand = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  const toggleApplicationExpand = (applicationId) => {
    setExpandedApplicationId((prevId) => (prevId === applicationId ? null : applicationId));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Applications</h1>

      {categorizedApplications.map((job) => (
        <div key={job.jobId} className="bg-white shadow-lg rounded-lg mb-6">
          {/* Job Header */}
          <div
            className="flex justify-between items-center p-6 bg-gray-200 rounded-t-lg cursor-pointer"
            onClick={() => toggleJobExpand(job.jobId)}
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.applications.length} Applications</p>
            </div>
            <div>
              {expandedJobId === job.jobId ? (
                <FaChevronUp className="text-gray-600 text-xl" />
              ) : (
                <FaChevronDown className="text-gray-600 text-xl" />
              )}
            </div>
          </div>

          {/* Applications List */}
          {expandedJobId === job.jobId && (
            <div className="p-6 space-y-4">
              {job.applications.length === 0 ? (
                <p className="text-gray-600">No applications for this job.</p>
              ) : (
                job.applications.map((application) => (
                  <div
                    key={application._id}
                    className="bg-gray-50 shadow-md rounded-lg p-4 border border-gray-300"
                  >
                    {/* Application Header */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleApplicationExpand(application._id)}
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {application.firstName} {application.lastName}
                        </h3>
                        <p className="text-gray-600">{application.email}</p>
                      </div>
                      <div>
                        {expandedApplicationId === application._id ? (
                          <FaChevronUp className="text-gray-600 text-lg" />
                        ) : (
                          <FaChevronDown className="text-gray-600 text-lg" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Application Details */}
                    {expandedApplicationId === application._id && (
                      <div className="mt-4 space-y-2">
                        <p>
                          <strong>Phone:</strong> {application.phoneNumber}
                        </p>
                        <p>
                          <strong>Location:</strong> {application.location}, {application.city},{" "}
                          {application.district}, {application.province}
                        </p>
                        <p>
                          <strong>Education:</strong> {application.educationQualifications}
                        </p>
                        <p>
                          <strong>Experience:</strong> {application.experience}
                        </p>
                        <p>
                          <strong>Gender:</strong> {application.gender}
                        </p>
                        <p>
                          <strong>Why Apply:</strong> {application.whyApplyJob}
                        </p>
                        <p>
                          <strong>Language Proficiency:</strong>
                        </p>
                        <ul className="list-disc ml-6">
                          <li>Sinhala: {application.languageProficiency.sinhala}</li>
                          <li>Tamil: {application.languageProficiency.tamil}</li>
                          <li>English: {application.languageProficiency.english}</li>
                        </ul>
                        {application.resume && (
                          <p>
                            <strong>Resume:</strong>{" "}
                            <a
                              href={application.resume.secure_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              View Resume
                            </a>
                          </p>
                        )}
                        <p>
                          <strong>Questions:</strong>
                        </p>
                        <ul className="list-disc ml-6">
                          {application.questions.map((q) => (
                            <li key={q._id}>
                              <strong>{q.question}:</strong> {q.answer}
                            </li>
                          ))}
                        </ul>
                        <p>
                          <strong>Applied At:</strong>{" "}
                          {new Date(application.appliedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageApplications;