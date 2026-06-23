function Hero() {
  return (
    <section className="text-center mt-14 px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
        Find Your Dream
        <span className="block text-purple-600">
          Hackathon Team
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        Connect with developers, designers and innovators
        to build winning projects and create amazing
        hackathon experiences together.
      </p>

      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg">
          Get Started
        </button>

        <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition">
          Explore Teams
        </button>
      </div>
    </section>
  );
}

export default Hero;