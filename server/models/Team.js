const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Team", teamSchema);