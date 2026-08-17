const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },

    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    techStack: {
      type: [String],
      required: true,
    },

    requiredRoles: {
      type: [String],
      required: true,
    },

    teamSize: {
      type: Number,
      required: true,
      min: 1,
    },

    currentMembers: {
      type: Number,
      default: 1,
    },

    hackathonName: {
      type: String,
      trim: true,
      default: "",
    },

    deadline: {
      type: Date,
    },

    // User who created this team
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);