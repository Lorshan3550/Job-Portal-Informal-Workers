import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId, auto: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job',
    required: true
  }, // Reference to Job
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to User (Worker)
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: { type: Date, default: Date.now },
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide a cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  address: {
    type: String,
    required: [true, "Please enter your Address!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Client"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Worker"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
