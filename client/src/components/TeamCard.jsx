import { useState } from "react";

function TeamCard({
  teamName,
  projectTitle,
  requiredRoles,
  currentMembers,
  teamSize,
  hackathonName,
  techStack,
  deadline,
}) {
  const [showModal, setShowModal] = useState(false);

  const formattedDate = deadline
    ? new Date(deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No deadline";

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
        <h3 className="text-xl font-bold text-purple-600">
          {teamName}
        </h3>

        <p className="mt-2 font-semibold text-gray-800">
          {projectTitle}
        </p>

        <p className="mt-2 text-gray-600">
          💻 {techStack?.join(" • ")}
        </p>

        <p className="mt-2 text-gray-600">
          <strong>Roles:</strong> {requiredRoles?.join(", ")}
        </p>

        <p className="mt-2 text-gray-600">
          👥 {currentMembers}/{teamSize} Members
        </p>

        <p className="mt-2 text-sm text-gray-500">
          🏆 {hackathonName}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          🕒 Deadline: {formattedDate}
        </p>

        <button
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          onClick={() => setShowModal(true)}
        >
          Join Team
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-bold">
              Join Team?
            </h2>

            <p className="mt-3">
              Are you sure you want to join{" "}
              <strong>{teamName}</strong>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => {
                  alert("Join request sent successfully! 🎉");
                  setShowModal(false);
                }}
              >
                Join Team
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamCard;