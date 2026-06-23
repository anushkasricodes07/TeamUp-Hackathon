function StepCard({ number, title, desc }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl min-h-64 p-6 w-64 shadow-lg hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <h3 className="text-purple-600 font-bold text-4xl">
        {number}
      </h3>

      <h4 className="font-semibold text-xl mt-3">
        {title}
      </h4>

      <p className="text-gray-600 mt-3">
        {desc}
      </p>
    </div>
  );
}

export default StepCard;