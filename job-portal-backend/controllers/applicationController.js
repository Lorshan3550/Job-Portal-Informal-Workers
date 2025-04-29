import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

import cloudinary from "cloudinary";


// JobSeeker submit the job application
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role, _id: jobSeekerId } = req.user;

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
    answers,
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

  // Ensure JobSeeker has already submitted the application
  const isApplicationSubmitted = await Application.findOne({ workerId: jobSeekerId, jobId: jobId });

  if (isApplicationSubmitted) {
    return next(new ErrorHandler("Already submitted the application for this job", 400))
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

  // Ensure JobSeeker cannot submit the application for job has either expired or status has closed
  if (job && (job.expired === true || job.status === "Closed" || Date.now() > new Date(job.applyDeadline))) {
    return next(new ErrorHandler("job has already closed or expired", 403));
  }

  // console.log("resume : ", resume)
  // console.log("resume public Id : ", resume.public_id)
  // console.log("resume url  : ", resume.url)
  // console.log("resume secure url : ", resume.secure_url)



  // Validate resume if job requires a CV
  if (job.isCVRequired && (!resume || !resume.public_id || !resume.url || !resume.secure_url)) {
    return next(
      new ErrorHandler(
        "Resume is required for this job as the client/Business has marked CV as mandatory.",
        400
      )
    );
  }

  // Validate dynamic questions and answers
  const jobQuestions = job.questions || [];
  if (jobQuestions.length > 0) {

    if (!answers || !Array.isArray(answers) || answers.length !== jobQuestions.length) {
      return next(
        new ErrorHandler(
          `You must provide answers for all questions. Expected ${jobQuestions.length} answers.`,
          400
        )
      );
    }

    // Ensure answers align with job's questions
    for (let i = 0; i < jobQuestions.length; i++) {
      const jobQuestion = jobQuestions[i];
      const userAnswer = answers.find((answer) => answer.questionId === jobQuestion._id.toString());

      if (!userAnswer || !userAnswer.answer) {
        return next(new ErrorHandler(`Answer missing for question: ${jobQuestion.question}`, 400));
      }

      // Validate answer type
      if (jobQuestion.answerType === "Yes/No" && !["Yes", "No"].includes(userAnswer.answer)) {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be 'Yes' or 'No'.`, 400)
        );
      }

      if (jobQuestion.answerType === "Number" && isNaN(userAnswer.answer)) {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be a valid number.`, 400)
        );
      }

      if (jobQuestion.answerType === "Text" && typeof userAnswer.answer !== "string") {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be text.`, 400)
        );
      }
    }

  }

   // Create the application with answers derived from the request body
   const applicationQuestions = jobQuestions.map((jobQuestion) => {
    const userAnswer = answers.find((answer) => answer.questionId === jobQuestion._id.toString());
    return {
      question: jobQuestion.question,
      answer: userAnswer.answer,
    };
  });

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
      questions : applicationQuestions,
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
    const { role, _id: clientId } = req.user;  // renaming _id to clientId

    // Ensure the user is not a JobSeeker
    if (role === "JobSeeker") {
      return next(
        new ErrorHandler("JobSeeker not allowed to access this resource.", 403)
      );
    }

    // Find the jobs posted by the client
    const jobs = await Job.find({ postedBy: clientId })

    if (!jobs.length) {
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
      count: applications.length,
      categorizedApplications,
    });
  }
);

// Job Seeker get his/her applied job application
export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    // if (role === "Clin") {
    //   return next(
    //     new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
    //   );
    // }
    const { _id } = req.user;
    const applications = await Application.find({ "workerId": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Job Seeker delete his/her applied job application
export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {

    const { role } = req.user;
    if (role === "Client") {
      return next(
        new ErrorHandler("Client not allowed to access this resource.", 400)
      );
    }
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId);

    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    // Validate job existence
    const job = await Job.findById(application.jobId);
    if (!job) {
      return next(new ErrorHandler("The specified job does not exist.", 404));
    }

    // Ensure JobSeeker cannot delete the application for job has either expired or status has closed
    if (job && (job.expired === true || job.status === "Closed" || Date.now() > new Date(job.applyDeadline))) {
      return next(new ErrorHandler(`job has already closed`, 403));
    }

    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);

// Job Seeker update his/her applied job application before the deadline or before job closed or expired
export const updateApplication = catchAsyncErrors(async (req, res, next) => {
  const { role, _id: jobSeekerId } = req.user;
  const { applicationId } = req.params;

  // Ensure only JobSeekers can update applications
  if (role !== "JobSeeker") {
    return next(new ErrorHandler("Only JobSeekers can update applications.", 400));
  }

  const {
    firstName,
    lastName,
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
    answers,
  } = req.body;

  // Validate application existence
  const application = await Application.findById(applicationId).populate("jobId");
  console.log("application with populate with jobID : ", application)
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  // Ensure the application belongs to the current JobSeeker
  if (application.workerId.toString() !== jobSeekerId.toString()) {
    return next(new ErrorHandler("You can only update your own applications.", 403));
  }

  const job = application.jobId;

  // Ensure the application is editable (job is not closed or expired)
  if (job.expired || job.status === "Closed" || Date.now() > new Date(job.applyDeadline)) {
    return next(new ErrorHandler("This application cannot be updated as the job is closed or expired.", 403));
  }

  // Validate phone numbers match
  if (phoneNumber && retypePhoneNumber && phoneNumber !== retypePhoneNumber) {
    return next(new ErrorHandler("Phone numbers do not match.", 400));
  }

  // Validate dynamic questions and answers
  if (answers && answers.length > 0){
    const jobQuestions = job.questions || [];
  if (jobQuestions.length > 0) {
    if (!answers || !Array.isArray(answers) || answers.length !== jobQuestions.length) {
      return next(
        new ErrorHandler(
          `You must provide answers for all questions. Expected ${jobQuestions.length} answers.`,
          400
        )
      );
    }

    for (let i = 0; i < jobQuestions.length; i++) {
      const jobQuestion = jobQuestions[i];
      const userAnswer = answers.find((answer) => answer.questionId === jobQuestion._id.toString());

      if (!userAnswer || !userAnswer.answer) {
        return next(new ErrorHandler(`Answer missing for question: ${jobQuestion.question}`, 400));
      }

      if (jobQuestion.answerType === "Yes/No" && !["Yes", "No"].includes(userAnswer.answer)) {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be 'Yes' or 'No'.`, 400)
        );
      }

      if (jobQuestion.answerType === "Number" && isNaN(userAnswer.answer)) {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be a valid number.`, 400)
        );
      }

      if (jobQuestion.answerType === "Text" && typeof userAnswer.answer !== "string") {
        return next(
          new ErrorHandler(`Answer for question: "${jobQuestion.question}" must be text.`, 400)
        );
      }
    }
  }
  }
  

  // Update the application fields
  if (firstName) application.firstName = firstName;
  if (lastName) application.lastName = lastName;
  if (phoneNumber) application.phoneNumber = phoneNumber;
  if (retypePhoneNumber) application.retypePhoneNumber = retypePhoneNumber;
  if (province) application.province = province;
  if (district) application.district = district;
  if (city) application.city = city;
  if (location) application.location = location;
  if (educationQualifications) application.educationQualifications = educationQualifications;
  if (gender) application.gender = gender;
  if (experience) application.experience = experience;
  if (languageProficiency) application.languageProficiency = languageProficiency;
  if (whyApplyJob) application.whyApplyJob = whyApplyJob;

  // Update answers
  if (answers) {
    application.questions = jobQuestions.map((jobQuestion) => {
      const userAnswer = answers.find((answer) => answer.questionId === jobQuestion._id.toString());
      return {
        question: jobQuestion.question,
        answer: userAnswer.answer,
      };
    });
  }

  await application.save();

  res.status(200).json({
    success: true,
    message: "Application updated successfully!",
    application,
  });
});


export const updateApplicationStatus = catchAsyncErrors(async (req, res, next) => {
  const { role, _id: clientId } = req.user; // Extract client ID and role
  const { applicationId } = req.params; // Extract application ID from request parameters
  const { status } = req.body; // Extract the new status from the request body

  // Ensure the user is not a JobSeeker
  if (role === "JobSeeker") {
    return next(
      new ErrorHandler("JobSeeker not allowed to access this resource.", 403)
    );
  }

  // Validate the status value
  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return next(
      new ErrorHandler("Invalid status. Allowed values are 'Pending', 'Accepted', or 'Rejected'.", 400)
    );
  }

  // Find the application
  const application = await Application.findById(applicationId).populate("jobId");
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  // Ensure the client owns the job associated with the application
  const job = application.jobId;
  if (!job || job.postedBy.toString() !== clientId.toString()) {
    return next(new ErrorHandler("You are not authorized to update this application.", 403));
  }

  // Update the application status
  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    message: `Application status updated to '${status}' successfully!`,
    application,
  });
});



