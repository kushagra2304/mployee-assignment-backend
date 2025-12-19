import { Schema, model } from "mongoose";

const JobSchema = new Schema(
  {
    jobIdNumeric: { type: String },
    title: { type: String, required: true },
    company: { type: String },
    location: { type: String, required: true },
    job_link: { type: String },
    employment_type: { type: String },
    experience: { type: String },
    source: { type: String },
    country: { type: String },
    postedDateTime: { type: Date },
    companyImageUrl: { type: String },
    min_exp: { type: Number },
    max_exp: { type: Number }
  },
  { timestamps: true }
);

export const Job = model("Job", JobSchema, "assignment");