import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import router from "./userRoutes.js";
import { createNotification, deleteAllNotifications, getUserNotifications } from "../controllers/notificationController.js";

router.post("/create-notification", isAuthenticated ,createNotification);
router.get("/notification-loggedIn-user", isAuthenticated, getUserNotifications);
router.delete("/admin/delete-all-notifications", isAuthenticated, deleteAllNotifications);


export default router;
