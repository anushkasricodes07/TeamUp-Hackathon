import { useEffect, useState } from "react";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/requests/my-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
  console.log("MY REQUESTS FROM BACKEND:", data);
  console.log("IS ARRAY:", Array.isArray(data));
  console.log("REQUEST COUNT:", data.length);

  setRequests(data);
} else {
  console.log("MY REQUESTS ERROR:", data.error);
}
  } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-purple-600 mb-8">
          My Join Requests
        </h1>

        {requests.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">
              You haven't sent any join requests.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-bold">
                  {request.teamId.teamName}
                </h2>

                <p className="text-gray-500 mt-1">
                  {request.teamId.projectTitle}
                </p>

                <p className="mt-4">
                  Status:
                  <span className="ml-2 font-semibold">
                    {request.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyRequests;