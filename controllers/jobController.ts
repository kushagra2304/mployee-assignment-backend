import type { Request, Response } from "express";
import { Job } from "../models/Job.js";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const location =
      typeof req.query.location === "string"
        ? req.query.location
        : undefined;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const matchStage = location
      ? { location: { $regex: location, $options: "i" } }
      : {};
    const jobs = await Job.aggregate([
  { $match: matchStage },
  {
    $group: {
      _id: {
        title: "$title",
        company: "$company",
        location: "$location",
      },
      doc: { $first: "$$ROOT" },
    },
  },
  { $replaceRoot: { newRoot: "$doc" } },
  { $sort: { postedDateTime: -1 } },
  { $skip: skip },
  { $limit: limit },
  {
    $project: {
      title: 1,
      company: 1,
      location: 1,
      postedDateTime: 1,
      job_link: 1,
    },
  },
]);
    const totalAgg = await Job.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            title: "$title",
            company: "$company",
            location: "$location",
          },
        },
      },
      { $count: "total" },
    ]);

    const totalCount = totalAgg[0]?.total || 0;

    res.json({
      page,
      limit,
      totalCount,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
