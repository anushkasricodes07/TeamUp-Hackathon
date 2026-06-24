function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-16 flex flex-col items-center">
      <input
        type="text"
        placeholder="Search Teams..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-600"
      />

      <p className="mt-4 text-gray-600">
        You searched: {search}
      </p>
    </div>
  );
}

export default SearchBar;