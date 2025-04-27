import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications from the backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/application/jobseeker/getall",
          {
            withCredentials: true,
          }
        );
        setApplications(data.applications);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch applications."
        );
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <h4 className="text-center text-gray-500 text-lg">
            No Applications Found
          </h4>
        ) : (
          <div className="space-y-8">
            {applications.map((application) => (
              <ApplicationCard key={application._id} application={application} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Application for Job ID: {application.jobId}
        </h2>
        <p className="text-sm text-gray-500">
          Applied At: {new Date(application.appliedAt).toLocaleString()}
        </p>
        <div className="space-y-1">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span>{" "}
            {`${application.firstName} ${application.middleName} ${application.lastName}`}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {application.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span>{" "}
            {application.phoneNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span>{" "}
            {application.location}, {application.city}, {application.district},{" "}
            {application.province}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Education:</span>{" "}
            {application.educationQualifications}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Experience:</span>{" "}
            {application.experience}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Why Apply:</span>{" "}
            {application.whyApplyJob}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Language Proficiency:</span>{" "}
            Sinhala: {application.languageProficiency.sinhala}, Tamil:{" "}
            {application.languageProficiency.tamil}, English:{" "}
            {application.languageProficiency.english}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Questions:</h3>
          {application.questions.map((q) => (
            <p key={q._id} className="text-gray-700">
              <span className="font-semibold">{q.question}:</span> {q.answer}
            </p>
          ))}
        </div>
      </div>
      <div className="w-32 h-32 border-2 border-green-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110">
        <a
          href={application.resume.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-800 underline"
        >
          View Resume
        </a>
      </div>
    </div>
  );
};

export default MyApplications;
