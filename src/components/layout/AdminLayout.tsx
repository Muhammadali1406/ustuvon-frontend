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
      <aside className="sidebar-glow w-64 bg-gray-900 text-white p-6 rounded-b-xl rounded-tl-xl my-2 ml-2">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
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
      <div className="w-full h-screen pr-2">
        <nav className="bg-gray-900 px-4 text-white rounded-r-xl max-h-20 h-full my-2 flex items-center justify-end w-full">
          <UserNav />
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
