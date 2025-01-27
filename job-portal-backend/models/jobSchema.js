import mongoose from "mongoose";
import { User } from "./userSchema.js";
import { sriLankaProvinces, jobCategories, workTypes, educationLevels, jobExperience, provinceOnly } from "../utils/commonVariables.js";
import ErrorHandler from "../middlewares/error.js";
import validator from "validator";

const jobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
    enum: jobCategories.map((category) => category.name), // Valid categories from jobCategories
  },
  requiredSkills: {
    type: [String],
    required: [true, "Please provide required skills."],
    validate: {
      validator: function (skills) {
        const selectedCategory = jobCategories.find(
          (category) => category.name === this.category
        );
        return selectedCategory
          ? skills.every((skill) => selectedCategory.skills.includes(skill))
          : false;
      },
      message: "One or more skills are not valid for the selected category.",
    },
  },
  duration: {
    days: {
      type: Number,
      min: 0,
      default: 0,
    },
    months: {
      type: Number,
      min: 0,
      default: 0,
    },
    years: {
      type: Number,
      min: 0,
      default: 0,
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
      validator: function (value) {
        // Check if the district belongs to the selected province
        const province = sriLankaProvinces.find(
          (p) => p.province === this.province
        );
        return province && province.districts.includes(value.toLowerCase());
      },
      message: (props) =>
        `${props.value} is not a valid district for the selected province.`,
    },
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  address: {
    type: String,
    required: true,
  },
  fixedSalary: {
    type: Number,
  },
  salaryFrom: {
    type: Number,
  },
  salaryTo: {
    type: Number,
  },
  photos: [
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
  ],
  experience: {
    type: String,
    enum: jobExperience,
    required: [true, "Please select your experience level."],
  },
  workType: {
    type: String,
    enum: workTypes,
    required: [true, "Please specify the work type."],
  },
  applyDeadline: {
    type: Date,
    required: [true, "Please provide an application deadline."],
  },
  education: {
    type: String,
    enum: educationLevels,
  },
  noOfPositions: {
    type: Number,
    min: 1,
    required: [true, "Please specify the number of positions."],
  },
  isCVRequired: {
    type: Boolean,
    default: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answerType:{
        type: String,
        enum : ['Yes/No', 'Number', 'Text']
      }
    }
  ],
});

// Middleware to validate duration
jobSchema.pre("save", function (next) {
  const { days, months, years } = this.duration;

  if (days === 0 && months === 0 && years === 0) {
    return next(new ErrorHandler("Duration must have at least one value greater than 0.", 400));
  }

  next();
});

// Pre-save validation: Ensure jobs are not posted by users with the 'JobSeeker' role
jobSchema.pre("save", async function (next) {
  const user = await User.findById(this.postedBy);

  if (!user) {
    return next(new ErrorHandler("User not found! Cannot post job.", 400));

  }

  if (user.role !== "Client") {
    return next(new ErrorHandler("Only users with the 'Client' role can post jobs.", 400));
  }

  next();
});

export const Job = mongoose.model("Job", jobSchema);
