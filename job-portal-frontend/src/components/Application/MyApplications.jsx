import React, { useState } from "react";
import ResumeModel from "./ResumeModel";

const MyApplications = () => {
  const [ModelOpen, setModelOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const dummyApplications = [
    {
      _id: "1",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City, Country",
      coverLetter: "I am very interested in this position because...",
      resume: { url: "https://via.placeholder.com/150" },
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, City, Country",
      coverLetter: "I have experience in this field and...",
      resume: { url: "https://via.placeholder.com/150" },
    },
  ];

  const openModel = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModelOpen(true);
  };

  const closeModel = () => setModelOpen(false);

  return (
    <section className="min-h-screen py-10 px-4 bg-gray-100 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">My Applications</h1>

        {dummyApplications.length === 0 ? (
          <h4 className="text-center text-gray-500 text-lg">No Applications Found</h4>
        ) : (
          dummyApplications.map((element) => (
            <ApplicationCard key={element._id} element={element} openModel={openModel} />
          ))
        )}
      </div>
      {ModelOpen && <ResumeModel imageUrl={resumeImageUrl} onClose={closeModel} />}
    </section>
  );
};

const ApplicationCard = ({ element, openModel }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-4 flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-3/4">
        <p className="text-gray-700"><span className="font-semibold">Name:</span> {element.name}</p>
        <p className="text-gray-700"><span className="font-semibold">Email:</span> {element.email}</p>
        <p className="text-gray-700"><span className="font-semibold">Phone:</span> {element.phone}</p>
        <p className="text-gray-700"><span className="font-semibold">Address:</span> {element.address}</p>
        <p className="text-gray-700"><span className="font-semibold">Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="w-32 h-32 border rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
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
