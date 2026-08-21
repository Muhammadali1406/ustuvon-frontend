import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { BookOpen, History, Home, LogOut, User as UserIcon } from "lucide-react";
import { useAuthStore } from "../zustand/auth-info";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

// ---------------------------------------------------------------------------
// Demo user — auth tugagach real sessiya/context bilan almashtiriladi
// ---------------------------------------------------------------------------

function initials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/app", label: "Bosh sahifa", icon: Home, end: true },
  { to: "/app/subjects", label: "Fanlar", icon: BookOpen },
  { to: "/app/results", label: "Natijalarim", icon: History },
  { to: "/app/profile", label: "Profil", icon: UserIcon },
];

function Logo() {
  return (
    <Link to="/app" className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0EBE15] text-sm font-bold text-[#101826]">
        U
      </span>
      <span className="text-lg font-semibold text-slate-900">Ustuvon</span>
    </Link>
  );
}

function Avatar() {
  return (
    <Link
      to="/app/profile"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F8E8] text-xs font-semibold text-[#0B8E0F] transition-colors hover:bg-[#0EBE15]/25"
      title={DEMO_USER.first_name}
    >
      {initials(DEMO_USER.first_name)}
    </Link>
  );
}

export default function UserLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#E7F8E8] text-[#0B8E0F]"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors ${
      isActive ? "text-[#0B8E0F]" : "text-slate-400"
    }`;

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      {/* Desktop top nav */}
      <header className="sticky top-0 z-40 hidden border-b border-black/8 bg-white/90 backdrop-blur-md md:block">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Logo />

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={desktopNavLinkClass}>
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              title="Chiqish"
              className="rounded-md p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
              onClick={handleLogout}
            >
              <LogOut size={17} />
            </button>
            <Avatar />
          </div>
        </div>
      </header>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-black/8 bg-white/90 px-4 py-3 backdrop-blur-md md:hidden">
        <Logo />
        <Avatar />
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6 md:px-6 md:pb-10 md:pt-8">
        <Outlet />
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white md:hidden">
        <div className="flex items-stretch">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={mobileNavLinkClass}>
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}