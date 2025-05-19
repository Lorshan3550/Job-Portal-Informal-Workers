import { Admin } from "../models/adminSchema.js";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Check if the user is an admin
  const admin = await Admin.findById(decoded.id);
  if (admin) {
    req.admin = admin;
    return next();
  }

  // Check if the user is a regular user
  const user = await User.findById(decoded.id);
  if (user) {
    req.user = user;
    return next();
  }

  return next(new ErrorHandler("User Not Authorized", 401));
});
