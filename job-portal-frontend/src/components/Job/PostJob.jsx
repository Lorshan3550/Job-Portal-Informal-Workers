import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [skills, setSkills] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { isAuthorized, user } = useContext(Context);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Job Title is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!city) newErrors.city = "City is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!skills) newErrors.skills = "Skills are required."; 
    if (salaryType === "Ranged Salary" && (!salaryFrom || !salaryTo)) {
      newErrors.salary = "Both 'Salary From' and 'Salary To' are required.";
    }
    if (salaryType === "Fixed Salary" && !fixedSalary) {
      newErrors.fixedSalary = "Fixed Salary is required.";
    }
    if (salaryFrom && salaryTo && parseFloat(salaryFrom) > parseFloat(salaryTo)) {
      newErrors.salaryRange = "'Salary From' must be less than 'Salary To'.";
    }
    return newErrors;
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "",
        salaryType === "Fixed Salary"
          ? { title, description, category, country, city, location, fixedSalary, skills } 
          : { title, description, category, country, city, location, salaryFrom, salaryTo, skills }, 
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");
      setSkills(""); // reset skills
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="job_post page py-12 mt-16 bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="container mx-auto px-4 md:px-8">
        <h3 className="text-3xl font-semibold text-center text-black mb-6">POST NEW JOB</h3>
        <form onSubmit={handleJobPost} className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              className={`w-full p-4 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-4 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            >
              <option value="">Select Category</option>
              <option value="Construction and Maintenance">Construction and Maintenance</option>
              <option value="Home Services">Home Services</option>
              <option value="Transportation and Delivery">Transportation and Delivery</option>
              <option value="Agriculture and Farming">Agriculture and Farming</option>
              <option value="Beauty and Personal Care">Beauty and Personal Care</option>
              <option value="Event Services">Event Services</option>
              <option value="Repairs and Maintenance">Repairs and Maintenance</option>
              <option value="Tailoring and Crafting">Tailoring and Crafting</option>
              <option value="Hospitality and Catering">Hospitality and Catering</option>
              <option value="Skilled Labor">Skilled Labor</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className={`w-full p-4 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className={`w-full p-4 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            />
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={`w-full p-4 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 mb-4`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}

          <div className="mb-4">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className={`w-full p-4 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "Fixed Salary" && (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                className={`w-full p-4 border ${errors.fixedSalary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 mt-4`}
              />
            )}
            {salaryType === "Ranged Salary" && (
              <div className="flex gap-4 mt-4">
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className={`w-full p-4 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
                />
                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className={`w-full p-4 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
                />
              </div>
            )}
            {errors.salary && <p className="text-red-500 text-sm mt-2">{errors.salary}</p>}
            {errors.salaryRange && <p className="text-red-500 text-sm mt-2">{errors.salaryRange}</p>}
          </div>

          <div className="mb-4">
            <textarea
              rows="4"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Enter Required Skills (comma separated)"
              className={`w-full p-4 border ${errors.skills ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
            />
            {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills}</p>}
          </div>

          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className={`w-full p-4 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 mb-6`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-green-800 text-white text-xl font-semibold rounded-lg hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating Job..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
