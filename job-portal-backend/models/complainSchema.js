import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  complainId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // Reference to the user making the complaint
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false,
  }, // Reference to the admin handling the complaint (optional)
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: false,
  }, // Reference to the review being complained about (optional)
  subject: {
    type: String,
    required: true,
    maxLength: 100,
  }, // Subject of the complaint
  description: {
    type: String,
    required: true,
    maxLength: 1000,
  }, // Detailed description of the complaint
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Pending',
  }, // Status of the complaint
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
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Auto-generated timestamp for when the complaint was created
  updatedAt: {
    type: Date,
  }, // Timestamp for when the complaint was last updated
});

// Middleware to update the updatedAt field before saving
complainSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Complain = mongoose.model("Complain", complainSchema);