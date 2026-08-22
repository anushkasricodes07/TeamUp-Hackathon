import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
  <Link to="/requests">Requests</Link>
</li>

        <li>
          {isLoggedIn ? (
  <button onClick={handleLogout}>
    Logout
  </button>
) : (
  <>
    <Link to="/login">Login</Link>
    <span className="mx-2">|</span>
    <Link to="/signup">Signup</Link>
  </>
)}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;