import { useState } from "react";

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const user = {
    name: "Shoxrux",
    surname: "Azimov",
    image: "",
    role: "admin",
  };

  return (
    <nav className="bg-gray-900 text-white rounded-xl max-h-20 h-full my-2 flex items-center justify-center w-full gap-4 relative">
      <div
        className=" flex items-center gap-3 bg-gray-800 cursor-pointer  transition p-2 rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <button className="flex items-center gap-2 rounded-lg p-1">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              {user.name[0]}
              {user.surname[0]}
            </div>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute left-0 top-12 w-48 bg-gray-800 rounded-xl shadow-xl border border-gray-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="font-semibold">
                  {user.name} {user.surname}
                </p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700 transition text-sm">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700 transition text-sm">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-red-900/50 text-red-400 transition text-sm">
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-semibold">
            {user.name} {user.surname}
          </p>
          <span className="text-md capitalize">{user.role}</span>
        </div>
      </div>
    </nav>
  );
}
