import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/teams/my-teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("My Teams:", data);

        if (Array.isArray(data)) setTeams(data);
        else if (data.teams) setTeams(data.teams);
        else setTeams([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyTeams();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your teams...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Teams</h1>

      {teams.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg mb-4">You haven't created any team yet.</p>
          <Link to="/create-team" className="bg-blue-600 text-white px-6 py-2 rounded">
            Create Your First Team
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team._id} className="border rounded-lg p-5 shadow-sm bg-white">
              <h2 className="text-xl font-semibold">{team.name}</h2>
              <p className="text-gray-600 mt-2 text-sm">{team.description}</p>
              <p className="mt-2 text-sm"><span className="font-medium">Category:</span> {team.category}</p>
              <p className="text-sm"><span className="font-medium">Members:</span> {team.members?.length || 0} / {team.maxMembers}</p>
              <Link to={`/teams/${team._id}`}>
                <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTeams;
