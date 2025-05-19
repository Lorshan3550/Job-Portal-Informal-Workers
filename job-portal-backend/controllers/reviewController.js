import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Review } from "../models/reviewSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";
import { User } from "../models/userSchema.js";

// Post a review 
export const postReview = catchAsyncErrors(async (req, res, next) => {
  const {
    jobId,
    rating,
    comments,
    title,
    workQuality,
    professionalism,
    communication,
    isAnonymous,
    attachments,
    workPlaceQuality,
    completedWork,
  } = req.body;

  const { _id: userId, role } = req.user;

  // Validate required fields
  if (!jobId || rating === undefined || isAnonymous === undefined) {
    return next(new ErrorHandler("Please provide all the required fields.", 400));
  }

  // Validate if the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job does not exist.", 404));
  }

  let revieweeId;

  if (role === "JobSeeker") {
    // JobSeeker can review all jobs they applied to
    const application = await Application.findOne({
      workerId: userId,
      jobId: job._id,
    });

    if (!application) {
      return next(
        new ErrorHandler("You can only review jobs you have applied to.", 403)
      );
    }

    // The reviewee is the client who posted the job
    revieweeId = job.postedBy;

    // Validate `workPlaceQuality` field for JobSeeker
    if (workPlaceQuality === undefined) {
      return next(
        new ErrorHandler("Please specify the quality of the workplace.", 400)
      );
    }
  } else if (role === "Client") {
    // Client can only review JobSeekers who applied to their jobs
    const application = await Application.findOne({
      jobId: job._id,
      workerId: req.body.revieweeId, // Ensure the reviewee is the JobSeeker
    });

    if (!application) {
      return next(
        new ErrorHandler(
          "You can only review JobSeekers who applied to your jobs.",
          403
        )
      );
    }

    // The reviewee is the JobSeeker whose application is being reviewed
    revieweeId = req.body.revieweeId;

    // Validate `workQuality` and `completedWork` fields for Client
    if (workQuality === undefined || completedWork === undefined) {
      return next(
        new ErrorHandler(
          "Please specify the quality of work and whether the work was completed.",
          400
        )
      );
    }
  } else {
    return next(
      new ErrorHandler("Only JobSeekers and Clients can post reviews.", 403)
    );
  }

  // Ensure reviewer and reviewee are not the same
  if (userId.toString() === revieweeId.toString()) {
    return next(
      new ErrorHandler("Reviewer and reviewee cannot be the same user.", 400)
    );
  }

  // Create the review
  const review = new Review({
    reviewerId: userId,
    revieweeId,
    jobId,
    rating,
    comments,
    title,
    workQuality: role === "Client" ? workQuality : undefined,
    workPlaceQuality: role === "JobSeeker" ? workPlaceQuality : undefined,
    professionalism,
    communication,
    isAnonymous,
    attachments,
    completedWork: role === "Client" ? completedWork : undefined,
  });

  // Save the review
  await review.save();

  res.status(201).json({
    success: true,
    message: "Review posted successfully!",
    review,
  });
});


export const updateReview = catchAsyncErrors(async (req, res, next) => {
  const {
    rating,
    comments,
    title,
    workQuality,
    professionalism,
    communication,
    isAnonymous,
    attachments,
    workPlaceQuality,
    completedWork,
  } = req.body;

  const { reviewId } = req.params;
  const { _id: userId, role } = req.user;

  // Validate if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  // Ensure the logged-in user is the reviewer
  if (review.reviewerId.toString() !== userId.toString()) {
    return next(new ErrorHandler("You are not authorized to update this review.", 403));
  }

  // Validate if the job exists
  const job = await Job.findById(review.jobId);
  if (!job) {
    return next(new ErrorHandler("Job does not exist.", 404));
  }

  if (role === "JobSeeker") {
    // JobSeeker can only update reviews for jobs they applied to
    const application = await Application.findOne({
      workerId: userId,
      jobId: job._id,
    });

    if (!application) {
      return next(
        new ErrorHandler("You can only update reviews for jobs you have applied to.", 403)
      );
    }

    // Validate `workPlaceQuality` field for JobSeeker
    if (workPlaceQuality !== undefined) {
      review.workPlaceQuality = workPlaceQuality;
    }
  } else if (role === "Client") {
    // Client can only update reviews for JobSeekers who applied to their jobs
    const application = await Application.findOne({
      jobId: job._id,
      workerId: review.revieweeId,
    });

    if (!application) {
      return next(
        new ErrorHandler(
          "You can only update reviews for JobSeekers who applied to your jobs.",
          403
        )
      );
    }

    // Validate `workQuality` and `completedWork` fields for Client
    if (workQuality !== undefined) {
      review.workQuality = workQuality;
    }
    if (completedWork !== undefined) {
      review.completedWork = completedWork;
    }
  } else {
    return next(
      new ErrorHandler("Only JobSeekers and Clients can update reviews.", 403)
    );
  }

  // Update common fields
  if (rating !== undefined) review.rating = rating;
  if (comments !== undefined) review.comments = comments;
  if (title !== undefined) review.title = title;
  if (professionalism !== undefined) review.professionalism = professionalism;
  if (communication !== undefined) review.communication = communication;
  if (isAnonymous !== undefined) review.isAnonymous = isAnonymous;
  if (attachments !== undefined) review.attachments = attachments;

  // Save the updated review
  await review.save();

  res.status(200).json({
    success: true,
    message: "Review updated successfully!",
    review,
  });
});




export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Review.find().populate("reviewerId", "firstName lastName email role") // Populate reviewer details
    .populate("revieweeId", "firstName lastName email role") // Populate reviewee deta;

  res.status(200).json({
    success: true,
    reviews,
  });
});

export const getApprovedReviews = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId, role } = req.user;

  // Ensure the user is logged in
  if (!userId || !role) {
    return next(new ErrorHandler("You must be logged in to access reviews.", 401));
  }

  // Fetch reviews with adminApproval = "Approved" and flagged = false
  const reviews = await Review.find({
    adminApproval: "Approved",
    flagged: false,
  })
    .populate("reviewerId", "firstName lastName email role") // Populate reviewer details
    .populate("revieweeId", "firstName lastName email role") // Populate reviewee details
    .populate("jobId", "title description postedBy createdAt"); // Populate job details

  // Categorize reviews into Client Reviews and User Reviews
  const clientReviews = {}; // JobSeeker to Client
  const jobSeekerReviews = {}; // Client to JobSeeker

  reviews.forEach((review) => {
    const jobId = review.jobId._id.toString();
    const jobTitle = review.jobId.title;

    if (review.type === "JobSeekerToClient") {
      // Categorize under Client Reviews
      if (!clientReviews[jobId]) {
        clientReviews[jobId] = {
          jobTitle,
          reviews: [],
        };
      }
      clientReviews[jobId].reviews.push(review);
    } else if (review.type === "ClientToJobSeeker") {
      // Categorize under User Reviews
      if (!jobSeekerReviews[jobId]) {
        jobSeekerReviews[jobId] = {
          jobTitle,
          reviews: [],
        };
      }
      jobSeekerReviews[jobId].reviews.push(review);
    }
  });

  res.status(200).json({
    success: true,
    clientReviews,
    jobSeekerReviews,
  });
});

// Get reviews based on logged-in user
export const getUserReviews = catchAsyncErrors(async (req, res, next) => {
  const { _id: userId } = req.user;

  // Fetch reviews where the user is the reviewer
  const reviewsGiven = await Review.find({ reviewerId: userId }).populate("reviewerId", "firstName lastName email role") // Populate reviewer details
  .populate("revieweeId", "firstName lastName email role") // Populate reviewee details
  .populate("jobId", "title description postedBy"); // Populate job details;

  // Fetch reviews where the user is the reviewee
  const reviewsReceived = await Review.find({ revieweeId: userId }).populate("reviewerId", "firstName lastName email role") // Populate reviewer details
  .populate("revieweeId", "firstName lastName email role") // Populate reviewee details
  .populate("jobId", "title description postedBy"); // Populate job details;

  res.status(200).json({
    success: true,
    reviewsGiven,
    reviewsReceived,
  });
});

// Get reviews based on user ID from path parameter
export const getUserReviewsById = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  // Validate if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  // Fetch reviews where the user is the reviewer
  const reviewsGiven = await Review.find({ reviewerId: userId });

  // Fetch reviews where the user is the reviewee
  const reviewsReceived = await Review.find({ revieweeId: userId });

  res.status(200).json({
    success: true,
    reviewsGiven,
    reviewsReceived,
  });
});


// Get reviews based on job ID from path parameter
export const getReviewsByJobId = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.params;

  // Validate if the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  // Fetch reviews for the job
  const reviews = await Review.find({ jobId });

  // Categorize reviews based on user role
  const clientReviews = [];
  const jobSeekerReviews = [];

  for (const review of reviews) {
    const reviewer = await User.findById(review.reviewerId);
    if (reviewer.role === "Client") {
      clientReviews.push(review);
    } else if (reviewer.role === "JobSeeker") {
      jobSeekerReviews.push(review);
    }
  }

  res.status(200).json({
    success: true,
    clientReviews,
    jobSeekerReviews,
  });
});

// Get a review by ID
export const getReviewById = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;


  // Validate if the review exists
  const review = await Review.findById({_id : reviewId})
    .populate("reviewerId", "firstName lastName email role") // Populate reviewer details
    .populate("revieweeId", "firstName lastName email role") // Populate reviewee details
    .populate("jobId", "title description postedBy"); // Populate job details

  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  res.status(200).json({
    success: true,
    review,
  });
});


// Delete a review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;
  const { _id: userId } = req.user;

  // Validate if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  // Ensure the logged-in user is the reviewer
  if (review.reviewerId.toString() !== userId.toString()) {
    return next(new ErrorHandler("You are not authorized to delete this review.", 403));
  }

  // Delete the review
  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});

// Delete a review by admin
export const deleteReviewByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;

  // Check if admin is logged in
  if (!req.admin) {
    return next(new ErrorHandler("Admin not authorized to delete review.", 401));
  }

  // Validate if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  // Delete the review
  await review.deleteOne();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully!",
  });
});

// Update flagged status and reason of a review
export const updateReviewFlag = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;
  const { flagged, flaggedReason } = req.body;

  // Check if admin is logged in
  if (!req.admin) {
    return next(new ErrorHandler("Admin not authorized to update review flag.", 401));
  }

  // Validate if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  // Update the flagged status and reason
  review.flagged = flagged;
  if (flagged) {
    review.flaggedReason = flaggedReason;
  } else {
    review.flaggedReason = null;
  }

  // Save the updated review
  await review.save();

  res.status(200).json({
    success: true,
    message: "Review flagged status updated successfully!",
    review,
  });
});


// Update admin approval status of a review
export const updateAdminApproval = catchAsyncErrors(async (req, res, next) => {
  const { reviewId } = req.params;
  const { adminApproval } = req.body;

  // Check if admin is logged in
  if (!req.admin) {
    return next(new ErrorHandler("Admin not authorized to update review approval.", 401));
  }

  // Validate if the review exists
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found.", 404));
  }

  // Update the admin approval status
  review.adminApproval = adminApproval;

  // Save the updated review
  await review.save();

  res.status(200).json({
    success: true,
    message: "Review admin approval status updated successfully!",
    review,
  });
});


// Delete All Reviews
export const deleteAllReviews = catchAsyncErrors(async (req, res, next) => {
  // Ensure the request is made by an admin
  if (!req.admin) {
    return next(new ErrorHandler("Only admins can delete all reviews.", 403));
  }

  // Delete all reviews
  await Review.deleteMany();

  res.status(200).json({
    success: true,
    message: "All reviews have been deleted successfully.",
  });
});