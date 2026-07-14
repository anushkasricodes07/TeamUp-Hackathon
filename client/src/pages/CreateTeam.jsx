import { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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

    alert("Team created successfully!");

    console.log("Form Submitted Successfully");
    console.log(formData);
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
          >
            Create Team
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateTeam;