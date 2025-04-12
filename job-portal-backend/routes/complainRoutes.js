import express from "express";
import { makeComplain, updateComplainStatus } from "../controllers/complainController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Make a complaint (Authenticated)
router.post("/complain", isAuthenticated, makeComplain);

// Update complaint status (Authenticated)
router.put("/complain/:complainId", isAuthenticated, updateComplainStatus);

export default router;