import validator from "validator";

import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { sriLankaProvinces } from "../utils/commonVariables.js";

// User - Worker or Client

// Create User
export const register = catchAsyncErrors(async (req, res, next) => {
  const { firstName, middleName, lastName, email, personalSummary, phone, province, district, skills, password, role, location, achievements, dateOfBirth, gender } = req.body;

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
  if(!selectedProvince){
    return next(new ErrorHandler("Invalid province selected!", 400));
  }

  if(!selectedProvince.districts.includes(district.toLowerCase())){
    return next(new ErrorHandler(`Invalid district selected for ${province} province!`, 400))
  }

  const user = await User.create({
    firstName,
    middleName,
    lastName,
    personalSummary,
    email,
    phone,
    location,
    province : province.toLowerCase(),
    district : district.toLowerCase(),
    skills : role === "JobSeeker" ? skills || [] : [], // Only JobSeeker can have skills
    achievements : role === "JobSeeker" ? achievements || [] : [],
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
  
  if (!email || !password ) {
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
  const { firstName, middleName, lastName, phone, province, district, skills, personalSummary, location, achievements, gender, dateOfBirth } = req.body;
  // const userId = req.user._id; // Assuming `req.user` is populated via authentication middleware
  const {userId} = req.params;

  // // Validate required fields
  // if (!firstName && !middleName && !lastName && !phone && !province && !district && !location) {
  //   return next(new ErrorHandler("Please provide at least one field to update!", 400));
  // }

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
  if (skills && user.role === "Worker") user.skills = skills; // Only workers can update skills
  if (achievements && user.role === "Worker") user.achievements = achievements; // Only workers can update skills

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

// Update User Password
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

// Update User Email
export const updateEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const userId = req.user._id;

  // Validate required fields
  if (!email) {
    return next(new ErrorHandler("Please provide an email to update!", 400));
  }

  // Check if the email is valid
  if(!validator.isEmail(email)){
    return next(new ErrorHandler("Please provide a valid email address!", 400));
  }

  // Check if the email is already registered
  const existingUser = await User.findOne({email});
  if(existingUser && existingUser._id.toString() !== userId.toString()){
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
  // await user.remove();
  user.isDeleted = true;
  await user.save();

  // Delete user's related data after account deletion

  // Remove job data posted by client
  if(user.role === "Client"){
    await Job.deleteMany({ postedBy: userId });
  }

  // await Review.deleteMany({$or: [{ reviewerId: userId }, { revieweeId: userId }]})


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