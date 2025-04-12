import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Validate form inputs
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (phone.length < 10) newErrors.phone = "Phone number must be at least 10 digits.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!coverLetter.trim()) newErrors.coverLetter = "Cover letter is required.";
    if (!resume) newErrors.resume = "Resume is required.";
    else {
      const allowedFormats = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedFormats.includes(resume.type)) {
        newErrors.resume = "Invalid file type. Only PDF, JPG, and PNG allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle File Upload
  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  // Handle Form Submission
  const handleApplication = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "", 
        formData,
        {
          withCredentials: true, 
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      setErrors({});

      
      toast.success("Successfully applied for the job!", { duration: 3000 });

      setTimeout(() => {
        navigateTo("/job/getall");
      }, 3000);
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 p-8 mt-16">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Job Application Form
        </h3>
        <form onSubmit={handleApplication} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:outline-none"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:outline-none"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:outline-none"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <textarea
              placeholder="Cover Letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:outline-none h-32 resize-none"
            />
            {errors.coverLetter && <p className="text-red-600 text-sm mt-1">{errors.coverLetter}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-green-800 file:rounded-lg hover:file:bg-green-900 transition-all cursor-pointer"
            />
            {errors.resume && <p className="text-red-600 text-sm mt-1">{errors.resume}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white text-lg rounded-lg py-3 shadow-md border-2 border-transparent hover:border-white hover:bg-green-900 transition-all duration-300"
          >
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
