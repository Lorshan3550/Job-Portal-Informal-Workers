import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, auto: true },
  role: { type: 'String', enum: ['Admin', 'SuperAdmin'], default: 'Admin', required: false },
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  password: {
    type: String, required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    select: false,
  }
});

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};



export const Admin = mongoose.model('Admin', adminSchema);
