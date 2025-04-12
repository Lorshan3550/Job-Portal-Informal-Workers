import express from "express";
import { sendPasswordResetCode, verifyResetCode, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-reset-code", sendPasswordResetCode);
router.post("/verify-reset-code", verifyResetCode);
router.post("/change-password", changePassword);

export default router;
