import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["learner", "startup"],
      required: true,
    },

    learnerProfile: {
      skills: { type: [String], default: [] },
      education: { type: String },
      portfolio: { type: String },
    },

    startupProfile: {
      companyName: { type: String },
      founderName: { type: String },
      industry: { type: String },
      companySize: { type: String, enum: ["1-10", "11-50", "51-200", "200+"] },
      website: { type: String },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
