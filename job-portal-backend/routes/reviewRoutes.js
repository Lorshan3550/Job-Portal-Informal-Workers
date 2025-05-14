import express from "express";
import { postReview, getAllReviews, getUserReviews , getUserReviewsById, getReviewsByJobId, updateReview, deleteReview, updateReviewFlag, getReviewById, getApprovedReviews, updateAdminApproval, deleteReviewByAdmin} from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Create a new review (Authenticated)
router.post("/create", isAuthenticated, postReview);

// Get all reviews
router.get("/reviews", getAllReviews);

// Get reviews based on logged-in user 
router.get("/review", isAuthenticated, getUserReviews);

// Get reviews based on user ID from path parameter
router.get("/review/user/:userId", isAuthenticated, getUserReviewsById);

// Get reviews based on job ID from path parameter
router.get("/reviews/:jobId", isAuthenticated, getReviewsByJobId);

// Get reviews based on review ID from path parameter
router.get("/review/:reviewId", isAuthenticated, getReviewById);

// Get all approved and non-flagged reviews (Authenticated)
router.get("/approved-and-notflagged", isAuthenticated, getApprovedReviews);

// Update a review (Authenticated)
router.put("/review/:reviewId", isAuthenticated, updateReview);

// Delete a review (Authenticated)
router.delete("/review/:reviewId", isAuthenticated, deleteReview);

router.delete("/delete-review/:reviewId", isAuthenticated, deleteReviewByAdmin);


// Update flagged status and reason of a review (Authenticated)
router.put("/flag/:reviewId", isAuthenticated, updateReviewFlag);

router.put("/review/adminApproval/:reviewId", isAuthenticated, updateAdminApproval)


// // Get all reviews for a specific user (Authenticated)
// router.get("/user/:userId", isAuthenticated, getReviews);

// // Update a specific review (Authenticated)
// router.put("/update/:reviewId", isAuthenticated, updateReview);

// // Delete a specific review (Authenticated)
// router.delete("/delete/:reviewId", isAuthenticated, deleteReview);

export default router;
