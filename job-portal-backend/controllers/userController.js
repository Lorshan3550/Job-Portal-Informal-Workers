import validator from "validator";

import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { sriLankaProvinces, jobSkills } from "../utils/commonVariables.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";

// User - Worker or Client

// Create User
export const register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, middleName, lastName, email, personalSummary, phone, province, district, skills, password, role, location, achievements, dateOfBirth, gender, workExperiences } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone || !password || !role || !province || !district || !location || !dateOfBirth || !gender) {
    return next(new ErrorHandler("Please fill full form !", 400));
  }

  // Check if email is already registered
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered !", 400));
  }

  // Validate province and district
  const selectedProvince = sriLankaProvinces.find((p) => p.province === province.toLowerCase())
  if (!selectedProvince) {
    return next(new ErrorHandler("Invalid province selected!", 400));
  }

  if (!selectedProvince.districts.includes(district.toLowerCase())) {
    return next(new ErrorHandler(`Invalid district selected for ${province} province!`, 400))
  }

  if(skills){
    const invalidSkills = skills.filter((skill) => !jobSkills.includes(skill.toLowerCase()) )
    if(invalidSkills.length > 0){
      return next(new ErrorHandler(`Invalid Skill ${invalidSkills}`, 400))
    }
  }

  const user = await User.create({
    firstName,
    middleName,
    lastName,
    personalSummary,
    email,
    phone,
    location,
    province: province.toLowerCase(),
    district: district.toLowerCase(),
    skills: role === "JobSeeker" ? skills || [] : [], // Only JobSeeker can have skills
    achievements: role === "JobSeeker" ? achievements || [] : [],
    workExperiences: role === "JobSeeker" ? workExperiences || [] : [],
    password,
    role,
    gender,
    dateOfBirth,
  });
  sendToken(user, 201, res, "User Registered Sucessfully !");
});

// Login User
export const login = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email ,password and role !"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password !", 400));
  }

  sendToken(user, 201, res, "User Logged In Sucessfully !");
});

// Update User Basic Information
export const update = catchAsyncErrors(async (req, res, next) => {
  const { firstName, middleName, lastName, phone, province, district, skills, personalSummary, location, achievements, gender, dateOfBirth, workExperiences } = req.body;
  const { userId } = req.params;

  // Find the user to update
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Validate province and district if provided
  if (province) {
    const selectedProvince = sriLankaProvinces.find((p) => p.province === province.toLowerCase());
    if (!selectedProvince) {
      return next(new ErrorHandler("Invalid province selected!", 400));
    }

    if (district && !selectedProvince.districts.includes(district.toLowerCase())) {
      return next(new ErrorHandler(`Invalid district selected for ${province} province!`, 400));
    }

    user.province = province.toLowerCase();
  }
  if (district) user.district = district.toLowerCase();


  // Update fields
  if (firstName) user.firstName = firstName;
  if (middleName) user.middleName = middleName;
  if (lastName) user.lastName = lastName;
  if (location) user.location = location;
  if (phone) user.phone = phone;
  if (skills && user.role === "JobSeeker") user.skills = skills; // Only workers can update skills
  if (achievements && user.role === "JobSeeker") user.achievements = achievements; // Only workers can update skills
  if (workExperiences && user.role === "JobSeeker") user.workExperiences = workExperiences; // Only workers can update skills
  if (personalSummary) user.personalSummary = personalSummary;
  if (gender) user.gender = gender;
  if (dateOfBirth) user.dateOfBirth = dateOfBirth;

  // Save the updated user
  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    user,
  });
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully !",
    });
});

// Get User
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password - Client / JobSeeker
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  // Validate required fields
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please provide old password, new password, and confirm new password!", 400));
  }

  // Find the authenticated user
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Check if old password matches
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect!", 400));
  }

  // Check if new password matches confirm password
  if (newPassword !== confirmNewPassword) {
    return next(new ErrorHandler("New password and confirm password do not match!", 400));
  }

  // Update the password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully!",
  });
});

// Update User Email - Client / JobSeeker
export const updateEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const userId = req.user._id;

  // Validate required fields
  if (!email) {
    return next(new ErrorHandler("Please provide an email to update!", 400));
  }

  // Check if the email is valid
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please provide a valid email address!", 400));
  }

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== userId.toString()) {
    return next(new ErrorHandler("This email is already registered with another account!", 400))
  }

  // Find the user to update
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Update fields
  if (email) user.email = email;

  // Save the updated user
  await user.save();

  res.status(200).json({
    success: true,
    message: "User Email updated successfully!",
  });
});

// Delete User Email - Soft Delete
export const deleteAccount = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  // Find the user to delete
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  // Delete the user account
  user.isDeleted = true;
  await user.save();


  // Remove job data posted by client
  if (user.role === "Client") {
    await Job.deleteMany({ postedBy: userId });
  }


  res.status(200).json({
    success: true,
    message: "User account deleted successfully!",
  });
});


// Get All User - Temporary
export const allUsers = catchAsyncErrors(async (req, res, next) => {

  // Find all users
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "All user accounts fetched successfully!",
    users
  });
})

// Get all users by role
export const getUsersCategorizedByRole = catchAsyncErrors(async (req, res, next) => {
  // Retrieve all users
  const users = await User.find();

  if (!users.length) {
    return res.status(404).json({
      success: false,
      message: "No users found.",
    });
  }

  // Categorize users by role
  const categorizedUsers = {
    clients: users.filter((user) => user.role === "Client"),
    jobSeekers: users.filter((user) => user.role === "JobSeeker"),
  };

  res.status(200).json({
    success: true,
    count: users.length,
    categorizedUsers,
  });
});

// Reset User Password by Admin
export const resetUserPasswordByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params; // Extract user ID from request parameters
  const { dummyPassword } = req.body; // Extract the dummy password from the request body

  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can reset user passwords.", 403));
  }

  // Validate the dummy password
  if (!dummyPassword || dummyPassword.length < 8) {
    return next(new ErrorHandler("Please provide a valid dummy password with at least 8 characters.", 400));
  }

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Update the user's password
  user.password = dummyPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User password has been reset successfully.",
  });
});

// Hard Delete User - Admin
export const hardDeleteUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params; // Extract user ID from request parameters

  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can delete users.", 403));
  }

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Check and delete related data based on the user's role
  if (user.role === "Client") {
    // Check if the client has posted any jobs
    const jobs = await Job.find({ postedBy: userId });
    if (jobs.length > 0) {
      // Delete all jobs posted by the client
      await Job.deleteMany({ postedBy: userId });
    }
  } else if (user.role === "JobSeeker") {
    // Check if the job seeker has submitted any applications
    const applications = await Application.find({ workerId: userId });
    if (applications.length > 0) {
      // Delete all applications submitted by the job seeker
      await Application.deleteMany({ workerId: userId });
    }
  }

  // Hard delete the user
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User and related data have been deleted successfully.",
  });
});

// Update User Email by Admin
export const updateUserEmailByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params; // Extract user ID from request parameters
  const { email } = req.body; // Extract the new email from the request body

  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can update user emails.", 403));
  }

  // Validate the email
  if (!email || !validator.isEmail(email)) {
    return next(new ErrorHandler("Please provide a valid email address.", 400));
  }

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== userId.toString()) {
    return next(new ErrorHandler("This email is already registered with another account.", 400));
  }

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Update the user's email
  user.email = email;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User email has been updated successfully.",
    user,
  });
});

// Filter the all the JobSeekers by the Skills and (Province, District, Location(City)) by the Client
export const filterJobSeekersBySkillsAndLocation = catchAsyncErrors(async (req, res, next) => {
  // Only allow access for Clients
  if (!req.user || req.user.role !== "Client") {
    return next(new ErrorHandler("Only clients can access this resource.", 403));
  }

  const { skills, province, district, city } = req.query;

  // Build the query object
  const query = { role: "JobSeeker", isDeleted: false };

  // Skills: support single or comma-separated multiple skills (OR condition)
  if (skills) {
    const skillsArray = Array.isArray(skills)
      ? skills.map((s) => s.trim().toLowerCase())
      : skills.split(",").map((s) => s.trim().toLowerCase());
    query.skills = { $in: skillsArray };
  }

  // Province
  if (province) {
    const validProvince = sriLankaProvinces.find(
      (prov) => prov.province === province.toLowerCase()
    );
    if (!validProvince) {
      return next(new ErrorHandler("Invalid province.", 400));
    }

    query.province = province.toLowerCase();
  }

  // District
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

  // City (location)
  if (city) {
    query.location = { $regex: city, $options: "i" };
  }

  // Fetch matching JobSeekers
  const jobSeekers = await User.find(query).select("-password -passwordResetToken -passwordResetExpires");

  res.status(200).json({
    success: true,
    count: jobSeekers.length,
    jobSeekers,
  });
})

export const getJobSeekersByJobSkills = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.params;

  // Validate if the job exists and is admin-approved
  const job = await Job.findOne({ _id: jobId, adminApproval: true });
  if (!job) {
    return next(new ErrorHandler("Job not found or not approved by admin.", 404));
  }

  // Extract requiredSkills from the job
  const { requiredSkills } = job;

  if (!requiredSkills || requiredSkills.length === 0) {
    return next(new ErrorHandler("The job does not have any required skills.", 400));
  }

  // Find JobSeekers whose skills match at least one of the requiredSkills
  const jobSeekers = await User.find({
    role: "JobSeeker",
    isDeleted: false,
    skills: { $in: requiredSkills.map(skill => skill.toLowerCase()) },
  }).select("-password -passwordResetToken -passwordResetExpires");

  res.status(200).json({
    success: true,
    count: jobSeekers.length,
    jobSeekers,
  });
});

// Delete All Users
export const deleteAllUsers = catchAsyncErrors(async (req, res, next) => {
  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can delete all users.", 403));
  }

  // Delete all users
  await User.deleteMany();

  res.status(200).json({
    success: true,
    message: "All users have been deleted successfully.",
  });
});