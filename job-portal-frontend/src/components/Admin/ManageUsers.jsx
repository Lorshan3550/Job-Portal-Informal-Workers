import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaKey, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [categorizedUsers, setCategorizedUsers] = useState({ clients: [], jobSeekers: [] });
  const [expandedUserId, setExpandedUserId] = useState(null); // Track expanded user
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/user/admin/hard-delete-user/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      setCategorizedUsers((prev) => ({
        clients: prev.clients.filter((user) => user._id !== userId),
        jobSeekers: prev.jobSeekers.filter((user) => user._id !== userId),
      }));
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

  const toggleExpand = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {["clients", "jobSeekers"].map((role) => (
        <div key={role} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">
            {role === "clients" ? "Clients" : "Job Seekers"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedUsers[role].map((user) => (
              <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                {/* User Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={() => toggleExpand(user._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {expandedUserId === user._id ? (
                      <FaChevronUp className="text-lg" />
                    ) : (
                      <FaChevronDown className="text-lg" />
                    )}
                  </button>
                </div>

                {/* Expanded User Details */}
                {expandedUserId === user._id && (
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>Location:</strong> {user.location}, {user.district}, {user.province}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.role}
                    </p>
                    <p>
                      <strong>Gender:</strong> {user.gender}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {user.dateOfBirth}
                    </p>
                    {user.skills.length > 0 && (
                      <p>
                        <strong>Skills:</strong> {user.skills.join(", ")}
                      </p>
                    )}
                    {user.achievements.length > 0 && (
                      <p>
                        <strong>Achievements:</strong> {user.achievements.join(", ")}
                      </p>
                    )}
                    {user.workExperiences.length > 0 && (
                      <p>
                        <strong>Work Experiences:</strong> {user.workExperiences.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4 gap-1">
                  <button
                    onClick={() => handleUpdateEmail(user._id)}
                    className="bg-blue-600 text-white px-1 py-1  rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <FaEnvelope className="mr-2" />
                    Update Email
                  </button>
                  <button
                    onClick={() => handleResetPassword(user._id)}
                    className="bg-yellow-600 text-white px-1 py-1 rounded-lg hover:bg-yellow-700 flex items-center"
                  >
                    <FaKey className="mr-2" />
                    Reset Password
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;