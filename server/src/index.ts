import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
connectDB();

const allowedOrigins = [
  "https://cravingram.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello CRAVINGRAM");
});


import authRoutes from "./routes/auth.routes";
import foodRoutes from "./routes/food.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/food", foodRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
