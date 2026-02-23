import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
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
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`group flex items-center gap-2 p-1.5 rounded-full transition-all duration-200 cursor-pointer 
          ${open ? "bg-gray-100" : "hover:bg-gray-50"}`}
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <User size={18} />
        </div>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-200 mr-1 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute -right-2 mt-1 w-56 origin-top-right bg-blue-50 border border-blue-400 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in zoom-in duration-150">
          {/* Header/Info Section */}
          <div className="px-4 py-3 border-b border-blue-500">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Account
            </p>
            <p className="text-sm font-semibold text-gray-700 truncate">
              user@example.com
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 py-2 px-1">
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-100 rounded-md transition-colors group"
            >
              <Settings
                size={16}
                className="text-gray-400 group-hover:text-purple-600"
              />
              <span className="font-medium">Profile Settings</span>
            </NavLink>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-100 rounded-md cursor-pointer transition-colors group"
            >
              <LogOut
                size={16}
                className="text-red-400 group-hover:text-red-600"
              />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
