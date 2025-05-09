import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
  deleteAllJobs,
  getApprovedJobs,
  updateAdminApproval,
  getNonApprovedJobs,
  getAllJobsWithRejectionLogic
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.get("/getallapprovedjobs", getApprovedJobs);

router.get("/getallnonapprovedjobs", getNonApprovedJobs);
router.get("/getallwithrejectionlogic", getAllJobsWithRejectionLogic);


router.post("/post", isAuthenticated, postJob);

router.get("/getmyjobs", isAuthenticated, getMyJobs);

router.put("/update/:id", isAuthenticated, updateJob);
router.put("/update-approval/:id", isAuthenticated, updateAdminApproval);

router.delete("/delete/:id", isAuthenticated, deleteJob);
router.delete("/deleteall", deleteAllJobs); // Ensure workers cannot access this resource
router.get("/:id", getSingleJob);

export default router;

