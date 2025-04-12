import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaMapMarkerAlt, FaMoneyBillAlt, FaRegClock } from "react-icons/fa"; // Add icons

const sampleJobs = [
  {
    _id: "1",
    title: "Construction Worker",
    category: "Construction",
    country: "Sri Lanka",
    city: "Colombo",
    location: "Gampaha",
    description:
      "Construction workers are required for building and renovation projects. Tasks include site preparation, managing equipment, maintaining safety protocols, and assisting skilled laborers. Candidates should have hands-on experience and be physically fit for this demanding role.",
    skills: ["Site Preparation", "Heavy Equipment Operation", "Safety Protocols", "Teamwork"],
    jobPostedOn: "2025-02-01",
    fixedSalary: "50000 LKR",
    salaryFrom: "40000 LKR",
    salaryTo: "60000 LKR",
  },
  {
    _id: "2",
    title: "Housekeeper",
    category: "Hospitality",
    country: "Sri Lanka",
    city: "Kandy",
    location: "Nuwara Eliya",
    description:
      "Looking for a reliable housekeeper to maintain cleanliness and order. Tasks include cleaning rooms, changing linens, managing laundry, and ensuring the house is safe and tidy at all times.",
    skills: ["Cleaning", "Laundry Management", "Time Management", "Attention to Detail"],
    jobPostedOn: "2025-02-02",
    fixedSalary: "30000 LKR",
    salaryFrom: "25000 LKR",
    salaryTo: "35000 LKR",
  },
  {
    _id: "3",
    title: "Delivery Driver",
    category: "Logistics",
    country: "Sri Lanka",
    city: "Galle",
    location: "Matara",
    description:
      "Looking for a delivery driver for our logistics company. Responsibilities include driving delivery vehicles, handling packages, ensuring timely delivery, and maintaining vehicle safety and cleanliness.",
    skills: ["Driving", "Time Management", "Customer Service", "Route Planning"],
    jobPostedOn: "2025-02-03",
    fixedSalary: "40000 LKR",
    salaryFrom: "35000 LKR",
    salaryTo: "45000 LKR",
  },
  {
    _id: "4",
    title: "Warehouse Assistant",
    category: "Retail",
    country: "Sri Lanka",
    city: "Kurunegala",
    location: "Anuradhapura",
    description:
      "Assisting in warehouse organization and inventory management. Responsibilities include stock taking, sorting items, managing orders, and ensuring that the warehouse is well-organized and operating smoothly.",
    skills: ["Inventory Management", "Organization", "Teamwork", "Physical Stamina"],
    jobPostedOn: "2025-02-04",
    fixedSalary: "35000 LKR",
    salaryFrom: "30000 LKR",
    salaryTo: "40000 LKR",
  },
  {
    _id: "5",
    title: "Security Guard",
    category: "Security",
    country: "Sri Lanka",
    city: "Colombo",
    location: "Negombo",
    description:
      "Security guard needed for maintaining safety at a commercial building. Duties include patrolling premises, monitoring surveillance cameras, responding to emergencies, and ensuring the security of people and property.",
    skills: ["Surveillance", "Emergency Response", "Patrolling", "Customer Service"],
    jobPostedOn: "2025-02-05",
    fixedSalary: "25000 LKR",
    salaryFrom: "22000 LKR",
    salaryTo: "28000 LKR",
  },
  {
    _id: "6",
    title: "Gardener",
    category: "Landscaping",
    country: "Sri Lanka",
    city: "Jaffna",
    location: "Vavuniya",
    description:
      "Gardener needed for maintaining the grounds of a private estate. Responsibilities include lawn care, pruning plants, watering, and ensuring the estate is beautiful and well-maintained throughout the year.",
    skills: ["Landscaping", "Pruning", "Plant Care", "Attention to Detail"],
    jobPostedOn: "2025-02-06",
    fixedSalary: "20000 LKR",
    salaryFrom: "18000 LKR",
    salaryTo: "25000 LKR",
  },
];

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const foundJob = sampleJobs.find((job) => job._id === id);
    if (foundJob) {
      setJob(foundJob);
    } else {
      navigateTo("/notfound");
    }
  }, [id, navigateTo]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail py-12 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <h3 className="text-4xl font-bold text-green-800 mb-8 text-center">Job Details</h3>
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <h4 className="text-2xl font-semibold text-gray-800">{job.title}</h4>
            <span className="ml-4 text-sm text-gray-500">{job.category}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">{job.city}, {job.country}</p>
            </div>
            <div className="flex items-center">
              <FaRegClock className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">Posted on: {job.jobPostedOn}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">
              <strong className="text-gray-900">Location:</strong> {job.location}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong className="text-gray-900">Description:</strong> {job.description}
            </p>
          </div>

          <div className="mb-6">
            <h5 className="text-xl font-semibold text-gray-800 mb-4">Required Skills</h5>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              {job.skills && job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <FaMoneyBillAlt className="text-green-800 mr-2" />
            <p className="text-lg text-gray-700">
              <strong>Salary:</strong>{" "}
              {job.fixedSalary ? (
                <span className="text-gray-900">{job.fixedSalary}</span>
              ) : (
                <span className="text-gray-900">
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
          </div>

          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="text-center mt-8">
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-green-800 text-white py-3 px-8 rounded-full text-lg hover:bg-green-900 transition duration-300 transform hover:scale-105"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
