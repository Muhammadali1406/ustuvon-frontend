import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
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
import { useAuthStore } from "../zustand/auth-info";

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

// ---------------------------------------------------------------------------
// Shared row: icon + label (md va undan katta) + tooltip (md dan kichik, hover)
// ---------------------------------------------------------------------------

function SidebarRow({
  icon,
  label,
  tone = "default",
}: {
  icon: ReactNode;
  label: string;
  tone?: "default" | "danger";
}) {
  return (
    <>
      <span className="shrink-0">{icon}</span>
      <span className="hidden text-sm md:inline">{label}</span>

      {/* Mobile/collapsed holatda: hover qilinganda chiqadigan tooltip */}
      <span
        className={`pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 scale-95 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 shadow-lg transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 md:hidden ${
          tone === "danger"
            ? "bg-rose-500 text-white"
            : "bg-gray-900 text-white"
        }`}
      >
        {label}
      </span>
    </>
  );
}

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-200 md:justify-start md:px-4 ${
      isActive
        ? "bg-[#1A5FA8] text-white"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar-glow sticky top-2 flex h-[calc(100vh-1rem)] w-16 shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-gray-900 text-white rounded-xl my-2 ml-2 transition-[width] duration-300 md:w-64">
        <div className="flex w-full items-center justify-center border-b-2 border-white/10 py-4 md:justify-start md:px-4">
          <UserNav />
        </div>

        {/* Main navigation */}
        <nav className="flex flex-1 flex-col gap-1 p-2 md:p-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              {({ isActive }) => (
                <SidebarRow
                  label={label}
                  icon={
                    <span
                      key={isActive ? `active-${location.pathname}` : "idle"}
                      className={isActive ? "nav-icon-pop" : ""}
                    >
                      <Icon
                        size={18}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                      />
                    </span>
                  }
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section — always pinned */}
        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 p-2 md:p-3">
          <NavLink to="/admin/help" className={navLinkClass}>
            <SidebarRow icon={<HelpCircle size={18} />} label="Yordam" />
          </NavLink>
          <NavLink to="/admin/settings" className={navLinkClass}>
            <SidebarRow icon={<Settings size={18} />} label="Sozlamalar" />
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="group relative flex items-center justify-center gap-3 rounded-lg px-2 py-2.5 text-gray-400 transition-colors duration-200 hover:bg-rose-500/10 hover:text-rose-400 md:justify-start md:px-4"
          >
            <SidebarRow icon={<LogOut size={18} />} label="Chiqish" tone="danger" />
          </button>

          <p className="mt-2 hidden px-4 text-[11px] text-gray-600 md:block">
            Ustuvon Admin · v1.0.0
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-4 md:p-8">
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