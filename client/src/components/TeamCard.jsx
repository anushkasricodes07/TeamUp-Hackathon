import { useState } from "react";
import { toast } from "react-toastify";

function TeamCard({
  _id,
  teamName,
  projectTitle,
  requiredRoles,
  currentMembers,
  teamSize,
  hackathonName,
  techStack,
  deadline,
  createdBy,
}) {
  const [showModal, setShowModal] = useState(false);

  const formattedDate = deadline
    ? new Date(deadline).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No deadline";

  // Get logged-in user's ID from JWT
  const token = localStorage.getItem("token");
  
  let loggedInUserId = null;
  console.log("TEAM:", teamName);
console.log("CREATED BY:", createdBy);
console.log("LOGGED USER ID:", loggedInUserId);

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      loggedInUserId = payload.userId;
    } catch (error) {
      console.log("Invalid token");
    }
  }

  // Compare logged-in user with team owner
  const ownerId =
    typeof createdBy === "object"
      ? createdBy?._id
      : createdBy;

  const isOwner =
    loggedInUserId &&
    ownerId &&
    String(loggedInUserId) === String(ownerId);

  console.log("Team:", teamName);
  console.log("Logged in user:", loggedInUserId);
  console.log("Team owner:", ownerId);
  console.log("Is owner:", isOwner);

  // DELETE TEAM
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${teamName}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/teams/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success(data.message);

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
const handleRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/teams/${_id}/requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log("JOIN REQUESTS:", data);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  // JOIN TEAM
  const handleJoinTeam = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/teams/${_id}/join`,
        {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success(data.message);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* TEAM CARD */}
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
          <strong>Roles:</strong>{" "}
          {requiredRoles?.join(", ")}
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

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">

          {/* JOIN BUTTON */}
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            onClick={() => setShowModal(true)}
          >
            Join Team
          </button>

          {/* DELETE BUTTON - ONLY OWNER */}
          {isOwner && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          )}
          {isOwner && (
  <button
    onClick={handleRequests}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  >
    Requests
  </button>
)}

        </div>
      </div>

      {/* JOIN TEAM MODAL */}
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

              {/* CANCEL */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              {/* CONFIRM JOIN */}
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={handleJoinTeam}
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