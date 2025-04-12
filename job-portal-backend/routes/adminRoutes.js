import express from "express";
import { registerAdmin, loginAdmin, updateAdmin, logout } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/update", isAuthenticated ,updateAdmin);
router.get("/logout", isAuthenticated, logout);
// router.get("/getuser", isAuthenticated, getUser);

export default router;
