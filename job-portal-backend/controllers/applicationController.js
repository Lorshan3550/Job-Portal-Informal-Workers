import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

import cloudinary from "cloudinary";


// Informal Worker submit the job application
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Ensure only workers can apply
  if (role !== "JobSeeker") {
    return next(new ErrorHandler("Only JobSeeker can apply for jobs.", 400));
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


// Get job applications based on the client/Businesses
export const clientGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role ,_id: clientId } = req.user;  // renaming _id to clientId

    // Ensure the user is not a JobSeeker
    if (role === "JobSeeker") {
      return next(
        new ErrorHandler("JobSeeker not allowed to access this resource.", 403)
      );
    }

    // Find the jobs posted by the client
    const jobs = await Job.find({postedBy : clientId})

    if(!jobs.length){
      return res.status(404).json({
        success: false,
        message: "No jobs found for this client.",
      });
    }

    // Retrieve job IDs from the jobs posted by the client
    const jobIds = jobs.map((job) => job._id);

    // Find all applications matching the job IDs
    const applications = await Application.find({ jobId: { $in: jobIds } });


    // Categorize applications by jobId
    const categorizedApplications = jobs.map((job) => {
      const jobApplications = applications.filter(
        (application) => application.jobId.toString() === job._id.toString()
      );
      return {
        jobId: job._id,
        jobTitle: job.title,
        applications: jobApplications,
      };
    });

    // // Find all the applications
    // const applications = await Application.find();

    // // Filter the applications based on the jobIds of every job
    // const filteredApplications = applications.filter((application) => {
    //   return jobs.map((job) => job._id.toString() === application.jobId.toString())
    // })

    // console.log("applications : ", applications)
    
    //const applications = await Application.find({ "workerId": _id });
    res.status(200).json({
      success: true,
      count : applications.length,
      categorizedApplications,
    });
  }
);

// Job Seeker get his/her applied job applications
export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "JobSeeker") {
      return next(
        new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "workerId": _id });
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
