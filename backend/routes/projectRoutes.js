import express from "express";
import Project from "../models/Project.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create new project
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;

    const project = new Project({
      title,
      description,
      requiredSkills,
      startupId: req.user._id, // comes from JWT
      companyName: req.user.startupProfile.companyName, // auto-added
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all projects of the logged-in startup
router.get("/mine", protect, async (req, res) => {
  try {
    const projects = await Project.find({ startupId: req.user._id });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get projects matching learner's skills
router.get("/match", protect, async (req, res) => {
  try {
    if (req.user.role !== "learner") {
      return res
        .status(403)
        .json({ message: "Only learners can view matching projects" });
    }

    const learnerSkills = req.user.learnerProfile?.skills || [];
    if (!learnerSkills.length) {
      return res.json([]);
    }

    // Find projects where requiredSkills overlaps with learner's skills
    const projects = await Project.find({
      requiredSkills: { $in: learnerSkills },
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Apply to a project
router.post("/:id/apply", protect, async (req, res) => {
  try {
    if (req.user.role !== "learner") {
      return res.status(403).json({ message: "Only learners can apply" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // prevent duplicate applications
    const alreadyApplied = project.applicants.find(
      (a) => a.learnerId.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    project.applicants.push({
      learnerId: req.user._id,
      learnerName: req.user.name,
      learnerEmail: req.user.email,
    });

    await project.save();
    res.json({ message: "Applied successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get projects learner applied to
router.get("/applied/mine", protect, async (req, res) => {
  try {
    if (req.user.role !== "learner") {
      return res
        .status(403)
        .json({ message: "Only learners can view applied projects" });
    }

    const projects = await Project.find({
      "applicants.learnerId": req.user._id,
    });

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Withdraw from a project
router.post("/:id/withdraw", protect, async (req, res) => {
  try {
    if (req.user.role !== "learner") {
      return res.status(403).json({ message: "Only learners can withdraw" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // remove learner from applicants
    project.applicants = project.applicants.filter(
      (a) => a.learnerId.toString() !== req.user._id.toString()
    );

    await project.save();
    res.json({ message: "Withdrawn successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
