import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Review } from "../models/reviewSchema.js";
import { Job } from "../models/jobSchema.js";

// Post a review 
// Need to consider this situation - when reviewer or reviewee is JobSeeker, then JobSeeker should be selected to the job. 
// Need to add another field in job application schema, that JobSeeker is selected to the job or not by the client
export const postReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewerId, revieweeId, jobId, rating, completedWork, comments, title, workQuality, professionalism, communication, flagged, flaggedReason, isAnonymous, attachments } = req.body;

  // Validate required fields
  if (!reviewerId || !revieweeId || !jobId || rating === undefined || completedWork === undefined) {
    return next(new ErrorHandler("Please provide all the required fields.", 400));
  }

  // Validate if the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job does not exist.", 404));
  }

  // Ensure reviewer and reviewee are not the same
  if (reviewerId === revieweeId) {
    return next(new ErrorHandler("Reviewer and reviewee cannot be the same user.", 400));
  }

  // Ensure the review type is valid (Middleware ensures this but additional validation is safe)
  const review = new Review({
    reviewerId,
    revieweeId,
    jobId,
    rating,
    completedWork,
    comments,
    title,
    workQuality,
    professionalism,
    communication,
    flagged,
    flaggedReason,
    isAnonymous,
    attachments,
  });

  // Save the review
  await review.save();

  res.status(201).json({
    success: true,
    message: "Review posted successfully!",
    review,
  });
});
