import express from "express";
import { registerAdmin, loginAdmin, updateAdmin, logout, updateAdminApproval, getDashboardStats, updateAdminApprovalForJob, updateReviewFlag, deleteReviewByAdmin } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { hardDeleteUser, resetUserPasswordByAdmin, updateUserEmailByAdmin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.put("/update", isAuthenticated ,updateAdmin);
router.put("/update-email/:userId", isAuthenticated, updateUserEmailByAdmin);
router.put("/reset-password/:userId", isAuthenticated, resetUserPasswordByAdmin);
router.put("/update-approval/:id", isAuthenticated, updateAdminApprovalForJob);
router.put("/flag/:reviewId", isAuthenticated, updateReviewFlag);
router.put("/review/adminApproval/:reviewId", isAuthenticated, updateAdminApproval)

router.get("/logout", isAuthenticated, logout);
router.get("/dashboard-stats", isAuthenticated, getDashboardStats);

router.delete("/delete-review/:reviewId", isAuthenticated, deleteReviewByAdmin);
router.delete("/hard-delete-user/:userId", isAuthenticated, hardDeleteUser);





export default router;
