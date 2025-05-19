import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [categorizedApplications, setCategorizedApplications] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  // Fetch applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/application/jobseeker/get-approved-applications",
          {
            withCredentials: true,
          }
        );
        setCategorizedApplications(data.categorizedApplications);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch applications."
        );
      }
    };

    fetchApplications();
  }, []);

  const toggleCard = (applicationId) => {
    setExpandedCard((prev) => (prev === applicationId ? null : applicationId));
  };

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          My Applications
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
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Application ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Applicant Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {job.applications.map((application) => (
                    <React.Fragment key={application._id}>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          {application.applicationId}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {application.firstName} {application.lastName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
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
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={() => toggleCard(application._id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                          >
                            {expandedCard === application._id
                              ? "Collapse"
                              : "Expand"}
                          </button>
                          <a
                            href={application.resume?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                          >
                            View Resume
                          </a>
                        </td>
                      </tr>
                      {expandedCard === application._id && (
                        <tr>
                          <td
                            colSpan="4"
                            className="border border-gray-300 px-4 py-4 bg-gray-50"
                          >
                            <div className="space-y-2">
                              <p>
                                <span className="font-semibold">
                                  Email:
                                </span>{" "}
                                {application.email}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Phone:
                                </span>{" "}
                                {application.phoneNumber}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Address:
                                </span>{" "}
                                {application.location}, {application.city},{" "}
                                {application.district}, {application.province}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Education:
                                </span>{" "}
                                {application.educationQualifications}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Experience:
                                </span>{" "}
                                {application.experience}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Why Apply:
                                </span>{" "}
                                {application.whyApplyJob}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Language Proficiency:
                                </span>{" "}
                                Sinhala: {application.languageProficiency.sinhala}
                                , Tamil: {application.languageProficiency.tamil}
                                , English:{" "}
                                {application.languageProficiency.english}
                              </p>
                              <div>
                                <h3 className="font-semibold">
                                  Questions and Answers:
                                </h3>
                                {application.questions.map((q) => (
                                  <p key={q._id}>
                                    <span className="font-semibold">
                                      {q.question}:
                                    </span>{" "}
                                    {q.answer}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyApplications;
