import React, { useState } from "react";
import ResumeModel from "./ResumeModel";

const MyApplications = () => {
  const [ModelOpen, setModelOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const dummyApplications = [
    {
      _id: "1",
      name: "Junoj Siva",
      email: "junoj@example.com",
      phone: "1234567890",
      address: "Jaffna",
      coverLetter: "I am very interested in this position because...",
      jobName: "Driver",
      appliedDate: "2025-02-06",
      resume: { url: "" },
    },
    {
      _id: "2",
      name: "Junoj Siva",
      email: "junoj@example.com",
      phone: "1234567890",
      address: "Jaffna",
      coverLetter: "I have experience in this field and...",
      jobName: "Waiter",
      appliedDate: "2025-02-05",
      resume: { url: "" },
    },
  ];

  const openModel = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModelOpen(true);
  };

  const closeModel = () => setModelOpen(false);

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          My Applications
        </h1>

        {dummyApplications.length === 0 ? (
          <h4 className="text-center text-gray-500 text-lg">No Applications Found</h4>
        ) : (
          <div className="space-y-8">
            {dummyApplications.map((element) => (
              <ApplicationCard key={element._id} element={element} openModel={openModel} />
            ))}
          </div>
        )}
      </div>
      {ModelOpen && <ResumeModel imageUrl={resumeImageUrl} onClose={closeModel} />}
    </section>
  );
};

const ApplicationCard = ({ element, openModel }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row justify-between items-center border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">{element.jobName}</h2>
        <p className="text-sm text-gray-500">{element.appliedDate}</p>
        <div className="space-y-1">
          <p className="text-gray-700"><span className="font-semibold">Name:</span> {element.name}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {element.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Phone:</span> {element.phone}</p>
          <p className="text-gray-700"><span className="font-semibold">Address:</span> {element.address}</p>
        </div>
        <p className="text-gray-700"><span className="font-semibold">Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="w-32 h-32 border-2 border-green-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110">
        <img
          src={element.resume.url}
          alt="Resume"
          className="object-cover w-full h-full"
          onClick={() => openModel(element.resume.url)}
        />
      </div>
    </div>
  );
};

export default MyApplications;
