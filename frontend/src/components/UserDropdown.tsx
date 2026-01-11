import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

function UserDropdown({ logout }: { logout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="hidden md:block relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-lg shadow-purple-200">
          <User size={20} />
        </div>
      </button>

      {open && (
        <div className="absolute -right-5 mt-1 w-42 bg-purple-50 border border-gray-300 rounded-xl shadow-xl transition-all duration-200">
          <div className="p-2">
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg"
            >
              <Settings size={16} /> Profile Settings
            </NavLink>

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
