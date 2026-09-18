import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      if (!isLoggedIn) {
        setIsOwner(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/teams/my-teams", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsOwner(data.length > 0);
      } catch (err) {
        setIsOwner(false);
      }
    };
    checkOwner();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOwner(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-900 text-white px-5 md:px-8 py-4">
      <div className="flex justify-between items-center">
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-2xl font-bold">TeamUp</h1>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 text-base">
          <li><Link to="/">Browse Teams</Link></li>
          <li><Link to="/create-team">Create Team</Link></li>

          {isLoggedIn? (
            <>
              {/* Owner ko hi dikhega */}
              {isOwner && (
                <>
                  <li><Link to="/my-teams">My Teams</Link></li>
                  <li><Link to="/requests">Requests</Link></li>
                </>
              )}

              {/* Normal user ko hi dikhega */}
              {!isOwner && (
                <li><Link to="/my-requests">My Requests</Link></li>
              )}

              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">☰</button>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center border-t border-gray-700 pt-4">
          <li><Link to="/" onClick={closeMenu}>Browse Teams</Link></li>
          <li><Link to="/create-team" onClick={closeMenu}>Create Team</Link></li>

          {isLoggedIn? (
            <>
              {isOwner && (
                <>
                  <li><Link to="/my-teams" onClick={closeMenu}>My Teams</Link></li>
                  <li><Link to="/requests" onClick={closeMenu}>Requests</Link></li>
                </>
              )}

              {!isOwner && (
                <li><Link to="/my-requests" onClick={closeMenu}>My Requests</Link></li>
              )}

              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
              <li><Link to="/signup" onClick={closeMenu}>Signup</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
