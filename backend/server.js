import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; // ✅ import profile routes

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", profileRoutes); // now available at /api/users/profile

app.get("/", (req, res) => {
  res.send("🚀 WitTrade Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
