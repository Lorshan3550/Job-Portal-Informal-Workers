import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { provinces } from "./_utils/constants";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa"; // Importing icons

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [province, setProvince] = useState("Northern");
  const [district, setDistrict] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [personalSummary, setPersonalSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [achievements, setAchievements] = useState("");

  const { setIsAuthorized } = useContext(Context);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
      !firstname.trim() ||
      !lastname.trim() ||
      !email ||
      !phone ||
      !password ||
      !province ||
      !district ||
      !role ||
      !location ||
      !dob ||
      !gender
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!validatePhone(phone)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (role === "Job Seeker" && (!skills || !achievements)) {
      toast.error("Skills and Achievements are required for Job Seekers.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/register",
        {
          firstname,
          middleName,
          lastname,
          email,
          phone,
          password,
          role,
          province,
          district,
          location,
          dob,
          gender,
          personalSummary,
          skills,
          achievements,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthorized(true);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  // Function to navigate to Login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen  bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="logo" className="w-20 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold">Create a new account</h3>
        </div>
        <form
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleRegister}
        >
          {/* Register As */}
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Register As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 "
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline focus:outline-sky-500">
              <FaUser className="ml-2 text-gray-600" />
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 "
                placeholder="Enter First Name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaUser className="ml-2 text-gray-600" />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaUser className="ml-2 text-gray-600" />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Province and District */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaMapMarkerAlt className="ml-2 text-gray-600" />
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-2"
              >
                <option value="">Select Province</option>
                {Object.keys(provinces).map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaMapMarkerAlt className="ml-2 text-gray-600" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-2"
                disabled={!province}
              >
                <option value="">Select District</option>
                {provinces[province]?.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Other Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaEnvelope className="ml-2 text-gray-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="Enter Email Address"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaPhone className="ml-2 text-gray-600" />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaLock className="ml-2 text-gray-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaMapMarkerAlt className="ml-2 text-gray-600" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="Enter Location"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
              <FaCalendarAlt className="ml-2 text-gray-600" />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2"
                onFocus={(e) => e.target.showPicker()} // Triggers the calendar view when the field is focused
              />
            </div>
          </div>

          {/* Conditional Fields for Job Seeker */}
          {role === "Job Seeker" && (
            <>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
                  <FaUser className="ml-2 text-gray-600" />
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-2"
                    placeholder="Enter Your Skills"
                  />
                </div>
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements
                </label>
                <div className="flex items-center border border-gray-300 rounded-md focus:ring-2 focus:ring-green-800">
                  <FaUser className="ml-2 text-gray-600" />
                  <input
                    type="text"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    className="w-full px-4 py-2"
                    placeholder="Enter Your Achievements"
                  />
                </div>
              </div>
            </>
          )}

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
              Register
            </button>
          </div>

          <div className="mt-4 col-span-2 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={handleLoginRedirect}
                className="text-green-700 font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
