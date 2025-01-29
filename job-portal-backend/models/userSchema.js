import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto"

import { provinceOnly, sriLankaProvinces } from "../utils/commonVariables.js";

const userSchema = new mongoose.Schema({
  userId : { 
    type: mongoose.Schema.Types.ObjectId, 
    auto: true },
  firstName: {
    type: String,
    required: [true, "Please enter your First Name!"],
  },
  middleName: {
    type: String,
    required: false,
    default : "",
  },
  lastName: {
    type : String,
    required: [true, "Please enter your Last Name!"],
  },
  personalSummary : {
    type : String,
    required : false,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
    unique : true,
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  province: { 
    type: String, 
    enum: provinceOnly, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'], 
    required: true 
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
  location : {
    type : String,
    required : true,
  },
  skills: { 
    type: [String], 
    default: [] 
  }, // Only applicable for Workers
  achievements: { 
    type: [String], 
    default: [] 
  }, // Only applicable for Workers
  dateOfBirth: {
    type: String,
    required: [true, "Please provide your Date of Birth!"],
    validate: {
      validator: function(value) {
        return /^\d{4}-\d{2}-\d{2}$/.test(value); // Matches yyyy-mm-dd format
      },
      message: props => `${props.value} is not a valid date. Use the format yyyy-mm-dd.`,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Client", "JobSeeker"],
  },
  isDeleted : {
    type : Boolean ,
    default : false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String, // Store hashed version of reset code
    select: false, // Never expose it in API responses
  },
  passwordResetExpires: {
    type: Date, // Expiration time for reset code
  },
});

// Virtual field to calculate age
userSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if birth month hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Method to generate and store password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetCode = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6-char alphanumeric code
  this.passwordResetToken = bcrypt.hashSync(resetCode, 10); // Hash the code for security
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expire in 10 minutes
  return resetCode; // Return the plain text code to send via email
};



export const User = mongoose.model("User", userSchema);
