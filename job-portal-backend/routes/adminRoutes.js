import express from "express";
import { registerAdmin, loginAdmin, updateAdmin, logout } from "../controllers/adminController.js";
import { isAuthenticatedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/update", isAuthenticatedAdmin ,updateAdmin);
router.get("/logout", isAuthenticatedAdmin, logout);
// router.get("/getuser", isAuthenticated, getUser);

export default router;
