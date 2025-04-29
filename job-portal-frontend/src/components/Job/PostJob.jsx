import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { sriLankaProvinces, jobCategories, workTypes, educationLevels, jobExperience } from "../Auth/_utils/constants.jsx";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]); // Added requiredSkills
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [workType, setWorkType] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [noOfPositions, setNoOfPositions] = useState("");
  const [applyDeadline, setApplyDeadline] = useState("");
  const [isCVRequired, setIsCVRequired] = useState(false);
  const [questions, setQuestions] = useState([{ question: "", answerType: "Text" }]);
  const [photos, setPhotos] = useState([]);
  const [duration, setDuration] = useState({ days: 0, months: 0, years: 0 }); // Added duration
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [salaryType, setSalaryType] = useState("fixed");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Job Title is required.";
    if (!description) newErrors.description = "Job Description is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!province) newErrors.province = "Province is required.";
    if (!district) newErrors.district = "District is required.";
    if (!city) newErrors.city = "City is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!workType) newErrors.workType = "Work Type is required.";
    if (!experience) newErrors.experience = "Experience is required.";
    if (!applyDeadline) newErrors.applyDeadline = "Application Deadline is required.";
    if (!noOfPositions || noOfPositions <= 0) newErrors.noOfPositions = "Number of positions must be greater than 0.";

    if (salaryType === "fixed" && !fixedSalary) {
      newErrors.fixedSalary = "Fixed salary is required.";
    }
    if (salaryType === "range") {
      if (!salaryFrom || !salaryTo) {
        newErrors.salaryRange = "Both 'Salary From' and 'Salary To' are required.";
      } else if (parseFloat(salaryFrom) > parseFloat(salaryTo)) {
        newErrors.salaryRange = "'Salary From' must be less than 'Salary To'.";
      }
    }
    return newErrors;
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation Errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Step 1: Upload photos
      let uploadedPhotos = [];
      if (photos.length > 0) {
        const formData = new FormData();
        photos.forEach((photo) => formData.append("files", photo));

        const { data: uploadData } = await axios.post(
          "http://localhost:4000/api/v1/files/uploads",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Uploaded Photos:", uploadData.files);

        uploadedPhotos = uploadData.files.map((file) => ({
          public_id: file.public_id,
          url: file.url,
          secure_url: file.secure_url,
        }));
      }

      // Step 2: Submit job data
      // const jobData = {
      //   title,
      //   description,
      //   category,
      //   requiredSkills,
      //   province,
      //   district,
      //   city,
      //   address,
      //   fixedSalary: salaryType === "fixed" ? fixedSalary : undefined,
      //   salaryFrom: salaryType === "range" ? salaryFrom : undefined,
      //   salaryTo: salaryType === "range" ? salaryTo : undefined,
      //   workType,
      //   experience,
      //   education,
      //   noOfPositions,
      //   applyDeadline,
      //   isCVRequired,
      //   photos: uploadedPhotos,
      //   duration,
      //   questions: questions.filter((q) => q.question.trim() !== ""),
      // };

      const jobData = {
        title,
        description,
        category,
        requiredSkills,
        province,
        district,
        city,
        address,
        fixedSalary: salaryType === "fixed" ? Number(fixedSalary) : undefined,
        salaryFrom: salaryType === "range" ? Number(salaryFrom) : undefined,
        salaryTo: salaryType === "range" ? Number(salaryTo) : undefined,
        workType,
        experience,
        education,
        noOfPositions: Number(noOfPositions),
        applyDeadline,
        isCVRequired,
        photos: uploadedPhotos,
        duration: {
          days: Number(duration.days),
          months: Number(duration.months),
          years: Number(duration.years)
        },
        questions: questions.filter((q) => q.question.trim() !== ""),
      };
      

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Job posted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error(error.response?.data?.message || "Failed to post the job.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setRequiredSkills([]);
    setProvince("");
    setDistrict("");
    setCity("");
    setAddress("");
    setFixedSalary("");
    setSalaryFrom("");
    setSalaryTo("");
    setWorkType("");
    setExperience("");
    setEducation("");
    setNoOfPositions("");
    setApplyDeadline("");
    setIsCVRequired(false);
    setQuestions([{ question: "", answerType: "Text" }]);
    setPhotos([]);
    setDuration({ days: 0, months: 0, years: 0 });
    setSalaryType("fixed");
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleRequiredSkillsChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions, (option) => option.value);
    setRequiredSkills(selectedSkills);
  };

  const handleDurationChange = (field, value) => {
    setDuration({ ...duration, [field]: value });
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answerType: "Text" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="job_post page py-12 mt-16 bg-gradient-to-r from-green-50 via-green-100 to-green-50">
      <div className="container mx-auto px-4 md:px-8">
        <h3 className="text-3xl font-semibold text-center text-black mb-6">POST NEW JOB</h3>
        <form onSubmit={handleJobPost} className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">
          <InputField label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
          <TextareaField
            label="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
          />
          <SelectField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={jobCategories.map((cat) => cat.name)} error={errors.category} />
          <SelectField
            label="Required Skills"
            value={requiredSkills}
            onChange={handleRequiredSkillsChange}
            options={jobCategories.find((cat) => cat.name === category)?.skills || []}
            multiple
          />
          <SelectField label="Province" value={province} onChange={(e) => setProvince(e.target.value)} options={sriLankaProvinces.map((p) => p.province)} error={errors.province} />
          <SelectField label="District" value={district} onChange={(e) => setDistrict(e.target.value)} options={sriLankaProvinces.find((p) => p.province === province)?.districts || []} error={errors.district} />
          <InputField label="City" value={city} onChange={(e) => setCity(e.target.value)} error={errors.city} />
          <InputField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} error={errors.address} />
          <SelectField label="Work Type" value={workType} onChange={(e) => setWorkType(e.target.value)} options={workTypes} error={errors.workType} />
          <SelectField label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} options={jobExperience} error={errors.experience} />
          <SelectField label="Education Level" value={education} onChange={(e) => setEducation(e.target.value)} options={educationLevels} />
          <InputField label="Number of Positions" type="number" value={noOfPositions} onChange={(e) => setNoOfPositions(e.target.value)} error={errors.noOfPositions} />
          <InputField label="Application Deadline" type="date" value={applyDeadline} onChange={(e) => setApplyDeadline(e.target.value)} error={errors.applyDeadline} />


          {/* Salary Type Selection */}
          {/* Salary Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="salaryType" value="fixed" checked={salaryType === "fixed"} onChange={() => { setSalaryType("fixed"); setSalaryFrom(""); setSalaryTo(""); }} className="mr-2" />
                Fixed Salary
              </label>
              <label className="flex items-center">
                <input type="radio" name="salaryType" value="range" checked={salaryType === "range"} onChange={() => { setSalaryType("range"); setFixedSalary(""); }} className="mr-2" />
                Salary Range
              </label>
            </div>
          </div>

          {salaryType === "fixed" && (
            <InputField label="Fixed Salary" type="number" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} error={errors.fixedSalary} />
          )}
          {salaryType === "range" && (
            <div className="flex gap-4">
              <InputField label="Salary From" type="number" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} error={errors.salaryRange} />
              <InputField label="Salary To" type="number" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} error={errors.salaryRange} />
            </div>
          )}

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Duration</label>
            <div className="flex gap-4">
              <InputField label="Days" type="number" value={duration.days} onChange={(e) => handleDurationChange("days", e.target.value)} />
              <InputField label="Months" type="number" value={duration.months} onChange={(e) => handleDurationChange("months", e.target.value)} />
              <InputField label="Years" type="number" value={duration.years} onChange={(e) => handleDurationChange("years", e.target.value)} />
            </div>
          </div>

          {/* Photos */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <input type="file" multiple onChange={handlePhotoChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            <div className="mt-2 flex gap-2">
              {photos.map((photo, index) => (
                <p key={index} className="text-gray-600">{photo.name}</p>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
            {questions.map((q, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input type="text" value={q.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} placeholder="Enter Question" className="w-full p-2 border border-gray-300 rounded-lg" />
                <select value={q.answerType} onChange={(e) => handleQuestionChange(index, "answerType", e.target.value)} className="p-2 border border-gray-300 rounded-lg">
                  <option value="Text">Text</option>
                  <option value="Yes/No">Yes/No</option>
                  <option value="Number">Number</option>
                </select>
                <button type="button" onClick={() => removeQuestion(index)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={addQuestion} className="text-green-500">Add Question</button>
          </div>

          {/* CV Required */}
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" checked={isCVRequired} onChange={(e) => setIsCVRequired(e.target.checked)} className="mr-2" />
              CV Required
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-4 bg-green-800 text-white text-xl font-semibold rounded-lg hover:bg-green-700 transition duration-300" disabled={loading}>
            {loading ? "Posting Job..." : "Post Job"}
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ label, type = "text", value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input type={type} value={value} onChange={onChange} className={`w-full p-4 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`} />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

const TextareaField = ({ label, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={5}
      className={`w-full p-4 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
    />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, options, error, multiple = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      multiple={multiple}
      className={`w-full p-4 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800`}
    >
      <option value="">Select {label}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default PostJob;

