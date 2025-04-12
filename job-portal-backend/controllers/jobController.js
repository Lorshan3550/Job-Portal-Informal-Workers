import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sriLankaProvinces, workTypes, jobCategories } from "../utils/commonVariables.js";
import validator from "validator";

// Get All Jobs
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    noOfJobs : jobs.length ,
    jobs,
  });
});

// Post a Job 
export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Ensure only users with the 'Client' role can post jobs
  if (role !== "Client") {
    return next(
      new ErrorHandler("Only users with the 'Client' role can post jobs.", 400)
    );
  }

  // Destructure request body
  const {
    title,
    description,
    category,
    requiredSkills,
    province,
    district,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    photos,
    experience,
    workType,
    applyDeadline,
    education,
    noOfPositions,
    isCVRequired,
    cvLink,
    duration,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !category ||
    !requiredSkills ||
    !province ||
    !district ||
    !city ||
    !location ||
    !workType ||
    !applyDeadline ||
    !noOfPositions ||
    !duration
  ) {
    return next(new ErrorHandler("Please provide all required job details.", 400));
  }

  // Validate salary fields
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide a fixed salary or a ranged salary (salaryFrom and salaryTo).",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot provide both fixed salary and ranged salary together.", 400)
    );
  }

  // Validate skills based on the selected category
  const selectedCategory = jobCategories.find((cat) => cat.name === category);
  if (!selectedCategory) {
    return next(new ErrorHandler("Invalid job category.", 400));
  }

  const invalidSkills = requiredSkills.filter(
    (skill) => !selectedCategory.skills.includes(skill)
  );
  if (invalidSkills.length > 0) {
    return next(
      new ErrorHandler(
        `Invalid skills: ${invalidSkills.join(
          ", "
        )}. Please provide skills relevant to the selected category.`,
        400
      )
    );
  }

  // Validate district and province relationship
  const selectedProvince = sriLankaProvinces.find(
    (p) => p.province === province
  );
  if (!selectedProvince) {
    return next(new ErrorHandler("Invalid province.", 400));
  }

  if (!selectedProvince.districts.includes(district.toLowerCase())) {
    return next(
      new ErrorHandler(
        `Invalid district: ${district} for the selected province: ${province}.`,
        400
      )
    );
  }

  // Validate CV link if CV is required
  if (isCVRequired && (!cvLink || !cvLink.startsWith("http"))) {
    return next(
      new ErrorHandler(
        "CV link is required and must be a valid URL if 'isCVRequired' is true.",
        400
      )
    );
  }

  // Validate photos
  if (photos && photos.some((url) => !url.startsWith("http"))) {
    return next(
      new ErrorHandler("All photos must be valid URLs starting with http or https.", 400)
    );
  }

  // Validate workType
  if (!workTypes.includes(workType)) {
    return next(new ErrorHandler("Invalid work type.", 400));
  }

  // Create the job document
  const job = await Job.create({
    title,
    description,
    category,
    requiredSkills,
    province,
    district,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    photos: photos || [],
    experience: experience || { days: 0, months: 0, years: 0 },
    workType,
    duration,
    applyDeadline,
    education,
    noOfPositions,
    isCVRequired,
    cvLink: isCVRequired ? cvLink : null,
    postedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Job posted successfully!",
    job,
  });
});

// Get posted jobs based logged Client
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    noOfJobs : myJobs.length,
    myJobs,
  });
});


export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Ensure workers cannot access this resource
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;

  // Find the existing job
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }

  const { category, requiredSkills, ...otherFields } = req.body;

  // Validate the category if it's being updated
  if (category) {
    const validCategory = jobCategories.find((cat) => cat.name === category);
    if (!validCategory) {
      return next(new ErrorHandler("Invalid job category.", 400));
    }
  }

  // Validate the skills if they are being updated
  if (requiredSkills) {
    const selectedCategory = category || job.category; // Use updated category if provided, else use the existing one
    const validCategory = jobCategories.find((cat) => cat.name === selectedCategory);

    if (!validCategory) {
      return next(new ErrorHandler("Invalid job category.", 400));
    }

    const invalidSkills = requiredSkills.filter(
      (skill) => !validCategory.skills.includes(skill)
    );
    if (invalidSkills.length > 0) {
      return next(
        new ErrorHandler(
          `Invalid skills: ${invalidSkills.join(
            ", "
          )}. Please provide skills relevant to the selected category.`,
          400
        )
      );
    }
  }

  // Apply updates manually
  Object.assign(job, { category, requiredSkills, ...otherFields});

  // Save the updated job
  await job.save();


  res.status(200).json({
    success: true,
    message: "Job Updated!",
    job
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Worker") {
    return next(
      new ErrorHandler("Worker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
