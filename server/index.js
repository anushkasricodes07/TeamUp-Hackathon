require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("TeamUp Backend Running");
});

// Temporary Data
let teams = [
  {
    teamName: "AI Innovators",
    role: "Need 3 Developers",
    members: 4,
  },
  {
    teamName: "Hack Masters",
    role: "Need MERN Developer",
    members: 5,
  },
  {
    teamName: "Design Ninjas",
    role: "Need UI Designer",
    members: 3,
  },
  {
    teamName: "Code Warriors",
    role: "Need Frontend Developer",
    members: 4,
  },
];

// GET All Teams
app.get("/teams", (req, res) => {
  res.json(teams);
});

// POST New Team
app.post("/teams", (req, res) => {
  teams.push(req.body);

  res.json({
    message: "Team Added Successfully",
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});