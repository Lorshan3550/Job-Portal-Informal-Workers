import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Admin } from "../models/adminSchema.js";
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