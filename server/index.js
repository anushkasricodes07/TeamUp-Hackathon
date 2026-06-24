const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TeamUp Backend Running");
});

app.get("/teams", (req, res) => {
  res.json([
    {
      teamName: "AI Innovators",
      role: "Need 3 Developers",
      members: 4
    },
    {
      teamName: "Hack Masters",
      role: "Need MERN Developer",
      members: 5
    },
    {
  teamName: "Design Ninjas",
  role: "Need UI Designer",
  members: 3
},
{
  teamName: "Code Warriors",
  role: "Need Frontend Developer",
  members: 4
}
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});