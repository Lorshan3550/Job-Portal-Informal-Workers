import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Ensure only workers can apply
  if (role !== "Worker") {
    return next(new ErrorHandler("Only workers can apply for jobs.", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    retypePhoneNumber,
    province,
    district,
    city,
    location,
    educationQualifications,
    gender,
    experience,
    languageProficiency,
    whyApplyJob,
    jobId,
    questions,
    resume,
  } = req.body;

  // Validate required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !retypePhoneNumber ||
    !province ||
    !district ||
    !city ||
    !location ||
    !educationQualifications ||
    !gender ||
    !experience ||
    !languageProficiency ||
    !whyApplyJob ||
    !jobId
  ) {
    return next(new ErrorHandler("Please fill all the required fields.", 400));
  }

  // Ensure phone numbers match
  if (phoneNumber !== retypePhoneNumber) {
    return next(new ErrorHandler("Phone numbers do not match.", 400));
  }

  // Validate job existence
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("The specified job does not exist.", 404));
  }

  // Validate resume if job requires a CV
  if (job.isCVRequired && (!resume || !resume.public_id || !resume.url)) {
    return next(
      new ErrorHandler(
        "Resume is required for this job as the employer has marked CV as mandatory.",
        400
      )
    );
  }

  // Create application
  const application = await Application.create({
    jobId,
    workerId: req.user._id,
    firstName,
    lastName,
    email,
    phoneNumber,
    retypePhoneNumber,
    province,
    district,
    city,
    location,
    educationQualifications,
    gender,
    experience,
    languageProficiency,
    whyApplyJob,
    resume,
    questions,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully!",
    application,
  });
});



export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
