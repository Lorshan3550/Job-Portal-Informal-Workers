import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable"
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaTools,
  FaTrophy,
  FaEdit,
  FaLock,
  FaExpeditedssl,
  FaToolbox
} from "react-icons/fa";
import { provinces, jobSkills } from "./_utils/constants";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // State for updating email and password
  const [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);

  // Fetch user profile from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setProfile(data.user);
        setOriginalProfile(data.user);

        setSkills(data.user.skills.map((skill) => ({ value: skill, label: skill })));
        setAchievements(data.user.achievements.map((achievement) => ({ value: achievement, label: achievement })));
        setWorkExperiences(data.user.workExperiences.map((experience) => ({ value: experience, label: experience })));

      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch profile data."
        );
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // Prepare the updated profile data
    const updatedProfile = {
      ...profile,
      skills: skills.map((skill) => skill.value), // Convert skills to an array of strings
      achievements: achievements.map((achievement) => achievement.value), // Convert achievements to an array of strings
      workExperiences: workExperiences.map((experience) => experience.value), // Convert work experiences to an array of strings
    };
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/update/${profile._id}`,
        updatedProfile,
        { withCredentials: true }
      );
      toast.success(data.message || "Profile updated successfully!");
      setOriginalProfile(profile);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setSkills(originalProfile.skills.map((skill) => ({ value: skill, label: skill })));
    setAchievements(originalProfile.achievements.map((achievement) => ({ value: achievement, label: achievement })));
    setWorkExperiences(originalProfile.workExperiences.map((experience) => ({ value: experience, label: experience })));
    setIsEditing(false);
  };

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update-email",
        { email },
        { withCredentials: true }
      );
      toast.success(data.message || "Email updated successfully!");
      setProfile((prev) => ({ ...prev, email }));
      setShowUpdateEmailForm(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update email."
      );
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updatepassword",
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      );
      toast.success(data.message || "Password updated successfully!");
      setShowUpdatePasswordForm(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 mt-16 py-12">
      <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
          <h3 className="text-3xl font-semibold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h3>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={FaUser}
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            icon={FaUser}
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            icon={FaEnvelope}
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
          />
          <InputField
            icon={FaPhone}
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <SelectField
            icon={FaVenusMars}
            label="Gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            disabled={!isEditing}
            options={["Male", "Female", "Other"]}
          />
          <InputField
            icon={FaMapMarkerAlt}
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <SelectField
            icon={FaMapMarkerAlt}
            label="Province"
            name="province"
            value={profile.province}
            onChange={handleChange}
            disabled={!isEditing}
            options={Object.keys(provinces)}
          />
          <SelectField
            icon={FaMapMarkerAlt}
            label="District"
            name="district"
            value={profile.district}
            onChange={handleChange}
            disabled={!isEditing}
            options={provinces[profile.province] || []}
          />
          <InputField
            icon={FaCalendarAlt}
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={profile.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {profile.role === "JobSeeker" && (
            <>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                {isEditing ? (
                  <CreatableSelect
                    isMulti
                    value={skills}
                    onChange={setSkills}
                    options={jobSkills.map((skill) => ({ value: skill, label: skill }))}
                    placeholder="Add or search skills"
                  />
                ) : (
                  <>
                    {/* <p className="text-gray-700">{profile.skills?.join(", ") || "N/A"}</p> */}
                    <InputField
                      icon={FaTools}
                      label=""
                      name="skills"
                      value={profile.skills?.join(", ") || "N/A"}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </>

                )}
              </div>
            </>
          )}

          {profile.role === "JobSeeker" && (
            <>
              <div className="mb-4 col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements
                </label>
                {isEditing ? (
                  <CreatableSelect
                    isMulti
                    value={achievements}
                    onChange={setAchievements}
                    options={[]}
                    placeholder="Add achievements"
                  />
                ) : (
                  <InputField
                    icon={FaTrophy}
                    label=""
                    name="Achievements"
                    value={profile.achievements?.join(", ") || "N/A"}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                )}
              </div>
            </>
          )}

          {profile.role === "JobSeeker" && (
            <>
              <div className="mb-2 col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Experiences
                </label>
                {isEditing ? (
                  <CreatableSelect
                    isMulti
                    value={workExperiences}
                    onChange={setWorkExperiences}
                    options={[]}
                    placeholder="Add work experiences"
                  />
                ) : (
                  <>
                    <InputField
                      icon={FaToolbox}
                      label=""
                      name="Work Experiences"
                      value={profile.workExperiences?.join(", ") || "N/A"}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />

                  </>

                )}
              </div>
            </>
          )}




        </div>

        {/* Edit Profile Buttons */}
        <div className="mt-8 text-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-900 transition flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* Update Email Section */}
        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4">Update Email</h4>
          {!showUpdateEmailForm ? (
            <button
              onClick={() => setShowUpdateEmailForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Email
            </button>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={FaEnvelope}
                label="New Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdateEmail}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
                <button
                  onClick={() => setShowUpdateEmailForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Update Password Section */}
        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4">Update Password</h4>
          {!showUpdatePasswordForm ? (
            <button
              onClick={() => setShowUpdatePasswordForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={FaLock}
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputField
                icon={FaLock}
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputField
                icon={FaLock}
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdatePassword}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
                <button
                  onClick={() => setShowUpdatePasswordForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
      <Icon className="text-gray-600 mr-3" />
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full bg-transparent focus:outline-none"
        disabled={disabled}
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, name, value, onChange, disabled, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
      <Icon className="text-gray-600 mr-3" />
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full bg-transparent focus:outline-none"
        disabled={disabled}
      >
        <option value="">Select {label}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Profile;