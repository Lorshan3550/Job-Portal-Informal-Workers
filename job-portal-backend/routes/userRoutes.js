import express from "express";
import { login, register, logout, getUser, update, updatePassword, updateEmail, deleteAccount, allUsers } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/update/:userId", isAuthenticated, update);
router.put("/updatepassword", isAuthenticated, updatePassword);
router.put("/update-email", isAuthenticated, updateEmail);

router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/getalluser", allUsers);


router.delete("/deleteuser", isAuthenticated, deleteAccount);

export default router;
