export function UserNav() {
  const user = {
    name: "Shoxrux",
    surname: "Azimov",
    image: "",
    role: "admin",
  };

  return (
    <nav className="sm:bg-gray-900 text-white rounded-xl max-h-20 h-full my-2 flex items-center justify-center w-full gap-4 relative">
      <div className=" flex items-center gap-3 sm:bg-gray-800 cursor-pointer  transition p-2 rounded-xl">
        <button className="flex items-center gap-2 rounded-lg p-1">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
            {user.name[0]}
            {user.surname[0]}
          </div>
        </button>
        <div className="text-left hidden md:block">
          <p className="text-sm font-semibold">
            {user.name} {user.surname}
          </p>
          <span className="text-md capitalize">{user.role}</span>
        </div>
      </div>
    </nav>
  );
}
