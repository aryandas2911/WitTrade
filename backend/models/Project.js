import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    learnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    learnerName: { type: String, required: true },
    learnerEmail: { type: String, required: true },
    appliedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [{ type: String, required: true }],

    // Link project to startup
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: { type: String, required: true }, // auto-filled

    // List of applicants
    applicants: [applicantSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
