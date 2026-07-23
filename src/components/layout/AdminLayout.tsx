import { Outlet, NavLink } from "react-router-dom";
import { UserNav } from "./userNav";

function AdminLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar-glow sticky top-2 self-start h-[calc(100vh-1rem)] w-64 shrink-0 overflow-y-auto bg-gray-900 text-white rounded-xl my-2 ml-2">
        <div className="text-xl font-bold mb-8 w-full border-b-2 border-white py-4">
          <UserNav />
        </div>
        <nav className="flex flex-col gap-2 p-3">
          <NavLink to="/admin" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/subjects" className={navLinkClass}>
            Subjects
          </NavLink>
          <NavLink to="/admin/tests" className={navLinkClass}>
            Tests
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            Users
          </NavLink>
          <NavLink to="/admin/statistics" className={navLinkClass}>
            Statistics
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
