import { Router } from "express";
import { getJobs } from "../controllers/jobController.js";
import { getJobById } from "../controllers/jobCon.js";
const router = Router();
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
export default router;