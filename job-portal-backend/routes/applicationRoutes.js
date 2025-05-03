import express from "express";
import {
  clientGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
  updateApplication,
  updateApplicationStatus,
  getAllApplicationsCategorizedByJobForAdmin,
  jobseekerGetApprovedApplications,
  getJobSeekersByJobId
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/post", isAuthenticated,  postApplication);

router.put("/update/:applicationId", isAuthenticated, updateApplication);
router.put("/update-status/:applicationId", isAuthenticated, updateApplicationStatus);

router.get("/client/getall", isAuthenticated, clientGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.get("/admin/get-categorized-applications", isAuthenticated, getAllApplicationsCategorizedByJobForAdmin);
router.get("/jobseeker/get-approved-applications", isAuthenticated, jobseekerGetApprovedApplications);
router.get("/job/:jobId", isAuthenticated, getJobSeekersByJobId);


router.delete("/delete/:applicationId", isAuthenticated, jobseekerDeleteApplication);


export default router;
