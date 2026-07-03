require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Team = require("./models/Team");

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

// GET All Teams
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    console.log(teams); // 👈 Ye bhi add karo
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});
// POST New Team
app.post("/teams", async (req, res) => {
  await Team.create(req.body);

  res.json({
    message: "Team Added Successfully",
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});