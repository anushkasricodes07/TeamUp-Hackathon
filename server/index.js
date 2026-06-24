const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("TeamUp Backend Running ");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
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
    }
  ]);
});