import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Reveal } from "../landing/reveal";
import { PROJECT_LINKS, TEAM_GROUPS, TEAM_ROLES, TOOLS, type TeamGroup } from "./demo-data";
import { scrollToSection } from "./demo-hooks";
import { Card, Chip, Eyebrow, Section, SectionHead, SubHead, SubNav } from "./demo-ui";
import { TechStack } from "./architecture";

type Filter = TeamGroup | "Hammasi";

export function TeamSection() {
  const [filter, setFilter] = useState<Filter>("Hammasi");
  const links = PROJECT_LINKS.filter((l) => l.href);
  const matches = (g: TeamGroup) => filter === "Hammasi" || filter === g;

  return (
    <Section id="jamoa" tone="white">
      <SectionHead
        no="02"
        eyebrow="Jamoa"
        title="Texnik, ta'limiy va biznes yo'nalishlari — bir jamoada"
        intro="USTUVONni ishlab chiqish uchun texnik, ta'limiy va biznes yo'nalishlarini qamrab oluvchi jamoa shakllantiriladi."
      />
      <SubNav
        items={[
          { id: "rollar", no: "2.1", label: "Rollar" },
          { id: "konikmalar", no: "2.2", label: "Ko'nikmalar" },
          { id: "jamoa-texnologiyalar", no: "2.3", label: "Texnologiyalar" },
          { id: "havolalar", no: "2.4", label: "Havolalar" },
        ]}
      />

      <SubHead
        first
        id="rollar"
        no="2.1"
        title="Rollar"
        text="Har bir rolning asosiy vazifalari. Yo'nalish bo'yicha filtrlang:"
      />
      <div className="flex flex-wrap gap-2">
        {(["Hammasi", ...TEAM_GROUPS] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setFilter(g)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === g
                ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                : "border-[var(--ink)]/15 text-[var(--ink)]/65 hover:border-[var(--ink)]/30"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <Reveal className="mt-5">
        <div className="grid grid-cols-1 border-b border-l border-[var(--ink)]/10 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_ROLES.map((r) => (
            <div
              key={r.role}
              className={`border-r border-t border-[var(--ink)]/10 bg-white p-5 transition-all duration-300 ${
                matches(r.group) ? "opacity-100" : "opacity-30"
              }`}
            >
              <r.icon size={20} className="text-[#0EBE15]" />
              <p className="mt-3 u-font-display text-base font-semibold text-[var(--ink)]">
                {r.role}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/60">
                {r.duty}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <SubHead
        id="konikmalar"
        no="2.2"
        title="Ko'nikmalar"
        text="Jamoa a'zolarining yo'nalishlar bo'yicha asosiy ko'nikmalari."
      />
      <Reveal className="grid gap-6 lg:grid-cols-3">
        {TEAM_GROUPS.map((g) => {
          const roles = TEAM_ROLES.filter((r) => r.group === g);
          return (
            <Card
              key={g}
              className={`transition-opacity duration-300 ${
                matches(g) ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="u-font-display text-lg font-bold text-[var(--ink)]">
                  {g}
                </p>
                <span className="rounded-full bg-[var(--ink)]/5 px-2.5 py-1 u-font-mono text-[11px] font-medium text-[var(--ink)]/50">
                  {roles.length} ta rol
                </span>
              </div>
              <ul className="mt-5 space-y-5">
                {roles.map((r) => (
                  <li key={r.role}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                      <r.icon size={15} className="shrink-0 text-[#0EBE15]" />
                      {r.role}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </Reveal>

      <SubHead
        id="jamoa-texnologiyalar"
        no="2.3"
        title="Foydalaniladigan texnologiyalar"
        text="Frontenddan xavfsizlikkacha — platforma qurilayotgan texnologiyalar."
      />
      <Reveal>
        <TechStack />
      </Reveal>

      <SubHead
        id="havolalar"
        no="2.4"
        title="Havolalar"
        text="Loyiha havolalari va ishlab chiqish jarayonida foydalaniladigan resurslar."
      />
      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => {
            const cls =
              "group flex items-center justify-between gap-3 rounded-xl border border-[var(--ink)]/10 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/50 hover:shadow-md hover:shadow-[var(--brand)]/5";
            const inner = (
              <>
                <span>
                  <span className="block u-font-display text-sm font-semibold text-[var(--ink)]">
                    {l.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--ink)]/55">
                    {l.note}
                  </span>
                </span>
                {l.external ? (
                  <ExternalLink size={16} className="shrink-0 text-[#0EBE15]" />
                ) : (
                  <Play size={16} className="shrink-0 text-[#0EBE15]" />
                )}
              </>
            );
            return l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <button
                key={l.label}
                type="button"
                onClick={() => scrollToSection(l.href.slice(1))}
                className={cls}
              >
                {inner}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <Eyebrow>Ishlab chiqishda foydalaniladigan resurslar</Eyebrow>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-[var(--ink)]/10 bg-white p-4"
              >
                <p className="u-font-display text-sm font-semibold text-[var(--ink)]">
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-[var(--ink)]/55">{t.use}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
