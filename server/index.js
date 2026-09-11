require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Team = require("./models/Team");
const JoinRequest = require("./models/joinRequest");
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
app.post("/teams", authMiddleware, async (req, res) => {
  try {
    console.log("Team data:", req.body);
    console.log("Created by:", req.userId);

    const team = await Team.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(201).json({
      message: "Team Added Successfully",
      team,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});
app.delete("/teams/:teamId", authMiddleware, async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);

    if (!team) {
      return res.status(404).json({
        error: "Team not found",
      });
    }

    // Check if logged-in user is the owner
    if (team.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        error: "You are not allowed to delete this team",
      });
    }

    await Team.findByIdAndDelete(req.params.teamId);

    res.json({
      message: "Team deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to delete team",
    });
  }
});

// POST Join Team Request
  app.post("/teams/:teamId/join", authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);

if (!team) {
  return res.status(404).json({
    error: "Team not found",
  });
}

if (team.createdBy.toString() === req.userId) {
  return res.status(400).json({
    error: "You cannot join your own team",
  });
}

    const existingRequest = await JoinRequest.findOne({
      teamId: teamId,
      userId: req.userId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        error: "Join request already sent!",
      });
    }

    const joinRequest = await JoinRequest.create({
      teamId: teamId,
      userId: req.userId,
      status: "pending",
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
// GET Join Requests for Team Owner
app.get("/teams/:teamId/requests", authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        error: "Team not found",
      });
    }

    // Only team owner can view requests
    if (team.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        error: "You are not allowed to view these requests",
      });
    }

    const requests = await JoinRequest.find({
      teamId: teamId,
      status: "pending",
    }).populate("userId", "name email");

    res.json(requests);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to get join requests",
    });
  }
  });
  // Accept Join Request
app.patch("/requests/:requestId/accept", authMiddleware, async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await JoinRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        error: "Join request not found",
      });
    }

    const team = await Team.findById(request.teamId);

    if (!team) {
      return res.status(404).json({
        error: "Team not found",
      });
    }

    if (team.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        error: "You are not allowed to accept this request",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        error: "Request already processed",
      });
    }

    if (team.currentMembers >= team.teamSize) {
      return res.status(400).json({
        error: "Team is already full",
      });
    }

    request.status = "accepted";
    await request.save();

    team.currentMembers += 1;
    await team.save();

    res.json({
      message: "Join request accepted!",
      request,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to accept join request",
    });
  }
});
// Reject Join Request
app.patch("/requests/:requestId/reject", authMiddleware, async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await JoinRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({
        error: "Join request not found",
      });
    }

    const team = await Team.findById(request.teamId);

    if (!team) {
      return res.status(404).json({
        error: "Team not found",
      });
    }

    // Only team owner can reject
    if (team.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        error: "You are not allowed to reject this request",
      });
    }

    // Request must be pending
    if (request.status !== "pending") {
      return res.status(400).json({
        error: "Request already processed",
      });
    }

    request.status = "rejected";
    await request.save();

    res.json({
      message: "Join request rejected!",
      request,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to reject join request",
    });
  }
});
  // GET Teams Created By Logged-in User
app.get("/teams/my-teams", authMiddleware, async (req, res) => {
  try {
    console.log("MY TEAMS USER ID:", req.userId);

    const teams = await Team.find({
      createdBy: req.userId,
    });

    console.log("MY TEAMS:", teams);

    res.json(teams);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to get your teams",
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