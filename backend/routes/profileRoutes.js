
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected route: only accessible with valid JWT
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile",
    user: req.user, // comes from protect middleware
  });
});

export default router;
