import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-orange-500">Travelin</h1>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore Buses</Link>
          <Link to="/trips">My Trips</Link>
          <Link to="/payments">Payments</Link>
          <Link to="/support">Support</Link>
        </div>

        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer">
            U
          </div>

          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg w-40">
            <Link to="/profile" className="block px-4 py-2 hover:bg-orange-50">
              Profile
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-orange-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
