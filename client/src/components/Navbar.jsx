function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">TeamUp</h1>

      <ul className="flex gap-2 md:gap-8 text-sm md:text-base">
        <li>Browse Teams</li>
        <li>Create Team</li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;