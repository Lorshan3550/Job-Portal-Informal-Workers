import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { FaMapMarkerAlt, FaMoneyBillAlt, FaRegClock, FaUserTie, FaBriefcase, FaCalendarAlt, FaGraduationCap, FaUsers, FaImage } from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        console.log("Job : ", data)
        setJob(data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        navigateTo("/notfound");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, navigateTo]);

  if (loading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Loading job details...</h2>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-red-500">Job not found.</h2>
      </section>
    );
  }

  return (
    <section className="jobDetail py-12 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <Link to={"/job/getall"} className=" bg-white text-black p-4 rounded font-bold border border-2 hover:bg-black hover:text-white">Back</Link>
        <h3 className="text-4xl font-bold text-green-800 mb-8 text-center">Job Details</h3>
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
          {/* Title & Category */}
          <div className="flex flex-col md:flex-row md:items-center mb-6">
            <h4 className="text-2xl font-semibold text-gray-800">{job.title}</h4>
            <span className="ml-0 md:ml-4 mt-2 md:mt-0 text-sm text-gray-500">{job.category}</span>
          </div>

          {/* Location & Province/District/City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700 capitalize">
                {job.province}, {job.district}, {job.city}
              </p>
            </div>
            <div className="flex items-center">
              <FaRegClock className="text-green-800 mr-2" />
              <p className="text-lg text-gray-700">
                Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4 flex items-center">
            <FaMapMarkerAlt className="text-green-800 mr-2" />
            <span className="text-lg text-gray-700"><strong>Address:</strong> {job.address}</span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2">
              <strong className="text-gray-900">Description:</strong> {job.description}
            </p>
          </div>

          {/* Required Skills */}
          <div className="mb-6">
            <h5 className="text-xl font-semibold text-gray-800 mb-4">Required Skills</h5>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
              {job.requiredSkills && job.requiredSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Experience, Work Type, Education, No of Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <FaUserTie className="text-green-800 mr-2" />
              <span className="text-lg text-gray-700"><strong>Experience:</strong> {job.experience}</span>
            </div>
            <div className="flex items-center">
              <FaBriefcase className="text-green-800 mr-2" />
              <span className="text-lg text-gray-700"><strong>Work Type:</strong> {job.workType}</span>
            </div>
            <div className="flex items-center">
              <FaGraduationCap className="text-green-800 mr-2" />
              <span className="text-lg text-gray-700"><strong>Education:</strong> {job.education}</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="text-green-800 mr-2" />
              <span className="text-lg text-gray-700"><strong>No. of Positions:</strong> {job.noOfPositions}</span>
            </div>
          </div>

          {/* Application Deadline */}
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="text-green-800 mr-2" />
            <span className="text-lg text-gray-700">
              <strong>Apply Deadline:</strong> {new Date(job.applyDeadline).toLocaleDateString()}
            </span>
          </div>

          {/* Duration */}
          {job.duration && (
            <div className="flex items-center mb-6">
              <FaRegClock className="text-green-800 mr-2" />
              <span className="text-lg text-gray-700">
                <strong>Work Duration:</strong>{" "}
                {job.duration.years > 0 && `${job.duration.years} year(s) `}
                {job.duration.months > 0 && `${job.duration.months} month(s) `}
                {job.duration.days > 0 && `${job.duration.days} day(s)`}
              </span>
            </div>
          )}

          {/* Salary */}
          <div className="flex items-center mb-6">
            <FaMoneyBillAlt className="text-green-800 mr-2" />
            <p className="text-lg text-gray-700">
              <strong>Salary:</strong>{" "}
              {job.fixedSalary ? (
                <span className="text-gray-900">Rs. {job.fixedSalary.toLocaleString()}</span>
              ) : (
                <span className="text-gray-900">
                  Rs. {job.salaryFrom?.toLocaleString()} - Rs. {job.salaryTo?.toLocaleString()}
                </span>
              )}
            </p>
          </div>

          {/* Photos */}
          {job.photos && job.photos.length > 0 && (
            <div className="mb-8">
              <h5 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaImage className="mr-2" /> Job Photos
              </h5>
              <div className="flex flex-wrap gap-4">
                {job.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.url}
                    alt={`Job Photo ${idx + 1}`}
                    className=" h-100 w-100 object-cover rounded-lg border shadow"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Apply Button */}
          {user?.role === "JobSeeker" && (
            <div className="text-center mt-8">
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-green-800 text-white py-3 px-8 rounded-full text-lg hover:bg-green-900 transition duration-300 transform hover:scale-105"
              >
                Apply Now
              </Link>
            </div>
          )}

          {!isAuthorized && (
            <div className="text-center mt-8">
              <Link
                to={`/login`}
                className="inline-block bg-green-800 text-white py-3 px-8 rounded-full text-lg hover:bg-green-900 transition duration-300 transform hover:scale-105"
              >
                Login OR Register to Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;

