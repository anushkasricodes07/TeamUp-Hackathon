import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

function FeaturedTeams({ search }) {
  const[teams, setTeams ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:5000/teams")
    .then((res) => res.json())
    .then((data) => {
      setTeams(data);
      setLoading(false);   
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);   // Agar error aaye tab bhi loading hata do
    });
}, []);
  const filteredTeams = teams.filter(
  (team) =>
    team.teamName.toLowerCase().includes(search.toLowerCase()) ||
    team.projectTitle.toLowerCase().includes(search.toLowerCase())
);
  if (loading) {
  return (
    <h2 className="text-center mt-20 text-xl">
      Loading teams...
    </h2>
  );
}

  return (
    <section id="featured-teams" className="mt-20">
      <h2 className="text-4xl font-bold text-center">
        Featured Teams
      </h2>
      <div className="w-32 h-1 bg-purple-600 mx-auto mt-3 rounded-full"></div>
      <p className="text-gray-600 mt-2 text-center">
  Discover talented teams looking for members.
</p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filteredTeams.map((team, index) => (
         <TeamCard
  key={team._id}
  teamName={team.teamName}
  projectTitle={team.projectTitle}
  requiredRoles={team.requiredRoles}
  currentMembers={team.currentMembers}
  teamSize={team.teamSize}
  hackathonName={team.hackathonName}
  techStack={team.techStack}
 deadline={team.deadline}
/> 
        ))}
      </div>
    </section>
  );
}

export default FeaturedTeams;