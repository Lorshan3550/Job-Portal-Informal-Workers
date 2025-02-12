import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  // Sample user data
  const sampleUser = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    location: "New York, USA",
    dob: "1990-05-15",
  };

  const [user, setUser] = useState(sampleUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(sampleUser);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100 mt-16">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center mb-6">Profile</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUser className="ml-2 text-gray-600" />
              <input
                type="text"
                name="firstname"
                value={updatedUser.firstname}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-100 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUser className="ml-2 text-gray-600" />
              <input
                type="text"
                name="lastname"
                value={updatedUser.lastname}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-100 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaEnvelope className="ml-2 text-gray-600" />
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaPhone className="ml-2 text-gray-600" />
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-100 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaMapMarkerAlt className="ml-2 text-gray-600" />
              <input
                type="text"
                name="location"
                value={updatedUser.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-100 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaCalendarAlt className="ml-2 text-gray-600" />
              <input
                type="date"
                name="dob"
                value={updatedUser.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-gray-100 focus:bg-white"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-between mt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;