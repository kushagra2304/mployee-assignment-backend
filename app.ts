import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import { getJobById } from "./controllers/jobCon.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", jobRoutes);
app.use("/:id", getJobById);


export default app;