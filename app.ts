import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import { getJobById } from "./controllers/jobCon.js";


const app = express();
app.use(cors({
  origin: "https://mployee-assignment-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false,
}));
app.use(express.json());
app.use("/api", jobRoutes);
app.use("/:id", getJobById);


export default app;