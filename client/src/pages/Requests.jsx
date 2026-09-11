import { useEffect, useState } from "react";

function Requests() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Get owner's teams
  useEffect(() => {
    const fetchMyTeams = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/teams/my-teams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTeams(data);
          console.log("MY TEAMS FROM BACKEND:", data);
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTeams();
  }, [token]);

  // Get requests for selected team
  const fetchRequests = async (teamId) => {
    try {
      setSelectedTeam(teamId);

      const response = await fetch(
        `http://localhost:5000/teams/${teamId}/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(data);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAccept = async (requestId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/requests/${requestId}/accept`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    alert(data.message);

    // Refresh requests
    fetchRequests(selectedTeam);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
const handleReject = async (requestId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/requests/${requestId}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    alert(data.message);

    // Refresh requests
    fetchRequests(selectedTeam);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-purple-600 mb-8">
          Join Requests
        </h1>

        {teams.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">
              You don't have any teams. Only team owners can view join
              requests.
            </p>
          </div>
        ) : (
          <>
            {/* My Teams */}
            <div className="grid md:grid-cols-2 gap-6">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-xl font-bold">
                    {team.teamName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {team.projectTitle}
                  </p>

                  <button
                    onClick={() => fetchRequests(team._id)}
                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    View Requests
                  </button>
                </div>
              ))}
            </div>

            {/* Requests */}
            {selectedTeam && (
              <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-5">
                  Pending Requests
                </h2>

                {requests.length === 0 ? (
                  <p className="text-gray-500">
                    No pending requests.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div
                        key={request._id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold">
                            {request.userId.name}
                          </h3>

                          <p className="text-gray-500">
                            {request.userId.email}
                          </p>
                        </div>

                        <div className="flex gap-2">
  <button
  onClick={() => handleAccept(request._id)}
  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
>
  Accept
</button>
  <button
  onClick={() => handleReject(request._id)}
  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
>
  Reject
</button>
</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Requests;