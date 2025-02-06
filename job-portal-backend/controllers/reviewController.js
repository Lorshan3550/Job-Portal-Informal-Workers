import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Review } from "../models/reviewSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";
import { User } from "../models/userSchema.js";

// Post a review 
// Need to consider this situation - when reviewer or reviewee is JobSeeker, then JobSeeker should be selected to the job. 
// Need to add another field in job application schema, that JobSeeker is selected to the job or not by the client
export const postReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewerId, revieweeId, jobId, rating, completedWork, comments, title, workQuality, professionalism, communication, isAnonymous, attachments } = req.body;
  const {_id : userId} = req.user

  // Validate required fields
  if (!reviewerId || !revieweeId || !jobId || rating === undefined || completedWork === undefined || !isAnonymous) {
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

  // console.log("reviwerID : ", reviewerId)
  // console.log("userId : ", userId.toString())
  // console.log(reviewerId !== userId.toString())

  // Ensure logged In user in reviewer or reviewee
  if(reviewerId !== userId.toString()){
    return next(new ErrorHandler("Reviewer and reviewee should be logged In", 400));
  }

  // Fetch information about reviewer and reviewee
  const reviewer = await User.findById(reviewerId)
  const reviewee = await User.findById(revieweeId)

  if (!reviewer || !reviewee) {
    return next(new ErrorHandler("Invalid reviewer or reviewee ID.", 404));
  }

  // JobSeeker who has selected to the job only can create review or receive review.
  if(reviewer.role === "JobSeeker" || reviewee.role === "JobSeeker"){

    if(reviewer.role === "JobSeeker"){

      // Fetch application status to know whether the JobSeeker is selected to the job
    const isApplicationSelected = await Application.find({
      workerId : { $in : [reviewerId, revieweeId]},
      jobId : job._id
    })

    //console.log("Application : ", isApplicationSelected)

    if (!isApplicationSelected || isApplicationSelected.length === 0){
      return next(new ErrorHandler("Job Seeker didn't applied to the job cannot make review", 404));
    }

    //console.log(isApplicationSelected[0].status)

    if(isApplicationSelected[0].status !== "Accepted"){
      return next(new ErrorHandler("Unselected Job Seeker cannot cannot make review", 404));
    }

    }

    


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
