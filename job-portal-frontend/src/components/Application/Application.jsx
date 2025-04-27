import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { educationLevels, gender, jobExperience, profiencyLevels, jobPostStatus, provinces } from "../Auth/_utils/constants.jsx"; // import from where the constants are defined

const Application = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    retypePhoneNumber: "",
    province: "",
    district: "",
    city: "",
    location: "",
    educationQualifications: "",
    gender: "",
    experience: "",
    languageProficiencySinhala: "Good",
    languageProficiencyTamil: "Good",
    languageProficiencyEnglish: "Good",
    whyApplyJob: "",
    answers: [],
    jobId : id,
  });

  const [questions, setQuestions] = useState([]);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetch dynamic questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`,
          { withCredentials: true }
        );
        console.log("Questions : ", response.data.job.questions);
        setQuestions(response.data.job.questions);
        console.log("Questions useState : ", questions);
      } catch (error) {
        console.log("Error : ", error);
        toast.error("Failed to fetch questions.");
      }
    };

    fetchQuestions();
  }, [id]);

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required.";
    else if (formData.phoneNumber.length < 10) newErrors.phoneNumber = "Phone Number must be at least 10 digits.";
    if (formData.phoneNumber !== formData.retypePhoneNumber) newErrors.retypePhoneNumber = "Phone numbers must match.";
    if (!formData.province.trim()) newErrors.province = "Province is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.educationQualifications.trim()) newErrors.educationQualifications = "Education is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required.";
    if (!formData.whyApplyJob.trim()) newErrors.whyApplyJob = "Cover letter/Why apply is required.";
    if (!resume) newErrors.resume = "Resume file is required.";
    else {
      const allowedFormats = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedFormats.includes(resume.type)) {
        newErrors.resume = "Only PDF, JPG, and PNG formats are allowed.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Step 1: Upload resume
      const resumeData = new FormData();
      resumeData.append("file", resume);

      const { data: uploadData } = await axios.post(
        "http://localhost:4000/api/v1/files/upload",
        resumeData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Step 2: Submit application
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        retypePhoneNumber: formData.retypePhoneNumber,
        province: formData.province,
        district: formData.district,
        city: formData.city,
        location: formData.location,
        educationQualifications: formData.educationQualifications,
        gender: formData.gender,
        experience: formData.experience,
        languageProficiency: {
          sinhala: formData.languageProficiencySinhala,
          tamil: formData.languageProficiencyTamil,
          english: formData.languageProficiencyEnglish,
        },
        whyApplyJob: formData.whyApplyJob,
        jobId: id,
        answers: formData.answers,
        resume: {
          public_id: uploadData.file.public_id,
          url: uploadData.file.url,
          secure_url: uploadData.file.secure_url,
        },
      };

      console.log("Application Data: ", applicationData);

      await axios.post(
        "http://localhost:4000/api/v1/application/post",
        applicationData,
        { withCredentials: true }
      );

      setLoading(false);
      toast.success("Successfully applied for the job!");

      setTimeout(() => {
        navigateTo("/job/getall");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 p-8 mt-16">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Application Form
        </h3>

        <form onSubmit={handleApplication} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name and Last Name */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            {/* Email and Phone Number */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-field"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div>
              <input
                type="text"
                name="retypePhoneNumber"
                placeholder="Retype Phone Number"
                value={formData.retypePhoneNumber}
                onChange={handleChange}
                className="input-field"
              />
              {errors.retypePhoneNumber && <p className="text-red-500 text-sm">{errors.retypePhoneNumber}</p>}
            </div>

            {/* Province and District */}
            <div>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Province</option>
                {Object.keys(provinces).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>

            <div>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select District</option>
                {formData.province &&
                  provinces[formData.province].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
            </div>

            {/* City, Location, Education Qualifications */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
              />
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            {/* <div>
              <input
                type="text"
                name="educationQualifications"
                placeholder="Education Qualifications"
                value={formData.educationQualifications}
                onChange={handleChange}
                className="input-field"
              />
              {errors.educationQualifications && <p className="text-red-500 text-sm">{errors.educationQualifications}</p>}
            </div> */}

            <div>
              <select
                name="educationQualifications"
                value={formData.educationQualifications}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Education Level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educationQualifications && (
                <p className="text-red-500 text-sm">{errors.educationQualifications}</p>
              )}
            </div>

            {/* Gender, Experience */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Gender</option>
                {gender.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Job Experience</option>
                {jobExperience.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>

            {/* Language Proficiency */}
            <div>
              <select
                name="languageProficiencySinhala"
                value={formData.languageProficiencySinhala}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Good">Sinhala Proficiency</option>
                {profiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                name="languageProficiencyTamil"
                value={formData.languageProficiencyTamil}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Good">Tamil Proficiency</option>
                {profiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                name="languageProficiencyEnglish"
                value={formData.languageProficiencyEnglish}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Good">English Proficiency</option>
                {profiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>



          {/* Dynamic Questions */}
          {questions.map((question) => (
            <div key={question._id}>
              <label className="text-lg font-medium text-gray-700">{question.question}</label>
              {question.answerType === "Yes/No" ? (
                <select
                  name={`answer_${question._id}`}
                  value={
                    formData.answers.find((ans) => ans.questionId === question._id)?.answer || ""
                  }
                  onChange={(e) => {
                    const updatedAnswers = formData.answers.filter(
                      (ans) => ans.questionId !== question._id
                    );
                    updatedAnswers.push({
                      questionId: question._id,
                      answer: e.target.value,
                    });
                    setFormData({ ...formData, answers: updatedAnswers });
                  }}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  type={
                    question.answerType === "Text"
                      ? "text"
                      : question.answerType === "Number"
                        ? "number"
                        : "text" // Default to text if answerType is unknown
                  }
                  name={`answer_${question._id}`}
                  value={
                    formData.answers.find((ans) => ans.questionId === question._id)?.answer || ""
                  }
                  onChange={(e) => {
                    const updatedAnswers = formData.answers.filter(
                      (ans) => ans.questionId !== question._id
                    );
                    updatedAnswers.push({
                      questionId: question._id,
                      answer: e.target.value,
                    });
                    setFormData({ ...formData, answers: updatedAnswers });
                  }}
                  className="input-field"
                />
              )}
            </div>
          ))}


          {/* Resume Upload
          <div>
            <input type="file" accept=".pdf,.jpeg,.png" onChange={handleFileChange} className="input-field" />
            {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
          </div> */}

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-800">
              <input
                type="file"
                accept=".pdf,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-white file:bg-green-800 file:rounded-lg hover:file:bg-green-900 transition-all cursor-pointer"
              />
            </div>
            {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
          </div>

          {/* Why Apply */}
          <div>
            <textarea
              name="whyApplyJob"
              value={formData.whyApplyJob}
              onChange={handleChange}
              placeholder="Why do you want to apply for this job?"
              className="input-field"
            />
            {errors.whyApplyJob && <p className="text-red-500 text-sm">{errors.whyApplyJob}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center bg-green-200 p-4 rounded-lg shadow-md hover:bg-green-300 transition duration-300">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Application;





