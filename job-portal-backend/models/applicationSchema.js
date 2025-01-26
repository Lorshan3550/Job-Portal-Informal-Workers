import mongoose from "mongoose";
import validator from "validator";
import { Job } from "./jobSchema.js";
import { sriLankaProvinces, educationLevels, gender, jobExperience, profiencyLevels, provinceOnly, jobPostStatus } from "../utils/commonVariables.js";
import ErrorHandler from "../middlewares/error.js";

const applicationSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  }, // Reference to Job
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to User (JobSeeker)
  status: {
    type: String,
    enum: jobPostStatus,
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  // Personal Information Fields
  firstName: {
    type: String,
    required: [true, "Please enter your First Name!"],
  },
  middleName: {
    type: String,
    required: false,
    default: "",
  },
  lastName: {
    type: String,
    required: [true, "Please enter your Last Name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  retypePhoneNumber: {
    type: Number,
    required: [true, "Please retype your Phone Number!"],
    validate: {
      validator: function (value) {
        return value === this.phoneNumber;
      },
      message: "Phone numbers do not match!",
    },
  },
  province: {
    type: String,
    enum: provinceOnly,
    required: true,
  },
  district: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        // Check if the district belongs to the selected province
        const province = sriLankaProvinces.find(p => p.province === this.province);
        return province && province.districts.includes(value.toLowerCase());
      },
      message: props => `${props.value} is not a valid district for the selected province.`
    }
  },
  city: {
    type: String,
    required: [true, "Please enter your city."],
  },
  location: {
    type: String,
    required: [true, "Please enter your location."],
  },
  educationQualifications: {
    type: String,
    enum: educationLevels,
    required: [true, "Please select your education qualifications."],
  },
  gender: {
    type: String,
    enum: gender,
    required: [true, "Please select your gender."],
  },
  experience: {
    type: String,
    enum: jobExperience,
    required: [true, "Please select your experience level."],
  },
  languageProficiency: {
    sinhala: {
      type: String,
      enum: profiencyLevels,
      required: true,
    },
    tamil: {
      type: String,
      enum: profiencyLevels,
      required: true,
    },
    english: {
      type: String,
      enum: profiencyLevels,
      required: true,
    },
  },
  whyApplyJob: {
    type: String,
    required: [true, "Please explain why you are applying for this job."],
  },
  resume: {
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
          return value.startsWith("http");
        },
        message: (props) => `${props.value} is not a valid HTTP URL.`,
      },
    },
  },
  // Dynamic Questions and Answers
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

// Custom validation to enforce conditional requirement for resume
applicationSchema.pre("validate", async function (next) {
  const job = await Job.findById(this.jobId);

  if (!job) {
    return next(new ErrorHandler("Job not found!", 400));
  }

  if (job.isCVRequired) {
    // If CV is required, ensure resume fields are provided
    if (!this.resume || !this.resume.public_id || !this.resume.url || this.resume.secure_url) {
      return next(
        new ErrorHandler(
          "Resume is required for this job as the employer has marked CV as mandatory.", 400
        )
      );
    }
  } else {
    // If CV is not required, clear resume fields
    this.resume = undefined;
  }



  next();
});

export const Application = mongoose.model("Application", applicationSchema);
