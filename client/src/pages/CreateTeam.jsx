import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function CreateTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    projectTitle: "",
    description: "",
    techStack: "",
    requiredRoles: "",
    teamSize: "",
    hackathonName: "",
    deadline: "",
  });


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.teamName ||
      !formData.projectTitle ||
      !formData.description ||
      !formData.techStack ||
      !formData.requiredRoles ||
      !formData.teamSize ||
      !formData.hackathonName ||
      !formData.deadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  

    setLoading(true);
    try {
  const response = await fetch("http://localhost:5000/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((item) => item.trim()),

      requiredRoles: formData.requiredRoles
        .split(",")
        .map((item) => item.trim()),
    }),
  });

  const data = await response.json();   
 if (!response.ok) {
  throw new Error(data.error);
}
  alert(data.message);
  setFormData({
  teamName: "",
  projectTitle: "",
  description: "",
  techStack: "",
  requiredRoles: "",
  teamSize: "",
  hackathonName: "",
  deadline: "",
});

setLoading(false);

navigate("/");

  console.log(data);

} catch (error) {
  console.log(error);

  alert(error.message);
  }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Your Team
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={formData.teamName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (React, Node.js, MongoDB)"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="requiredRoles"
            placeholder="Required Roles (Frontend, Backend)"
            value={formData.requiredRoles}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="hackathonName"
            placeholder="Hackathon Name"
            value={formData.hackathonName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
>
  {loading ? "Creating Team..." : "Create Team"}
</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;