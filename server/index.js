require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Team = require("./models/Team");
const JoinRequest = require("./models/JoinRequest");
const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Home Route
app.get("/", (req, res) => {
  res.send("TeamUp Backend Running");
});

// GET All Teams
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// POST New Team
app.post("/teams", async (req, res) => {
  try {
    console.log(req.body);

    await Team.create(req.body);

    res.json({
      message: "Team Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// POST Join Team Request
app.post("/teams/:teamId/join", async (req, res) => {
  try {
    const { teamId } = req.params;

    const existingRequest = await JoinRequest.findOne({
      teamId: teamId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        error: "Join request already sent!",
      });
    }

    const joinRequest = await JoinRequest.create({
      teamId: teamId,
    });

    res.status(201).json({
      message: "Join request sent successfully!",
      joinRequest,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to send join request",
    });
  }
});

// POST Signup
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Signup failed",
    });
  }
});

// POST Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debugging logs
    console.log("LOGIN EMAIL:", email);
  
    const user = await User.findOne({ email });

    console.log("USER FOUND:", user ? "YES" : "NO");

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("✅ Login successful");

    res.json({
      message: "Login successful!",
      token,
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      error: "Login failed",
    });
  }
});

// Protected Test Route
app.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to get user",
    });
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});