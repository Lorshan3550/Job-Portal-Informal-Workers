// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaKey, FaEnvelope } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ManageUsers = () => {
//   const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
//   const [expandedUserId, setExpandedUserId] = useState(null); // Track expanded user
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/get-categorized-users",
//           { withCredentials: true }
//         );
//         setCategorizedUsers(data.categorizedUsers);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:4000/api/v1/user/admin/hard-delete-user/${userId}`, {
//         withCredentials: true,
//       });
//       toast.success("User deleted successfully!");
//       setCategorizedUsers((prev) => ({
//         clients: prev.clients.filter((user) => user._id !== userId),
//         jobSeekers: prev.jobSeekers.filter((user) => user._id !== userId),
//       }));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user.");
//     }
//   };

//   const handleResetPassword = async (userId) => {
//     const dummyPassword = prompt("Enter a new dummy password (at least 8 characters):");
//     if (!dummyPassword || dummyPassword.length < 8) {
//       toast.error("Password must be at least 8 characters long.");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/user/admin/reset-password/${userId}`,
//         { dummyPassword },
//         { withCredentials: true }
//       );
//       toast.success("Password reset successfully!");
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       toast.error("Failed to reset password.");
//     }
//   };

//   const handleUpdateEmail = async (userId) => {
//     const newEmail = prompt("Enter the new email address:");
//     if (!newEmail) {
//       toast.error("Email cannot be empty.");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/user/admin/update-email/${userId}`,
//         { email: newEmail },
//         { withCredentials: true }
//       );
//       toast.success("Email updated successfully!");
//     } catch (error) {
//       console.error("Error updating email:", error);
//       toast.error("Failed to update email.");
//     }
//   };

//   const toggleExpand = (userId) => {
//     setExpandedUserId((prevId) => (prevId === userId ? null : userId));
//   };

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

//       {["clients", "jobSeekers"].map((role) => (
//         <div key={role} className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
//             {role === "clients" ? "Clients" : "Job Seekers"}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {categorizedUsers[role].map((user) => (
//               <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
//                 {/* User Header */}
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       {user.firstName} {user.lastName}
//                     </h3>
//                     <p className="text-gray-600">{user.email}</p>
//                   </div>
//                   <button
//                     onClick={() => toggleExpand(user._id)}
//                     className="text-gray-600 hover:text-gray-800"
//                   >
//                     {expandedUserId === user._id ? (
//                       <FaChevronUp className="text-lg" />
//                     ) : (
//                       <FaChevronDown className="text-lg" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Expanded User Details */}
//                 {expandedUserId === user._id && (
//                   <div className="mt-4 space-y-2">
//                     <p>
//                       <strong>Phone:</strong> {user.phone}
//                     </p>
//                     <p>
//                       <strong>Location:</strong> {user.location}, {user.district}, {user.province}
//                     </p>
//                     <p>
//                       <strong>Role:</strong> {user.role}
//                     </p>
//                     <p>
//                       <strong>Gender:</strong> {user.gender}
//                     </p>
//                     <p>
//                       <strong>Date of Birth:</strong> {user.dateOfBirth}
//                     </p>
//                     {user.skills.length > 0 && (
//                       <p>
//                         <strong>Skills:</strong> {user.skills.join(", ")}
//                       </p>
//                     )}
//                     {user.achievements.length > 0 && (
//                       <p>
//                         <strong>Achievements:</strong> {user.achievements.join(", ")}
//                       </p>
//                     )}
//                     {user.workExperiences.length > 0 && (
//                       <p>
//                         <strong>Work Experiences:</strong> {user.workExperiences.join(", ")}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex justify-between items-center mt-4 gap-1">
//                   <button
//                     onClick={() => handleUpdateEmail(user._id)}
//                     className="bg-blue-600 text-white px-1 py-1  rounded-lg hover:bg-blue-700 flex items-center"
//                   >
//                     <FaEnvelope className="mr-2" />
//                     Update Email
//                   </button>
//                   <button
//                     onClick={() => handleResetPassword(user._id)}
//                     className="bg-yellow-600 text-white px-1 py-1 rounded-lg hover:bg-yellow-700 flex items-center"
//                   >
//                     <FaKey className="mr-2" />
//                     Reset Password
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
//                   >
//                     <FaTrash className="mr-2" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaKey, FaEnvelope } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ManageUsers = () => {
//   const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/get-categorized-users",
//           { withCredentials: true }
//         );
//         setCategorizedUsers(data.categorizedUsers);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`http://localhost:4000/api/v1/user/admin/hard-delete-user/${userId}`, {
//         withCredentials: true,
//       });
//       toast.success("User deleted successfully!");
//       setCategorizedUsers((prev) => ({
//         clients: prev.clients.filter((user) => user._id !== userId),
//         jobSeekers: prev.jobSeekers.filter((user) => user._id !== userId),
//       }));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user.");
//     }
//   };

//   const handleResetPassword = async (userId) => {
//     const dummyPassword = prompt("Enter a new dummy password (at least 8 characters):");
//     if (!dummyPassword || dummyPassword.length < 8) {
//       toast.error("Password must be at least 8 characters long.");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/user/admin/reset-password/${userId}`,
//         { dummyPassword },
//         { withCredentials: true }
//       );
//       toast.success("Password reset successfully!");
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       toast.error("Failed to reset password.");
//     }
//   };

//   const handleUpdateEmail = async (userId) => {
//     const newEmail = prompt("Enter the new email address:");
//     if (!newEmail) {
//       toast.error("Email cannot be empty.");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:4000/api/v1/user/admin/update-email/${userId}`,
//         { email: newEmail },
//         { withCredentials: true }
//       );
//       toast.success("Email updated successfully!");
//     } catch (error) {
//       console.error("Error updating email:", error);
//       toast.error("Failed to update email.");
//     }
//   };

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

//       {["clients", "jobSeekers"].map((role) => (
//         <div key={role} className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
//             {role === "clients" ? "Clients" : "Job Seekers"}
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Name</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Email</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Phone</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Role</th>
//                   <th className="text-right px-4 py-2 text-gray-700 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categorizedUsers[role].map((user) => (
//                   <tr key={user._id} className="border-b">
//                     <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.phone}</td>
//                     <td className="px-4 py-2 capitalize">{user.role}</td>
//                     <td className="px-4 py-2 flex justify-end gap-2">
//                       <button
//                         onClick={() => handleUpdateEmail(user._id)}
//                         className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                       >
//                         <FaEnvelope className="mr-2" />
//                         Email
//                       </button>
//                       <button
//                         onClick={() => handleResetPassword(user._id)}
//                         className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 flex items-center"
//                       >
//                         <FaKey className="mr-2" />
//                         Reset
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center"
//                       >
//                         <FaTrash className="mr-2" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ManageUsers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaKey, FaEnvelope, FaPlus, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { gender, sriLankaProvinces } from "../Auth/_utils/constants";

const ManageUsers = () => {
  const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    personalSummary: "",
    phone: "",
    province: "",
    district: "",
    skills: "",
    achievements: "",
    password: "",
    role: "",
    location: "",
    dateOfBirth: "",
    gender: "",
    workExperiences: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/get-categorized-users",
          { withCredentials: true }
        );
        setCategorizedUsers(data.categorizedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {
          ...formData,
          province: formData.province.toLowerCase(),
          district: formData.district.toLowerCase(),
          skills: formData.role === "JobSeeker" ? formData.skills.split(",") : [],
          achievements: formData.role === "JobSeeker" ? formData.achievements.split(",") : [],
          workExperiences: formData.role === "JobSeeker" ? formData.workExperiences.split(",") : [],
        },
        { withCredentials: true }
      );
      toast.success("User created successfully!");
      setShowCreateModal(false);
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        personalSummary: "",
        phone: "",
        province: "",
        district: "",
        skills: "",
        achievements: "",
        password: "",
        role: "",
        location: "",
        dateOfBirth: "",
        gender: "",
        workExperiences: "",
      });
      setCategorizedUsers((prev) => ({
        ...prev,
        [formData.role === "Client" ? "clients" : "jobSeekers"]: [
          ...prev[formData.role === "Client" ? "clients" : "jobSeekers"],
          data.user,
        ],
      }));
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.message || "Failed to create user.");
    }
  };

  // if (loading) {
  //   return <p>Loading users...</p>;
  // }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/user/admin/hard-delete-user/${userToDelete}`, {
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      setCategorizedUsers((prev) => ({
        clients: prev.clients.filter((user) => user._id !== userToDelete),
        jobSeekers: prev.jobSeekers.filter((user) => user._id !== userToDelete),
      }));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const handleResetPassword = async (userId) => {
    const dummyPassword = prompt("Enter a new dummy password (at least 8 characters):");
    if (!dummyPassword || dummyPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/v1/user/admin/reset-password/${userId}`,
        { dummyPassword },
        { withCredentials: true }
      );
      toast.success("Password reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password.");
    }
  };

  const handleUpdateEmail = async (userId) => {
    const newEmail = prompt("Enter the new email address:");
    if (!newEmail) {
      toast.error("Email cannot be empty.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/v1/user/admin/update-email/${userId}`,
        { email: newEmail },
        { withCredentials: true }
      );
      toast.success("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error("Failed to update email.");
    }
  };

  // Removed duplicate declaration of handleCreateUser

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center mb-6"
      >
        <FaPlus className="mr-2" />
        Create User
      </button>

      {["clients", "jobSeekers"].map((role) => (
        <div key={role} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
            {role === "clients" ? "Clients" : "Job Seekers"}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-2 text-gray-700 font-semibold">Email</th>
                  <th className="text-left px-4 py-2 text-gray-700 font-semibold">Phone</th>
                  <th className="text-left px-4 py-2 text-gray-700 font-semibold">Role</th>
                  <th className="text-right px-4 py-2 text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorizedUsers[role].map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2 capitalize">{user.role}</td>
                    <td className="px-4 py-2 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowViewModal(true);
                        }}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <FaEye className="mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleUpdateEmail(user._id)}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <FaEnvelope className="mr-2" />
                        Email
                      </button>
                      <button
                        onClick={() => handleResetPassword(user._id)}
                        className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 flex items-center"
                      >
                        <FaKey className="mr-2" />
                        Reset
                      </button>
                      <button
                        onClick={() => {
                          setUserToDelete(user._id);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleCreateUser} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="JobSeeker">Job Seeker</option>
              </select>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Gender</option>
                {gender.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <select
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select Province</option>
                {sriLankaProvinces.map((p) => (
                  <option key={p.province} value={p.province}>
                    {p.province.charAt(0).toUpperCase() + p.province.slice(1)}
                  </option>
                ))}
              </select>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-4 py-2"
                disabled={!formData.province}
              >
                <option value="">Select District</option>
                {formData.province &&
                  sriLankaProvinces
                    .find((p) => p.province === formData.province)
                    ?.districts.map((d) => (
                      <option key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </option>
                    ))}
              </select>
              <textarea
                name="personalSummary"
                value={formData.personalSummary}
                onChange={handleInputChange}
                placeholder="Personal Summary"
                className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
              />
              {formData.role === "JobSeeker" && (
                <>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="Skills (comma-separated)"
                    className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
                  />
                  <input
                    type="text"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="Achievements (comma-separated)"
                    className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
                  />
                  <input
                    type="text"
                    name="workExperiences"
                    value={formData.workExperiences}
                    onChange={handleInputChange}
                    placeholder="Work Experiences (comma-separated)"
                    className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
                  />
                </>
              )}
              <button
                type="submit"
                className="col-span-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="col-span-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaKey, FaEnvelope, FaPlus, FaEye } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { gender, sriLankaProvinces } from "../Auth/_utils/constants";

// const ManageUsers = () => {
//   const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
//   const [loading, setLoading] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     personalSummary: "",
//     phone: "",
//     province: "",
//     district: "",
//     skills: "",
//     achievements: "",
//     password: "",
//     role: "",
//     location: "",
//     dateOfBirth: "",
//     gender: "",
//     workExperiences: "",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/get-categorized-users",
//           { withCredentials: true }
//         );
//         setCategorizedUsers(data.categorizedUsers);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/register",
//         {
//           ...formData,
//           province: formData.province.toLowerCase(),
//           district: formData.district.toLowerCase(),
//           skills: formData.role === "JobSeeker" ? formData.skills.split(",") : [],
//           achievements: formData.role === "JobSeeker" ? formData.achievements.split(",") : [],
//           workExperiences: formData.role === "JobSeeker" ? formData.workExperiences.split(",") : [],
//         },
//         { withCredentials: true }
//       );
//       toast.success("User created successfully!");
//       setShowCreateModal(false);
//       setFormData({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         personalSummary: "",
//         phone: "",
//         province: "",
//         district: "",
//         skills: "",
//         achievements: "",
//         password: "",
//         role: "",
//         location: "",
//         dateOfBirth: "",
//         gender: "",
//         workExperiences: "",
//       });
//       setCategorizedUsers((prev) => ({
//         ...prev,
//         [formData.role === "Client" ? "clients" : "jobSeekers"]: [
//           ...prev[formData.role === "Client" ? "clients" : "jobSeekers"],
//           data.user,
//         ],
//       }));
//     } catch (error) {
//       console.error("Error creating user:", error);
//       toast.error(error.response?.data?.message || "Failed to create user.");
//     }
//   };

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

//       <button
//         onClick={() => setShowCreateModal(true)}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center mb-6"
//       >
//         <FaPlus className="mr-2" />
//         Create User
//       </button>

//       {["clients", "jobSeekers"].map((role) => (
//         <div key={role} className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
//             {role === "clients" ? "Clients" : "Job Seekers"}
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Name</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Email</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Phone</th>
//                   <th className="text-left px-4 py-2 text-gray-700 font-semibold">Role</th>
//                   <th className="text-right px-4 py-2 text-gray-700 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categorizedUsers[role].map((user) => (
//                   <tr key={user._id} className="border-b">
//                     <td className="px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.phone}</td>
//                     <td className="px-4 py-2 capitalize">{user.role}</td>
//                     <td className="px-4 py-2 flex justify-end gap-2">
//                       <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center">
//                         <FaEye className="mr-2" />
//                         View
//                       </button>
//                       <button className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 flex items-center">
//                         <FaKey className="mr-2" />
//                         Reset
//                       </button>
//                       <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 flex items-center">
//                         <FaTrash className="mr-2" />
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}

//       {/* Create User Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//             <h2 className="text-xl font-bold mb-4">Create User</h2>
//             <form onSubmit={handleCreateUser} className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="middleName"
//                 value={formData.middleName}
//                 onChange={handleInputChange}
//                 placeholder="Middle Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Phone"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Password"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Role</option>
//                 <option value="Client">Client</option>
//                 <option value="JobSeeker">Job Seeker</option>
//               </select>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 placeholder="Location"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Gender</option>
//                 {gender.map((g) => (
//                   <option key={g} value={g}>
//                     {g}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="province"
//                 value={formData.province}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Province</option>
//                 {sriLankaProvinces.map((p) => (
//                   <option key={p.province} value={p.province}>
//                     {p.province.charAt(0).toUpperCase() + p.province.slice(1)}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="district"
//                 value={formData.district}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//                 disabled={!formData.province}
//               >
//                 <option value="">Select District</option>
//                 {formData.province &&
//                   sriLankaProvinces
//                     .find((p) => p.province === formData.province)
//                     ?.districts.map((d) => (
//                       <option key={d} value={d}>
//                         {d.charAt(0).toUpperCase() + d.slice(1)}
//                       </option>
//                     ))}
//               </select>
//               <textarea
//                 name="personalSummary"
//                 value={formData.personalSummary}
//                 onChange={handleInputChange}
//                 placeholder="Personal Summary"
//                 className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//               />
//               {formData.role === "JobSeeker" && (
//                 <>
//                   <input
//                     type="text"
//                     name="skills"
//                     value={formData.skills}
//                     onChange={handleInputChange}
//                     placeholder="Skills (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                   <input
//                     type="text"
//                     name="achievements"
//                     value={formData.achievements}
//                     onChange={handleInputChange}
//                     placeholder="Achievements (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                   <input
//                     type="text"
//                     name="workExperiences"
//                     value={formData.workExperiences}
//                     onChange={handleInputChange}
//                     placeholder="Work Experiences (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                 </>
//               )}
//               <button
//                 type="submit"
//                 className="col-span-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Create User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCreateModal(false)}
//                 className="col-span-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPlus } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { sriLankaProvinces, gender } from "../Auth/_utils/constants";

// const ManageUsers = () => {
//   const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
//   const [loading, setLoading] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     personalSummary: "",
//     phone: "",
//     province: "",
//     district: "",
//     skills: "",
//     achievements: "",
//     password: "",
//     role: "",
//     location: "",
//     dateOfBirth: "",
//     gender: "",
//     workExperiences: "",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/get-categorized-users",
//           { withCredentials: true }
//         );
//         setCategorizedUsers(data.categorizedUsers);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateUser = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/register",
//         {
//           ...formData,
//           province: formData.province.toLowerCase(),
//           district: formData.district.toLowerCase(),
//           skills: formData.role === "JobSeeker" ? formData.skills.split(",") : [],
//           achievements: formData.role === "JobSeeker" ? formData.achievements.split(",") : [],
//           workExperiences: formData.role === "JobSeeker" ? formData.workExperiences.split(",") : [],
//         },
//         { withCredentials: true }
//       );
//       toast.success("User created successfully!");
//       setShowCreateModal(false);
//       setFormData({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         personalSummary: "",
//         phone: "",
//         province: "",
//         district: "",
//         skills: "",
//         achievements: "",
//         password: "",
//         role: "",
//         location: "",
//         dateOfBirth: "",
//         gender: "",
//         workExperiences: "",
//       });
//       setCategorizedUsers((prev) => ({
//         ...prev,
//         [formData.role === "Client" ? "clients" : "jobSeekers"]: [
//           ...prev[formData.role === "Client" ? "clients" : "jobSeekers"],
//           data.user,
//         ],
//       }));
//     } catch (error) {
//       console.error("Error creating user:", error);
//       toast.error(error.response?.data?.message || "Failed to create user.");
//     }
//   };

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

//       <button
//         onClick={() => setShowCreateModal(true)}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center mb-6"
//       >
//         <FaPlus className="mr-2" />
//         Create User
//       </button>

//       {/* Create User Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//             <h2 className="text-xl font-bold mb-4">Create User</h2>
//             <form onSubmit={handleCreateUser} className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="First Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="middleName"
//                 value={formData.middleName}
//                 onChange={handleInputChange}
//                 placeholder="Middle Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Last Name"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Phone"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 placeholder="Password"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Role</option>
//                 <option value="Client">Client</option>
//                 <option value="JobSeeker">Job Seeker</option>
//               </select>
//               <input
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 placeholder="Location"
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               />
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Gender</option>
//                 {gender.map((g) => (
//                   <option key={g} value={g}>
//                     {g}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="province"
//                 value={formData.province}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//               >
//                 <option value="">Select Province</option>
//                 {sriLankaProvinces.map((p) => (
//                   <option key={p.province} value={p.province}>
//                     {p.province.charAt(0).toUpperCase() + p.province.slice(1)}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="district"
//                 value={formData.district}
//                 onChange={handleInputChange}
//                 className="border border-gray-300 rounded-md px-4 py-2"
//                 disabled={!formData.province}
//               >
//                 <option value="">Select District</option>
//                 {formData.province &&
//                   sriLankaProvinces
//                     .find((p) => p.province === formData.province)
//                     ?.districts.map((d) => (
//                       <option key={d} value={d}>
//                         {d.charAt(0).toUpperCase() + d.slice(1)}
//                       </option>
//                     ))}
//               </select>
//               <textarea
//                 name="personalSummary"
//                 value={formData.personalSummary}
//                 onChange={handleInputChange}
//                 placeholder="Personal Summary"
//                 className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//               />
//               {formData.role === "JobSeeker" && (
//                 <>
//                   <input
//                     type="text"
//                     name="skills"
//                     value={formData.skills}
//                     onChange={handleInputChange}
//                     placeholder="Skills (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                   <input
//                     type="text"
//                     name="achievements"
//                     value={formData.achievements}
//                     onChange={handleInputChange}
//                     placeholder="Achievements (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                   <input
//                     type="text"
//                     name="workExperiences"
//                     value={formData.workExperiences}
//                     onChange={handleInputChange}
//                     placeholder="Work Experiences (comma-separated)"
//                     className="col-span-2 border border-gray-300 rounded-md px-4 py-2"
//                   />
//                 </>
//               )}
//               <button
//                 type="submit"
//                 className="col-span-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Create User
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCreateModal(false)}
//                 className="col-span-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;