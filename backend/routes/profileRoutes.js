import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get profile
router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

// ✅ Update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, education, skills, portfolio } = req.body;

    // Find the user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields
    user.name = name || user.name;
    if (user.role === "learner") {
      user.learnerProfile.education = education || user.learnerProfile.education;
      user.learnerProfile.skills = skills || user.learnerProfile.skills;
      user.learnerProfile.portfolio = portfolio || user.learnerProfile.portfolio;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
