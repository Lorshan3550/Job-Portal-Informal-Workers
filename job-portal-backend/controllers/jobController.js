import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sriLankaProvinces, workTypes, jobCategories, jobExperience, jobSkills } from "../utils/commonVariables.js";
import validator from "validator";
import { sendEmail, sendJobApprovalEmailContent } from "../utils/emailHandling.js";
import { User } from "../models/userSchema.js";

// Get All Jobs - 
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  // const jobs = await Job.find({ expired: false });
  const now = new Date();

  const jobs = await Job.find({
    $or: [
      { expired: false },
      { permanentRejection: false }, // Jobs not marked as permanently rejected

      {
        rejectionCorrectionDeadline: { $gte: now }, // Deadline has not passed
        adminApproval: false, // Not approved by admin 
      },
    ],
  });
  res.status(200).json({
    success: true,
    noOfJobs: jobs.length,
    jobs,
  });
});

export const getAllJobsWithRejectionLogic = catchAsyncErrors(async (req, res, next) => {
  const now = new Date();

  // Query to include permanent rejection logic
  const jobs = await Job.find({
    $or: [
      { permanentRejection: true }, // Jobs already marked as permanently rejected
      {
        rejectionCorrectionDeadline: { $lte: now }, // Deadline has passed
        adminApproval: false, // Not approved by admin
      },
    ],
  });

  res.status(200).json({
    success: true,
    noOfJobs: jobs.length,
    jobs,
  });
});

// Get All Jobs - AdminApproved
export const getApprovedJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false, adminApproval: true });
  res.status(200).json({
    success: true,
    noOfJobs: jobs.length,
    jobs,
  });
});

// Get All Jobs - NotAdminApproved
export const getNonApprovedJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false, adminApproval: false });
  res.status(200).json({
    success: true,
    noOfJobs: jobs.length,
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
    address,
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
    duration,
    questions,
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
    !address ||
    !workType ||
    !applyDeadline ||
    !noOfPositions ||
    !duration ||
    !experience
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

  const skillsArray = Array.isArray(requiredSkills)
    ? requiredSkills.map((skill) => skill.trim().toLowerCase()) // If it's already an array
    : requiredSkills.split(",").map((skill) => skill.trim().toLowerCase()); // If it's a single string

  console.log("skillsArray: ", skillsArray)

  const invalidSkills = skillsArray.filter(
    (skill) => !selectedCategory.skills.map((sk) => sk.toLowerCase()).includes(skill)
  );
  console.log("Invalid Skills : ", invalidSkills)
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

  // Validate photos
  if (photos && photos.some((photo) => !photo.url.startsWith("http") || !photo.secure_url.startsWith("https"))) {
    return next(
      new ErrorHandler("All photos must be valid URLs starting with http or https.", 400)
    );
  }

  console.log("After URL Validation");

  // Validate workType
  if (!workTypes.includes(workType)) {
    return next(new ErrorHandler("Invalid work type.", 400));
  }

  // Validate Experience
  if (!jobExperience.includes(experience)) {
    return next(new ErrorHandler("Invalid experience.", 400));
  }

  if (!req.user || !req.user._id) {
    return next(new ErrorHandler("User authentication error. Please login again.", 400));
  }


  // Create the job document
  const job = await Job.create({
    title,
    description,
    category,
    requiredSkills: skillsArray,
    province,
    district,
    city,
    address,
    fixedSalary,
    salaryFrom,
    salaryTo,
    photos: photos || [],
    experience,
    workType,
    duration,
    applyDeadline,
    education,
    noOfPositions,
    isCVRequired,
    postedBy: req.user._id,
    questions,
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
  if (role === "JobSeeker") {
    return next(
      new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    noOfJobs: myJobs.length,
    myJobs,
  });
});



export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Ensure workers cannot access this resource
  if (role === "JobSeeker") {
    return next(
      new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
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
  Object.assign(job, { category, requiredSkills, ...otherFields });

  // Save the updated job
  await job.save();


  res.status(200).json({
    success: true,
    message: "Job Updated!",
    job
  });
});


export const updateAdminApproval = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // Job ID from the request parameters
  const { adminApproval, reasonForRejection } = req.body; // New admin approval status and reason for rejection

  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can update job approval status.", 403));
  }

  // Validate the adminApproval field
  if (typeof adminApproval !== "boolean") {
    return next(new ErrorHandler("Invalid value for adminApproval. It must be true or false.", 400));
  }

  // Find the job by ID
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  // Find the posted User baseb on the job postedBy field
  const user = await User.find({_id : job.postedBy})
  console.log("user -> ", user)

  // If adminApproval is false, validate the reasonForRejection field
  if (!adminApproval && (!reasonForRejection || reasonForRejection.trim() === "")) {
    return next(new ErrorHandler("Reason for rejection is required when adminApproval is false.", 400));
  }

  // Update the adminApproval and reasonForRejection fields
  job.adminApproval = adminApproval;
  job.reasonForRejection = adminApproval ? null : reasonForRejection; // Clear reason if approved
  await job.save();




  res.status(200).json({
    success: true,
    message: `Job approval status updated to ${adminApproval ? "approved" : "not approved"}.`,
    job,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "JobSeeker") {
    return next(
      new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
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

export const deleteAllJobs = catchAsyncErrors(async (req, res, next) => {
  // const { role } = req.user;

  // // Ensure workers cannot access this resource
  // if (role === "JobSeeker") {
  //   return next(
  //     new ErrorHandler("JobSeeker not allowed to access this resource.", 400)
  //   );
  // }

  // Delete all jobs
  await Job.deleteMany();

  res.status(200).json({
    success: true,
    message: "All jobs have been deleted!",
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

// Fetch all admin approved jobs categorized by the categories.
export const getApprovedJobsByCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    // Fetch all admin-approved jobs
    const approvedJobs = await Job.find({ adminApproval: true });

    // Sort jobCategories alphabetically by their name
    const sortedCategories = jobCategories.sort((a, b) => a.name.localeCompare(b.name))

    // Initialize the categorizedJobs object with all categories from jobCategories
    const categorizedJobs = sortedCategories.reduce((acc, category) => {
      acc[category.name] = { jobs: [], count: 0 };
      return acc;
    }, {});

    // Add a custom "All category"
    // categorizedJobs['All'] = { jobs: approvedJobs, count: approvedJobs.length };

    // console.log("Categorized Jobs : ", categorizedJobs)

    // Sort categorizedJobs by its keys in alphabetical order
    const sortedCategorizedJobs = Object.keys(categorizedJobs)
      .sort((a, b) => a.localeCompare(b)) // Sort keys alphabetically
      .reduce((acc, key) => {
        acc[key] = categorizedJobs[key]; // Rebuild the object in sorted order
        return acc;
      }, {});

    // console.log(sortedCategorizedJobs)




    // Categorize jobs by their category
    // approvedJobs.forEach((job) => {
    //   if (categorizedJobs[job.category]) {
    //     categorizedJobs[job.category].jobs.push(job);
    //     categorizedJobs[job.category].count += 1;
    //   } else {
    //     // If a job's category is not in jobCategories, add it to "Other"
    //     categorizedJobs['Other'].jobs.push(job);
    //     categorizedJobs['Other'].count += 1;
    //   }
    // });

    approvedJobs.forEach((job) => {
      if (categorizedJobs[job.category]) {
        categorizedJobs[job.category].jobs.push(job);
        categorizedJobs[job.category].count += 1;
      } else {
        // If a job's category is not in jobCategories, add it to "Other"
        categorizedJobs['Other'].jobs.push(job);
        categorizedJobs['Other'].count += 1;
      }
    });

    res.status(200).json({
      success: true,
      message: "Admin-approved jobs categorized by category.",
      categorizedJobs,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch categorized jobs.", 500));
  }
});

// Search all the admin appproved by different fields in the jobSchema.
export const searchApprovedJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      title,
      category,
      requiredSkills,
      province,
      district,
      city,
      workType,
      education,
      isCVRequired,
    } = req.query;

    // Build the search query
    const query = { adminApproval: true }; // Only admin-approved jobs

    // Validate and filter by title
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    // Validate and filter by category
    if (category) {
      const validCategory = jobCategories.find((cat) => cat.name === category);
      if (!validCategory) {
        return next(new ErrorHandler("Invalid job category.", 400));
      }
      query.category = category;
    }

    

    // Validate and filter by requiredSkills
    if (requiredSkills) {
      // Ensure requiredSkills is treated as an array
      const skillsArray = Array.isArray(requiredSkills)
        ? requiredSkills.map((skill) => skill.trim().toLowerCase()) // If it's already an array
        : requiredSkills.split(",").map((skill) => skill.trim().toLowerCase()); // If it's a single string

      // Validate skills against jobSkills
      const invalidSkills = skillsArray.filter((skill) => !jobSkills.includes(skill));
      if (invalidSkills.length > 0) {
        return next(
          new ErrorHandler(
            `Invalid skills: ${invalidSkills.join(", ")}. Please provide valid skills.`,
            400
          )
        );
      }

      // Add the requiredSkills filter to the query
      query.requiredSkills = skillsArray[0]; // Match all skills in the array

    }

    // Validate and filter by province
    if (province) {
      const validProvince = sriLankaProvinces.find(
        (prov) => prov.province === province.toLowerCase()
      );
      if (!validProvince) {
        return next(new ErrorHandler("Invalid province.", 400));
      }
      query.province = province.toLowerCase();
    }

    // Validate and filter by district
    if (district) {
      const validDistrict = sriLankaProvinces.find(
        (prov) => prov.districts.includes(district.toLowerCase())
      );
      if (!validDistrict) {
        return next(
          new ErrorHandler(
            `Invalid district: ${district}`,
            400
          )
        );
      }

      query.district = district.toLowerCase();
    }

    // Validate and filter by city
    if (city) {
      query.city = { $regex: city, $options: "i" }; // Case-insensitive search
    }

    // Validate and filter by workType
    if (workType) {
      if (!workTypes.includes(workType)) {
        return next(new ErrorHandler("Invalid work type.", 400));
      }
      query.workType = workType;
    }

    // Validate and filter by education
    if (education) {
      if (!educationLevels.includes(education)) {
        return next(new ErrorHandler("Invalid education level.", 400));
      }
      query.education = education;
    }

    // Validate and filter by isCVRequired
    if (isCVRequired !== undefined) {
      query.isCVRequired = isCVRequired === "true"; // Convert string to boolean
    }

    // Execute the query
    const jobs = await Job.find(query);

    res.status(200).json({
      success: true,
      noOfJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to search jobs.", 500));
  }
});

// Fetch the recommeded jobs based on the LoggedIn JobSeeker skills, province, district, location.
export const getRecommendedJobs = catchAsyncErrors(async (req, res, next) => {
  try {
    // Ensure the user is logged in and is a JobSeeker
    const { role, skills, province, district, location } = req.user;

    if (role !== "JobSeeker") {
      return next(
        new ErrorHandler("Only JobSeekers can access recommended jobs.", 403)
      );
    }

    // Build the search query
    const query = {
      adminApproval: true, // Only admin-approved jobs
      $or: [
        { requiredSkills: { $in: skills } }, // Match at least one skill
        { province: province.toLowerCase() }, // Match province
        { district: district.toLowerCase() }, // Match district
        { city: { $regex: location, $options: "i" } }, // Match city (case-insensitive)
      ],
    };

    // Fetch jobs matching the query
    const jobs = await Job.find(query);

    res.status(200).json({
      success: true,
      noOfJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to fetch recommended jobs.", 500));
  }
});

