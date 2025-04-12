import express from "express";
// import {
//   createReview,
//   getReviews,
//   updateReview,
//   deleteReview,
// } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// // Create a new review (Authenticated)
// router.post("/create", isAuthenticated, createReview);

// // Get all reviews for a specific user (Authenticated)
// router.get("/user/:userId", isAuthenticated, getReviews);

// // Update a specific review (Authenticated)
// router.put("/update/:reviewId", isAuthenticated, updateReview);

// // Delete a specific review (Authenticated)
// router.delete("/delete/:reviewId", isAuthenticated, deleteReview);

export default router;
