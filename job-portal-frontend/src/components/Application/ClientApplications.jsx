import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ClientApplications = () => {
  const [categorizedApplications, setCategorizedApplications] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  // Fetch applications for jobs posted by the client
  useEffect(() => {
    const fetchClientApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/application/client/getall",
          { withCredentials: true }
        );
        setCategorizedApplications(data.categorizedApplications);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch applications for your jobs."
        );
      }
    };

    fetchClientApplications();
  }, []);

  const toggleCard = (applicationId) => {
    setExpandedCard((prev) => (prev === applicationId ? null : applicationId));
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/application/update-status/${applicationId}`,
        { status },
        { withCredentials: true }
      );

      toast.success(data.message);

      // Update state locally
      setCategorizedApplications((prev) =>
        prev.map((job) => ({
          ...job,
          applications: job.applications.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          ),
        }))
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update application status."
      );
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          Applications for Your Jobs
        </h1>

        {categorizedApplications.length === 0 ? (
          <h4 className="text-center text-gray-500 text-lg">
            No Applications Found
          </h4>
        ) : (
          categorizedApplications.map((job) => (
            <div key={job.jobId} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Job Title: {job.jobTitle}
              </h2>
              <div className="space-y-4">
                {job.applications.map((application) => (
                  <div
                    key={application._id}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Name:</span>{" "}
                          {`${application.firstName} ${application.middleName} ${application.lastName}`}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Email:</span>{" "}
                          {application.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Phone:</span>{" "}
                          {application.phoneNumber}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Status:</span>{" "}
                          <span
                            className={`px-3 py-1 rounded-full text-white ${
                              application.status === "Pending"
                                ? "bg-yellow-500"
                                : application.status === "Accepted"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            {application.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <button
                          onClick={() => toggleCard(application._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          {expandedCard === application._id
                            ? "Collapse"
                            : "Expand"}
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(application._id, "Accepted")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(application._id, "Rejected")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(application._id, "Pending")
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Pending
                        </button>
                      </div>
                    </div>
                    {expandedCard === application._id && (
                      <div className="mt-4 space-y-2">
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {application.location}, {application.city},{" "}
                          {application.district}, {application.province}
                        </p>
                        <p>
                          <span className="font-semibold">Education:</span>{" "}
                          {application.educationQualifications}
                        </p>
                        <p>
                          <span className="font-semibold">Experience:</span>{" "}
                          {application.experience}
                        </p>
                        <p>
                          <span className="font-semibold">Why Apply:</span>{" "}
                          {application.whyApplyJob}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Language Proficiency:
                          </span>{" "}
                          Sinhala: {application.languageProficiency.sinhala},{" "}
                          Tamil: {application.languageProficiency.tamil},{" "}
                          English: {application.languageProficiency.english}
                        </p>
                        <div>
                          <h3 className="font-semibold">Questions:</h3>
                          {application.questions.map((q) => (
                            <p key={q._id}>
                              <span className="font-semibold">
                                {q.question}:
                              </span>{" "}
                              {q.answer}
                            </p>
                          ))}
                        </div>
                        <div className="mt-4">
                          <a
                            href={application.resume?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 underline hover:text-green-800"
                          >
                            View Resume
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ClientApplications;



