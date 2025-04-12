import express from "express";
import upload from "../middlewares/multerConfig.js"; // Your multer configuration
import { uploadResume, uploadMultiplePhotos } from "../controllers/fileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadResume);
router.post('/uploads', upload.array("files", 3), uploadMultiplePhotos)

export default router;
