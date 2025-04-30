import express from "express";
import { registerAdmin, loginAdmin, updateAdmin, logout, updateAdminApproval } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { hardDeleteUser, resetUserPasswordByAdmin, updateUserEmailByAdmin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.put("/update", isAuthenticated ,updateAdmin);
router.put("/update-email/:userId", isAuthenticated, updateUserEmailByAdmin);
router.put("/reset-password/:userId", isAuthenticated, resetUserPasswordByAdmin);

router.delete("/hard-delete-user/:userId", isAuthenticated, hardDeleteUser);
router.put("/update-approval/:id", isAuthenticated, updateAdminApproval);


router.get("/logout", isAuthenticated, logout);
// router.get("/getuser", isAuthenticated, getUser);

export default router;
