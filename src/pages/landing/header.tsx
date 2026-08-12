import { Link } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ink)]/8 bg-[var(--paper)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0EBE15] u-font-display text-sm font-bold text-[var(--ink)]">
            U
          </span>
          <span className="u-font-display text-lg font-semibold text-[var(--ink)]">
            Ustuvon
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ink)]/65 md:flex">
          <a
            href="#fanlar"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Fanlar
          </a>
          <a
            href="#qanday-ishlaydi"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Qanday ishlaydi
          </a>
          <a
            href="#biz-haqimizda"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Biz haqimizda
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-md px-3 py-2 text-sm font-medium text-[var(--ink)]/70 transition-colors hover:text-[var(--ink)] md:px-4"
          >
            Kirish
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-[#0EBE15]/80 px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#03ba09] text-white md:px-4"
          >
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </header>
  );
}

export function UserHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ink)]/8 bg-[var(--paper)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0EBE15] u-font-display text-sm font-bold text-[var(--ink)]">
            U
          </span>
          <span className="u-font-display text-lg font-semibold text-[var(--ink)]">
            Ustuvon
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ink)]/65 md:flex">
          <a
            href="#fanlar"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Testlar
          </a>
          <a
            href="#qanday-ishlaydi"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Natijalar tarixi
          </a>
          <a
            href="#biz-haqimizda"
            className="transition-colors hover:text-[var(--ink)]"
          >
            Profile
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/register"
            className="rounded-md bg-[#0EBE15]/80 px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#03ba09] text-white md:px-4"
          >
            Chiqish
          </Link>
        </div>
      </div>
    </header>
  );
}
