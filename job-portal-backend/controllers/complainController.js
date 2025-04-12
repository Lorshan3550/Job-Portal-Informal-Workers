import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Complain } from "../models/complainSchema.js";
import { User } from "../models/userSchema.js";
import { Review } from "../models/reviewSchema.js";

// Make a complaint
export const makeComplain = catchAsyncErrors(async (req, res, next) => {
  const { userId, reviewId, subject, description, attachments } = req.body;

  // Validate required fields
  if (!userId || !subject || !description) {
    return next(new ErrorHandler("Please provide all the required fields.", 400));
  }

  // Validate if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Validate if the review exists (if reviewId is provided)
  if (reviewId) {
    const review = await Review.findById(reviewId);
    if (!review) {
      return next(new ErrorHandler("Review not found.", 404));
    }
  }

  // Create a new complaint
  const complain = new Complain({
    userId,
    reviewId,
    subject,
    description,
    attachments : attachments ? attachments : [],
  });

  // Save the complaint
  await complain.save();

  res.status(201).json({
    success: true,
    message: "Complaint submitted successfully!",
    complain,
  });
});

// Update complaint status
export const updateComplainStatus = catchAsyncErrors(async (req, res, next) => {
    const { complainId } = req.params;
    const { status } = req.body;
  
    // Validate if the complaint exists
    const complain = await Complain.findById(complainId);
    if (!complain) {
      return next(new ErrorHandler("Complaint not found.", 404));
    }
  
    // Update the status of the complaint
    complain.status = status;
  
    // Save the updated complaint
    await complain.save();
  
    res.status(200).json({
      success: true,
      message: "Complaint status updated successfully!",
      complain,
    });
  });