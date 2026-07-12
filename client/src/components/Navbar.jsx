import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">TeamUp</h1>
      </Link>

      <ul className="flex gap-2 md:gap-8 text-sm md:text-base">
        <li>
          <Link to="/">Browse Teams</Link>
        </li>

        <li>
          <Link to="/create-team">Create Team</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;