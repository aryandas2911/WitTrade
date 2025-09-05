import Project from "../models/Project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;

    const project = await Project.create({
      title,
      description,
      requiredSkills,
      startup: req.user._id, // from token (protect middleware)
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects (for learners)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("startup", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get projects of a specific startup
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ startup: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
