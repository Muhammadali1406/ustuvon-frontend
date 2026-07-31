import { Outlet, NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpenCheck,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { UserNav } from "./userNav";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/subjects", label: "Subjects", icon: BookOpenCheck },
  { to: "/admin/tests", label: "Tests", icon: ListChecks },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/statistics", label: "Statistics", icon: BarChart3 },
];

function AdminLayout() {
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-[#1A5FA8] text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar-glow sticky top-2 flex h-[calc(100vh-1rem)] w-64 shrink-0 flex-col overflow-y-auto bg-gray-900 text-white rounded-xl my-2 ml-2">
        <div className="text-xl font-bold w-full border-b-2 border-white/10 py-4">
          <UserNav />
        </div>

        {/* Main navigation */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span
                    key={isActive ? `active-${location.pathname}` : "idle"}
                    className={isActive ? "nav-icon-pop" : ""}
                  >
                    <Icon
                      size={18}
                      className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-sm">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section — always pinned */}
        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 p-3">
          <NavLink to="/admin/help" className={navLinkClass}>
            <HelpCircle size={18} className="shrink-0" />
            <span className="text-sm">Yordam</span>
          </NavLink>
          <NavLink to="/admin/settings" className={navLinkClass}>
            <Settings size={18} className="shrink-0" />
            <span className="text-sm">Sozlamalar</span>
          </NavLink>
          <button
            type="button"
            onClick={() => {
              // TODO: auth logikaga ulash (token tozalash + /login ga redirect)
            }}
            className="group flex items-center gap-3 rounded-lg px-4 py-2.5 text-gray-400 transition-colors duration-200 hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut size={18} className="shrink-0" />
            <span className="text-sm">Chiqish</span>
          </button>

          <p className="mt-2 px-4 text-[11px] text-gray-600">
            Ustuvon Admin · v1.0.0
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-8">
        <Outlet />
      </main>

      <style>{`
        @keyframes navIconPop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .nav-icon-pop {
          display: inline-flex;
          animation: navIconPop 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminLayout;