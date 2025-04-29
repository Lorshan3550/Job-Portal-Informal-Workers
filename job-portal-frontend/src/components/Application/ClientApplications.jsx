// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ClientApplications = () => {
//   const [categorizedApplications, setCategorizedApplications] = useState([]);

//   // Fetch applications for jobs posted by the client
//   useEffect(() => {
//     const fetchClientApplications = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/application/client/getall",
//           {
//             withCredentials: true,
//           }
//         );
//         setCategorizedApplications(data.categorizedApplications);
//       } catch (error) {
//         console.error(error);
//         toast.error(
//           error.response?.data?.message ||
//             "Failed to fetch applications for your jobs."
//         );
//       }
//     };

//     fetchClientApplications();
//   }, []);

//   return (
//     <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
//         <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
//           Applications for Your Jobs
//         </h1>

//         {categorizedApplications.length === 0 ? (
//           <h4 className="text-center text-gray-500 text-lg">
//             No Applications Found
//           </h4>
//         ) : (
//           <div className="space-y-8">
//             {categorizedApplications.map((job) => (
//               <JobApplicationsCard key={job.jobId} job={job} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// const JobApplicationsCard = ({ job }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         {job.jobTitle}
//       </h2>
//       {job.applications.length === 0 ? (
//         <p className="text-gray-500">No applications for this job yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {job.applications.map((application) => (
//             <ApplicationCard
//               key={application._id}
//               application={application}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const ApplicationCard = ({ application }) => {
//   return (
//     <div className="bg-gray-50 shadow-inner rounded-lg p-4 flex flex-col md:flex-row justify-between items-center border border-gray-300 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
//       <div className="w-full md:w-3/4 space-y-2">
//         <p className="text-gray-700">
//           <span className="font-semibold">Name:</span>{" "}
//           {`${application.firstName} ${application.middleName} ${application.lastName}`}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Email:</span> {application.email}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Phone:</span>{" "}
//           {application.phoneNumber}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Address:</span>{" "}
//           {application.location}, {application.city}, {application.district},{" "}
//           {application.province}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Education:</span>{" "}
//           {application.educationQualifications}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Experience:</span>{" "}
//           {application.experience}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Why Apply:</span>{" "}
//           {application.whyApplyJob}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold">Language Proficiency:</span>{" "}
//           Sinhala: {application.languageProficiency.sinhala}, Tamil:{" "}
//           {application.languageProficiency.tamil}, English:{" "}
//           {application.languageProficiency.english}
//         </p>
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-gray-800">Questions:</h3>
//           {application.questions.map((q) => (
//             <p key={q._id} className="text-gray-700">
//               <span className="font-semibold">{q.question}:</span> {q.answer}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="w-32 h-32 border-2 border-green-800 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110">
//         <a
//           href={application.resume.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-green-800 underline"
//         >
//           View Resume
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ClientApplications;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ClientApplications = () => {
//   const [categorizedApplications, setCategorizedApplications] = useState([]);

//   // Fetch applications on mount
//   useEffect(() => {
//     const fetchClientApplications = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/application/client/getall",
//           { withCredentials: true }
//         );
//         setCategorizedApplications(data.categorizedApplications);
//       } catch (error) {
//         console.error(error);
//         toast.error(
//           error.response?.data?.message || "Failed to fetch applications."
//         );
//       }
//     };

//     fetchClientApplications();
//   }, []);

//   const handleStatusChange = async (applicationId, status) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/application/update-status/${applicationId}`,
//         { status },
//         { withCredentials: true }
//       );

//       toast.success(data.message);

//       // Refresh applications after status change
//       setCategorizedApplications((prev) =>
//         prev.map((job) => ({
//           ...job,
//           applications: job.applications.map((app) =>
//             app._id === applicationId ? { ...app, status } : app
//           ),
//         }))
//       );
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to update application status."
//       );
//     }
//   };

//   return (
//     <section className="min-h-screen py-16 px-6 bg-gradient-to-r from-green-50 via-green-100 to-green-50 mt-16">
//       <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
//         <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
//           Applications for Your Jobs
//         </h1>

//         {categorizedApplications.length === 0 ? (
//           <h4 className="text-center text-gray-500 text-lg">
//             No Applications Found
//           </h4>
//         ) : (
//           <div className="space-y-12">
//             {categorizedApplications.map((job) => (
//               <JobApplicationsTable
//                 key={job.jobId}
//                 job={job}
//                 onStatusChange={handleStatusChange}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// const JobApplicationsTable = ({ job, onStatusChange }) => {
//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">{job.jobTitle}</h2>

//       {job.applications.length === 0 ? (
//         <p className="text-gray-500">No applications for this job yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead>
//               <tr className="bg-green-100 text-gray-700">
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-left">Email</th>
//                 <th className="px-4 py-3 text-left">Phone</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Resume</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {job.applications.map((application) => (
//                 <tr key={application._id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-4">{`${application.firstName} ${application.middleName} ${application.lastName}`}</td>
//                   <td className="px-4 py-4">{application.email}</td>
//                   <td className="px-4 py-4">{application.phoneNumber}</td>
//                   <td className="px-4 py-4 font-semibold text-gray-700">{application.status}</td>
//                   <td className="px-4 py-4">
//                     <a
//                       href={application.resume?.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-green-600 underline hover:text-green-800"
//                     >
//                       View
//                     </a>
//                   </td>
//                   <td className="px-4 py-4 text-center space-x-2">
//                     <button
//                       onClick={() => onStatusChange(application._id, "Accepted")}
//                       className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => onStatusChange(application._id, "Rejected")}
//                       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
//                     >
//                       Reject
//                     </button>
//                     <button
//                       onClick={() => onStatusChange(application._id, "Pending")}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg text-sm"
//                     >
//                       Pending
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientApplications;


import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ClientApplications = () => {
  const [categorizedApplications, setCategorizedApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionToConfirm, setActionToConfirm] = useState(null);

  // Fetch applications
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
          error.response?.data?.message || "Failed to fetch applications."
        );
      }
    };

    fetchClientApplications();
  }, []);

  const confirmStatusChange = (application, newStatus) => {
    setSelectedApplication(application);
    setActionToConfirm(newStatus);
  };

  const handleStatusChange = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/application/update-status/${selectedApplication._id}`,
        { status: actionToConfirm },
        { withCredentials: true }
      );

      toast.success(data.message);

      // Update state locally
      setCategorizedApplications((prev) =>
        prev.map((job) => ({
          ...job,
          applications: job.applications.map((app) =>
            app._id === selectedApplication._id ? { ...app, status: actionToConfirm } : app
          ),
        }))
      );

      // Close modal
      setSelectedApplication(null);
      setActionToConfirm(null);
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
          <div className="space-y-12">
            {categorizedApplications.map((job) => (
              <JobApplicationsTable
                key={job.jobId}
                job={job}
                onConfirmStatusChange={confirmStatusChange}
                onViewDetails={setSelectedApplication}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirm Status Modal */}
      {actionToConfirm && selectedApplication && (
        <ConfirmModal
          action={actionToConfirm}
          onCancel={() => {
            setSelectedApplication(null);
            setActionToConfirm(null);
          }}
          onConfirm={handleStatusChange}
        />
      )}

      {/* View Details Modal */}
      {selectedApplication && !actionToConfirm && (
        <DetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </section>
  );
};

const JobApplicationsTable = ({ job, onConfirmStatusChange, onViewDetails }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{job.jobTitle}</h2>

      {job.applications.length === 0 ? (
        <p className="text-gray-500">No applications for this job yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-green-100 text-gray-700">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {job.applications.map((application) => (
                <tr key={application._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-4">{`${application.firstName} ${application.middleName} ${application.lastName}`}</td>
                  <td className="px-4 py-4">{application.email}</td>
                  <td className="px-4 py-4">{application.phoneNumber}</td>
                  <td className="px-4 py-4 font-semibold text-gray-700">{application.status}</td>
                  <td className="px-4 py-4 flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => onViewDetails(application)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onConfirmStatusChange(application, "Accepted")}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onConfirmStatusChange(application, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onConfirmStatusChange(application, "Pending")}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-3 rounded-lg text-sm"
                    >
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ConfirmModal = ({ action, onCancel, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Confirm {action}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Are you sure you want to mark this application as <b>{action}</b>?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

const DetailsModal = ({ application, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-2xl overflow-y-auto max-h-[90vh]">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Application Details
      </h2>

      <div className="space-y-4 text-gray-700">
        <div><b>Name:</b> {`${application.firstName} ${application.middleName} ${application.lastName}`}</div>
        <div><b>Email:</b> {application.email}</div>
        <div><b>Phone:</b> {application.phoneNumber}</div>
        {application.skills && (
          <div><b>Skills:</b> {application.skills.join(", ")}</div>
        )}
        {application.experience && (
          <div><b>Experience:</b> {application.experience} years</div>
        )}
        <div><b>Status:</b> {application.status}</div>
        {application.resume?.url && (
          <div>
            <b>Resume:</b>{" "}
            <a
              href={application.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline hover:text-green-800"
            >
              View Resume
            </a>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ClientApplications;

