import mongoose from "mongoose";
import ErrorHandler from "../middlewares/error.js";

const reviewSchema = new mongoose.Schema({
  reviewId: { 
    type: mongoose.Schema.Types.ObjectId, 
    auto: true 
  },

  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  }, // Reference to Job

  reviewerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to User (Reviewer) - Client/JobSeeker

  revieweeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to User (Reviewee) - JobSeeker/Employer

  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  }, // Rating between 1 and 5

  completedWork: { 
    type: Boolean, 
    required: false 
  }, // Indicates if the work was completed - JobSeeker to Client

  comments: { 
    type: String, 
    maxLength: 500 
  }, // Optional comments with length validation

  title: {
    type: String,
    required: false,
    maxLength: 100,
  }, // Optional short title for the review

  workQuality: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  }, // Specific rating for the quality of work (optional) JobSeeker to Client

  workPlaceQuality: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  }, // Specific rating for the quality of work (optional) Client to JobSeeker

  professionalism: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  }, // Specific rating for professionalism (optional)

  communication: {
    type: Number,
    min: 1,
    max: 5,
    required: false,
  }, // Specific rating for communication (optional)

  flagged: {
    type: Boolean,
    default: false,
  }, // Indicates if the review was flagged for inappropriate content

  flaggedReason: {
    type: String,
    required: function () {
      return this.flagged;
    },
  }, // Optional reason if the review is flagged

  attachments:[
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        validate: {
          validator: function (value) {
            return value.startsWith("http");
          },
          message: (props) => `${props.value} is not a valid HTTP URL.`,
        },
      },
      secure_url: {
        type: String,
        validate: {
          validator: function (value) {
            return value.startsWith("https");
          },
          message: (props) => `${props.value} is not a valid HTTPS URL.`,
        },
      },
    },
  ], // Array of URLs to uploaded files or proof attachments

  isAnonymous: {
    type: Boolean,
    default: false,
  }, // Indicates if the review is anonymous

  adminApproval: {
    type: String,
    enum: ['Pending', 'Rejected', 'Approved'],
    default: 'Pending',
  }, // Status of admin approval for the review

  type: {
    type: String,
    enum: ['ClientToJobSeeker', 'JobSeekerToClient'], // Add new types as needed
    required: false,
  }, // Defines whether this is an employer reviewing a job seeker or vice versa

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Auto-generated timestamp

  updatedAt: {
    type: Date,
  }, // Timestamp for when the review was last updated
});


// Middleware to determine review type
reviewSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  const User = mongoose.model("User");

  // Fetch roles of reviewer and reviewee
  const reviewer = await User.findById(this.reviewerId).select("role");
  const reviewee = await User.findById(this.revieweeId).select("role");

  if (!reviewer || !reviewee) {
    return next(new ErrorHandler("Invalid reviewer or reviewee ID.", 404));
  }

  // Determine the type of review based on roles
  if (reviewer.role === "Client" && reviewee.role === "JobSeeker") {
    this.type = "ClientToJobSeeker";
  } else if (reviewer.role === "JobSeeker" && reviewee.role === "Client") {
    this.type = "JobSeekerToClient";
  } else {
    return next(new ErrorHandler("Invalid roles for reviewer and reviewee.", 404));
  }
  next();
});

export const Review = mongoose.model("Review", reviewSchema);
