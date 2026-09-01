import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  // BarChart3,
  BookOpenCheck,
  // HelpCircle,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  // Settings,
  Users,
  X,
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
  // { to: "/admin/statistics", label: "Statistics", icon: BarChart3 },
];

// Pastki app-bar'ga sig'adigan asosiy 4 tasi — qolgani "Menu" ichida.
// Tartibni o'zgartirmoqchi bo'lsangiz shu ikki qatorni tahrirlang.
const BOTTOM_BAR_ITEMS = NAV_ITEMS.slice(0, 4);
const MENU_NAV_ITEMS = NAV_ITEMS.slice(4);

// ---------------------------------------------------------------------------
// Desktop sidebar qatori: icon + label (md+) + tooltip (md dan kichik, hover)
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

// ---------------------------------------------------------------------------
// Mobil pastki app-bar qatori: icon tepada, label pastda (kichik)
// ---------------------------------------------------------------------------

function BottomBarItem({
  icon,
  label,
  isActive,
}: {
  icon: ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {icon}
      <span
        className={`text-[10px] font-medium leading-none ${
          isActive ? "text-white" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Menu sheet ichidagi qator (icon + label, doim to'liq matn bilan)
// ---------------------------------------------------------------------------

function MenuSheetRow({
  icon,
  label,
  tone = "default",
}: {
  icon: ReactNode;
  label: string;
  tone?: "default" | "danger";
}) {
  return (
    <span className={`flex items-center gap-3 ${tone === "danger" ? "" : ""}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // isMenuOpen — sheet DOM'da bormi. isSheetVisible — animatsiya holati
  // (kirish/chiqish transitionini to'g'ri ishlatish uchun ikkalasi kerak).
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    // Ikki marta rAF — brauzer "translate-y-full" holatini chizib
    // ulgurishi uchun, aks holda transition sakrab o'tib ketadi.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsSheetVisible(true));
    });
  };

  const closeMenu = () => {
    setIsSheetVisible(false);
    window.setTimeout(() => setIsMenuOpen(false), 200);
  };

  // Marshrut o'zgarsa (link bosilsa) sheet avtomatik yopiladi
  useEffect(() => {
    if (isMenuOpen) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Escape bilan yopish
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  // Sheet ochiqda orqa fon scroll bo'lmasin
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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

  const menuSheetLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between rounded-xl px-3 py-3 transition-colors ${
      isActive ? "bg-[#1A5FA8] text-white" : "text-gray-300 hover:bg-white/5"
    }`;

  // "Menu" tugmasi — sheet ochiq bo'lsa, YOKI joriy sahifa sheet ichidagi
  // bo'limlardan biri bo'lsa (masalan Statistics) — faol ko'rinishda turadi
  const isOnMenuSection =
    MENU_NAV_ITEMS.some((item) => location.pathname.startsWith(item.to)) ||
    location.pathname.startsWith("/admin/settings") ||
    location.pathname.startsWith("/admin/help");
  const isMenuButtonActive = isMenuOpen || isOnMenuSection;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop/tablet sidebar — faqat md+ */}
      <aside className="sidebar-glow sticky top-2 hidden h-[calc(100vh-1rem)] w-16 shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-gray-900 text-white rounded-xl my-2 ml-2 transition-[width] duration-300 md:flex md:w-64">
        <div className="flex w-full items-center justify-center border-b-2 border-white/10 py-4 md:justify-start md:px-4">
          <UserNav />
        </div>

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

        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 p-2 md:p-3">
          {/* <NavLink to="/admin/help" className={navLinkClass}>
            <SidebarRow icon={<HelpCircle size={18} />} label="Yordam" />
          </NavLink>
          <NavLink to="/admin/settings" className={navLinkClass}>
            <SidebarRow icon={<Settings size={18} />} label="Sozlamalar" />
          </NavLink> */}
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
      <main className="flex-1 min-w-0 p-4 pb-24 md:p-8 md:pb-8">
        <Outlet />
      </main>

      {/* Mobil pastki app-bar — faqat md dan pastda */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-white/10 bg-gray-900 pb-[env(safe-area-inset-bottom)] md:hidden">
        {BOTTOM_BAR_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="flex flex-1 items-center justify-center py-2.5"
          >
            {({ isActive }) => (
              <BottomBarItem
                isActive={isActive}
                label={label}
                icon={
                  <span
                    key={isActive ? `active-${location.pathname}` : "idle"}
                    className={isActive ? "nav-icon-pop" : ""}
                  >
                    <Icon
                      size={20}
                      className={isActive ? "text-white" : "text-gray-500"}
                    />
                  </span>
                }
              />
            )}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
          className="flex flex-1 items-center justify-center py-2.5"
        >
          <BottomBarItem
            isActive={isMenuButtonActive}
            label="Menu"
            icon={
              <Menu
                size={20}
                className={isMenuButtonActive ? "text-white" : "text-gray-500"}
              />
            }
          />
        </button>
      </nav>

      {/* Menu sheet — pastdan chiqadigan modal, faqat mobil */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 md:hidden ${
            isSheetVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full rounded-t-2xl bg-gray-900 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] text-white shadow-2xl transition-transform duration-200 ease-out ${
              isSheetVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Tortish dastagi (vizual belgi) */}
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />

            <div className="flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-white">Menu</p>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-md p-1.5 text-gray-400 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-1">
              {MENU_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={menuSheetLinkClass}>
                  <MenuSheetRow icon={<Icon size={17} />} label={label} />
                </NavLink>
              ))}

              {/* <NavLink to="/admin/help" className={menuSheetLinkClass}>
                <MenuSheetRow icon={<HelpCircle size={17} />} label="Yordam" />
              </NavLink>
              <NavLink to="/admin/settings" className={menuSheetLinkClass}>
                <MenuSheetRow icon={<Settings size={17} />} label="Sozlamalar" />
              </NavLink> */}

              <div className="my-1.5 border-t border-white/10" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-rose-400 transition-colors hover:bg-rose-500/10"
              >
                <MenuSheetRow icon={<LogOut size={17} />} label="Chiqish" tone="danger" />
              </button>
            </div>

            <p className="mt-3 text-center text-[11px] text-gray-600">
              Ustuvon Admin · v1.0.0
            </p>
          </div>
        </div>
      )}

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