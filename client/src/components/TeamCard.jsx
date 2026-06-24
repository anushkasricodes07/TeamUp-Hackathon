function TeamCard({ teamName, role, members }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 w-64 shadow-lg hover:scale-105 transition">
      <h3 className="text-xl font-bold text-purple-600">
        {teamName}
      </h3>

      <p className="mt-3 text-gray-600">
        {role}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        👥 {members} Members
      </p>

      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700" onClick={() => alert("Team joining functionality will be available soon 🚀")}>
        Join Team
      </button>
    </div>
  );
}

export default TeamCard;