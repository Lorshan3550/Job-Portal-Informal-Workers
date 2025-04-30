import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Admin } from "../models/adminSchema.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";


// Create User
export const registerAdmin = catchAsyncErrors(async (req, res, next) => {
    const { name, email, role, password} = req.body;
  
    // Validate required fields
    if (!name || !email  || !password) {
      return next(new ErrorHandler("Please fill full form !", 400));
    }
  
    // Check if email is already registered
    const isEmail = await Admin.findOne({ email });
    if (isEmail) {
      return next(new ErrorHandler("Email already registered !", 400));
    }
  
    const admin = await Admin.create({
      name,
      email,
      password,
      role,
    });
    sendToken(admin, 201, res, "Admin Registered Sucessfully !");
  });
  
  // Login User
  export const loginAdmin = catchAsyncErrors(async (req, res, next) => {
  
    const { email, password } = req.body;
    
    if (!email || !password ) {
      return next(new ErrorHandler("Please provide email ,password and role !"));
    }
  
    const admin = await Admin.findOne({ email }).select("+password");
  
    if (!admin) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
  
    const isPasswordMatched = await admin.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password !", 400));
    }
    
    sendToken(admin, 201, res, "User Logged In Sucessfully !");
  });
  
// Update Admin Information
  export const updateAdmin = catchAsyncErrors(async (req, res, next) => {
    const {_id : adminId} = req.admin;
    const { name, email, role, password} = req.body;
    
  
    // Find the user to update
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(new ErrorHandler("Admin not found!", 404));
    }
  
    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (password) admin.password = password;
  
    // Save the updated user
    await admin.save();
  
    res.status(200).json({
      success: true,
      message: "Admin updated successfully!",
      admin,
    });
  });
  
// Logout Admin
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

  // Get all applications categorized by job for admin
  export const getAllApplicationsCategorizedByJobForAdmin = catchAsyncErrors(async (req, res, next) => {
    // Ensure the request is made by an admin
    if (!req.admin) {
      return next(new ErrorHandler("Only admins can access this resource.", 403));
    }
  
    // Retrieve all jobs
    const jobs = await Job.find({adminApproval: true});
  
    if (!jobs.length) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }
  
    // Retrieve all applications and populate jobId and workerId
    const applications = await Application.find()
      .populate("jobId", "title category province district city") // Populate job details
      .populate("workerId", "firstName lastName email phone gender"); // Populate worker details
  
    // Categorize applications by jobId
    const categorizedApplications = jobs.map((job) => {
      const jobApplications = applications.filter(
        (application) => application.jobId && application.jobId._id.toString() === job._id.toString()
      );
      return {
        jobId: job._id,
        jobTitle: job.title,
        applications: jobApplications, // Include all application details
      };
    });
  
    res.status(200).json({
      success: true,
      count: applications.length,
      categorizedApplications,
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
  

