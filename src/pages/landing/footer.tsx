import { Mail, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to?: string; href?: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="text-sm text-[var(--ink)]/65 transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-sm text-[var(--ink)]/65 transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="biz-haqimizda"
      className="border-t border-[var(--ink)]/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/b-logo.png"
                alt="Ustuvon logo"
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="u-font-display text-base font-semibold text-[var(--ink)]">
                Ustuvon
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/55">
              Rasmiy manbalar asosidagi test tayyorgarlik platformasi.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[var(--ink)]/40">
              <a
                href="#"
                aria-label="Telegram"
                className="hover:text-[var(--brand)]"
              >
                <Send size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[var(--brand)]"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="hover:text-[var(--brand)]"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Platforma"
            links={[
              { label: "Fanlar", href: "#fanlar" },
              { label: "Qanday ishlaydi", href: "#qanday-ishlaydi" },
            ]}
          />
          <FooterColumn
            title="Akkaunt"
            links={[
              { label: "Kirish", to: "/login" },
              { label: "Ro'yxatdan o'tish", to: "/register" },
            ]}
          />
          <FooterColumn
            title="Bog'lanish"
            links={[
              { label: "Telegram", href: "#" },
              { label: "Instagram", href: "#" },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-[var(--ink)]/10 pt-6 text-xs text-[var(--ink)]/40">
          © {new Date().getFullYear()} Ustuvon. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
}
