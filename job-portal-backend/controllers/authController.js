import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendEmail, sendEmailContent } from "../utils/emailHandling.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Send 6 Character Verification code to email to reset password with reset link.
export const sendPasswordResetCode = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
  
    if (!email) {
      return next(new ErrorHandler("Please provide an email address.", 400));
    }
  
    const user = await User.findOne({ email }).select("+passwordResetToken");
    if (!user) {
      return next(new ErrorHandler("User with this email does not exist.", 404));
    }

    const resetCode = user.createPasswordResetToken();
  
    await user.save({ validateBeforeSave: false });
  
    // Generate temporary JWT token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
  
    // Email content
    const emailContent = sendEmailContent(user, resetCode)
  
    // Only Send Response If Email Sending Succeeds**
    const emailResponse = await sendEmail(user.email, "Password Reset Code", emailContent);
    if (!emailResponse.success) {
      return next(new ErrorHandler("Failed to send password reset email.", 500));
    }
  
    // Store the reset token in cookies
    res.cookie("resetToken", resetToken, {
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Password reset code sent to your email. Check your inbox.",
    });
  });
  

// verify user entered reset code with reset code sent to email.
export const verifyResetCode = catchAsyncErrors(async (req, res, next) => {
    const { verificationCode } = req.body;
    const { resetToken } = req.cookies;
  
    if (!resetToken) {
      return next(new ErrorHandler("No reset request found. Try again.", 400));
    }
  
    // Verify JWT
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("+passwordResetToken +passwordResetExpires");
  
    if (!user) {
      return next(new ErrorHandler("Invalid request. User not found.", 400));
    }
  
    // Check if token is expired
    if (Date.now() > user.passwordResetExpires) {
      return next(new ErrorHandler("Verification code has expired. Request a new one.", 400));
    }
  
    // Compare entered code with stored hash
    const isValidCode = await bcrypt.compare(verificationCode, user.passwordResetToken);
    if (!isValidCode) {
      return next(new ErrorHandler("Invalid verification code.", 400));
    }

    res.clearCookie("resetToken");


    const changePasswordToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "20m",
    });

    res.cookie("changePasswordToken", resetToken, {
        expires: new Date(Date.now() + 20 * 60 * 1000), // 20 min expiry
        httpOnly: true,
    });


  
    res.status(200).json({
      success: true,
      message: "Verification code is valid.",
    });
  });

  // After successfull code verification, It allows to change the password.
  export const changePassword = catchAsyncErrors(async (req, res, next) => {
    const { newPassword, confirmNewPassword } = req.body;
    const { changePasswordToken } = req.cookies;
  
    if (!changePasswordToken) {
      return next(new ErrorHandler("No reset request found. Try again.", 400));
    }
  
    // Verify JWT
    const decoded = jwt.verify(changePasswordToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("+passwordResetToken +passwordResetExpires");
  
    if (!user) {
      return next(new ErrorHandler("Invalid request. User not found.", 400));
    }
  
    // Check if token is expired
    if (Date.now() > user.passwordResetExpires) {
      return next(new ErrorHandler("Verification code has expired. Request a new one.", 400));
    }
  
    // Validate passwords
    if (!newPassword || !confirmNewPassword) {
      return next(new ErrorHandler("Please provide both new password and confirmation.", 400));
    }
  
    if (newPassword !== confirmNewPassword) {
      return next(new ErrorHandler("Passwords do not match.", 400));
    }
  
    // Hash and update new password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
  
    await user.save();
  
    // Clear reset token cookie after password change
    res.clearCookie("changePasswordToken");
  
    res.status(200).json({
      success: true,
      message: "Password has been successfully changed. You can now log in.",
    });
  });
  
  