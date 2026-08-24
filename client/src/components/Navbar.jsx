import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white px-5 md:px-8 py-4">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-2xl font-bold">TeamUp</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-base">
          <li>
            <Link to="/">Browse Teams</Link>
          </li>

          <li>
            <Link to="/create-team">Create Team</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/requests">Requests</Link>
              </li>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center border-t border-gray-700 pt-4">
          <li>
            <Link to="/" onClick={closeMenu}>
              Browse Teams
            </Link>
          </li>

          <li>
            <Link to="/create-team" onClick={closeMenu}>
              Create Team
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/requests" onClick={closeMenu}>
                  Requests
                </Link>
              </li>

              <li>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/signup" onClick={closeMenu}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;