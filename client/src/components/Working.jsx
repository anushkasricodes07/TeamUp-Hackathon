import StepCard from "./StepCard";

function Working() {

  const steps = [
    {
      number: "01",
      title: "Create Profile",
      desc: "Build your profile and showcase your skills."
    },
    {
      number: "02",
      title: "Join a Team",
      desc: "Find teammates that match your interests."
    },
    {
      number: "03",
      title: "Build & Win",
      desc: "Collaborate and participate in hackathons."
    }
  ];

  return (
    <section className="mt-20">
      <h2 className="text-4xl font-bold text-center">
        How It Works
      </h2>
      <p className="text-gray-600 text-center mt-2">
  Follow these simple steps to find your perfect team.
</p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            number={step.number}
            title={step.title}
            desc={step.desc}
          />
        ))}
      </div>
    </section>
  );
}

export default Working;