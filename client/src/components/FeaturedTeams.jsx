import TeamCard from "./TeamCard";

function FeaturedTeams({ search}) {

  const teams = [
    {
      teamName: "AI Innovators",
      role: "Need 3 Developers",
      members: 4
    },
    {
      teamName: "Design Ninjas",
      role: "Need UI Designer",
      members: 3
    },
    {
      teamName: "Hack Masters",
      role: "Need MERN Developer",
      members: 5
    },
    {
      teamName: "Code Warriors",
      role: "Need Frontend Developer",
      members: 4
    }
  ];

  const filteredTeams = teams.filter(
  (team) =>
    team.teamName.toLowerCase().includes(search.toLowerCase()) ||
    team.role.toLowerCase().includes(search.toLowerCase())
);

  return (
    <section id="featured-teams" className="mt-20">
      <h2 className="text-4xl font-bold text-center">
        Featured Teams
      </h2>
      <div className="w-32 h-1 bg-purple-600 mx-auto mt-3 rounded-full"></div>
      <p className="text-gray-600 mt-2 text-center">
  Discover talented teams looking for members.
</p>

      <div className="flex flex-wrap gap-6 justify-center mt-8">
        {filteredTeams.map((team, index) => (
          <TeamCard
            key={index}
            teamName={team.teamName}
            role={team.role}
            members={team.members}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedTeams;