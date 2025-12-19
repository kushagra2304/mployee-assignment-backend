import type { Request, Response } from "express";
import { Job } from "../models/Job.js";
import mongoose from "mongoose";

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job by id:", error);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};
