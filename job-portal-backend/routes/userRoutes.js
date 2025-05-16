import express from "express";
import { login, register, logout, getUser, update, updatePassword, updateEmail, deleteAccount, allUsers, getUsersCategorizedByRole, resetUserPasswordByAdmin, hardDeleteUser, updateUserEmailByAdmin, filterJobSeekersBySkillsAndLocation, getJobSeekersByJobSkills, deleteAllUsers } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/update/:userId", isAuthenticated, update);
router.put("/updatepassword", isAuthenticated, updatePassword);
router.put("/update-email", isAuthenticated, updateEmail);
router.put("/admin/reset-password/:userId", isAuthenticated, resetUserPasswordByAdmin);
router.put("/admin/update-email/:userId", isAuthenticated, updateUserEmailByAdmin);

router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/get-categorized-users", isAuthenticated, getUsersCategorizedByRole);
router.get("/getalluser", allUsers);
router.get("/client/filter-jobseekers", isAuthenticated, filterJobSeekersBySkillsAndLocation);
router.get("/jobseekers-by-job/:jobId", isAuthenticated, getJobSeekersByJobSkills);


router.delete("/admin/hard-delete-user/:userId", isAuthenticated, hardDeleteUser);
router.delete("/deleteuser", isAuthenticated, deleteAccount);
router.delete("/admin/delete-all-users", isAuthenticated, deleteAllUsers);

export default router;
