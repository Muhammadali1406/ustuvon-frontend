import { useState } from "react";
import { ArrowDown, Check, ExternalLink, Plus } from "lucide-react";
import { Reveal } from "../landing/reveal";
import {
  ARCH_LAYERS,
  CHAIN,
  ENGINE_DUTIES,
  EXAM_TREE,
  EXPANSION_AFTER_UZ,
  LANGUAGES,
  MVP_GROUPS,
  PILLARS,
  PROJECT_LINKS,
  PROTOTYPE_AI_FLOW,
  PROTOTYPE_PAGES,
  TEAM_GROUPS,
  TEAM_ROLES,
  TECH_STACK,
  TOOLS,
  type TeamGroup,
} from "./demo-data";
import { useInView, useStepper } from "./demo-hooks";
import {
  Card,
  Chip,
  Eyebrow,
  FlowChain,
  ResumeButton,
  Section,
  SectionHead,
  StepProgress,
} from "./demo-ui";

/* ================================================================== */
/* 04 — Arxitektura                                                    */
/* ================================================================== */

function ArchitectureStack() {
  const s = useStepper<HTMLDivElement>(ARCH_LAYERS.length, 1300);
  return (
    <div ref={s.ref}>
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>1-bosqich arxitekturasi</Eyebrow>
        <ResumeButton manual={s.manual} onResume={s.resume} />
      </div>
      <div className="flex flex-col items-stretch">
        {ARCH_LAYERS.map((l, i) => {
          const core = l === "Test Engine";
          const active = i === s.index;
          return (
            <div key={l} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => s.select(i)}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? "border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)] shadow-md shadow-[#0EBE15]/30"
                    : core
                      ? "border-[#0EBE15]/50 bg-[#0EBE15]/10 text-[var(--ink)]"
                      : "border-[var(--ink)]/10 bg-white text-[var(--ink)]/75 hover:border-[var(--ink)]/25"
                }`}
              >
                {l}
                {core && (
                  <span className="rounded-full bg-[var(--ink)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Markaziy qism
                  </span>
                )}
              </button>
              {i < ARCH_LAYERS.length - 1 && (
                <ArrowDown
                  size={14}
                  className={`my-0.5 transition-colors ${
                    i < s.index ? "text-[#0EBE15]" : "text-[var(--ink)]/25"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExamTree() {
  const { ref, inView } = useInView<HTMLPreElement>(0.4, true);
  return (
    <pre
      ref={ref}
      className="mt-4 overflow-x-auto u-font-mono text-sm leading-7"
    >
      {EXAM_TREE.map(([prefix, name], i) => (
        <div
          key={`${prefix}${name}`}
          className="transition-all duration-500"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-8px)",
            transitionDelay: `${i * 120}ms`,
          }}
        >
          <span className="text-[var(--ink)]/30">{prefix}</span>
          <span
            className={
              name === "Exam"
                ? "font-semibold text-[#0EBE15]"
                : "font-medium text-[var(--ink)]"
            }
          >
            {name}
          </span>
        </div>
      ))}
    </pre>
  );
}

function TechStack() {
  const s = useStepper<HTMLDivElement>(TECH_STACK.length, 3800);
  const current = TECH_STACK[s.index];
  return (
    <div ref={s.ref}>
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>Texnologiyalar</Eyebrow>
        <ResumeButton manual={s.manual} onResume={s.resume} />
      </div>
      <div className="rounded-2xl border border-[var(--ink)]/10 bg-white shadow-xl shadow-[var(--ink)]/5">
        <div className="flex overflow-x-auto border-b border-[var(--ink)]/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TECH_STACK.map((t, i) => {
            const active = i === s.index;
            return (
              <button
                key={t.group}
                type="button"
                onClick={() => s.select(i)}
                className={`relative shrink-0 px-5 py-3.5 text-sm font-semibold transition-colors ${
                  active
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
                }`}
              >
                {t.group}
                {active && (
                  <>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#0EBE15]/30" />
                    <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
                  </>
                )}
              </button>
            );
          })}
        </div>
        <div key={s.index} className="demo-fade min-h-[9rem] p-6">
          {current.group === "Database" && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
              Boshlang'ich bosqichda
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {current.items.map((it) => (
              <Chip key={it} active>
                {it}
              </Chip>
            ))}
          </div>
          {current.note && (
            <p className="mt-4 text-sm text-[var(--ink)]/60">{current.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ArchitectureSection() {
  return (
    <Section id="arxitektura" tone="white">
      <SectionHead
        no="04"
        eyebrow="Arxitektura"
        title="Markazida Test Engine turgan tizim"
        intro="Birinchi navbatda USTUVONning assessment qismi ishlab chiqiladi. Har bir imtihon turi uchun alohida konfiguratsiya beriladi — shu tufayli turli xalqaro imtihonlar bitta platformada ishlaydi."
      />
      <div className="grid items-start gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <ArchitectureStack />
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-2 lg:col-span-3">
          <Card>
            <Eyebrow>Test Engine</Eyebrow>
            <ul className="mt-4 space-y-2.5">
              {ENGINE_DUTIES.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-[var(--ink)]/80">
                  <Check size={15} className="shrink-0 text-[#0EBE15]" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <Eyebrow>Imtihon konfiguratsiyasi</Eyebrow>
            <ExamTree />
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <TechStack />
      </Reveal>
    </Section>
  );
}

/* ================================================================== */
/* 05 — Jamoa                                                          */
/* ================================================================== */

export function TeamSection() {
  const [filter, setFilter] = useState<TeamGroup | "Hammasi">("Hammasi");
  const links = PROJECT_LINKS.filter((l) => l.href);

  return (
    <Section id="jamoa">
      <SectionHead
        no="05"
        eyebrow="Jamoa"
        title="Texnik, ta'limiy va biznes yo'nalishlari — bir jamoada"
        intro="USTUVONni ishlab chiqish uchun texnik, ta'limiy va biznes yo'nalishlarini qamrab oluvchi jamoa shakllantiriladi."
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
          {TEAM_ROLES.map((r) => {
            const on = filter === "Hammasi" || filter === r.group;
            return (
              <div
                key={r.role}
                className={`border-r border-t border-[var(--ink)]/10 bg-white p-5 transition-all duration-300 ${
                  on ? "opacity-100" : "opacity-30"
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
            );
          })}
        </div>
      </Reveal>

      <div className="mt-16 grid items-start gap-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
            Nima uchun aynan bizning jamoa
          </p>
          <h3 className="mt-2 u-font-display text-2xl font-bold text-[var(--ink)]">
            Muammoni faqat texnologiya emas, to'rt yo'nalish birligida hal qilamiz
          </h3>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {PILLARS.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className="rounded-lg border border-[#0EBE15]/40 bg-[#0EBE15]/10 px-4 py-2.5 u-font-display text-sm font-bold text-[var(--ink)]">
                  {p}
                </span>
                {i < PILLARS.length - 1 && (
                  <Plus size={14} className="text-[var(--ink)]/40" />
                )}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-5 text-sm leading-relaxed text-[var(--ink)]/75">
            <b>AI Test Generator</b> orqali mavjud test bazalarini tezlik bilan
            raqamlashtirish va turli imtihon formatlariga moslashtirish —
            platformaga katta hajmdagi test kontentini tezroq kiritish imkonini
            beradi.
          </div>
        </Reveal>

        <Reveal>
          <Card>
            <Eyebrow>Bosqichma-bosqich yondashuv</Eyebrow>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
              Dastlab butun dunyoga mo'ljallangan juda katta tizimni birdan
              yaratish o'rniga, eng muhim muammo —{" "}
              <b>professional online assessment</b> — hal qilinadi.
              Keyinchalik zanjirga qo'shiladi:
            </p>
            <FlowChain items={CHAIN} className="mt-4" />
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-10">
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
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink)]/15 px-4 py-1.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[#0EBE15] hover:text-[#0EBE15]"
              >
                {l.label} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}

/* ================================================================== */
/* 06 — Yo'l xaritasi                                                  */
/* ================================================================== */

const STAGES = [
  { no: 1, name: "IDEA", goal: "Konsepsiya" },
  { no: 2, name: "PROTOTYPE", goal: "UX/UI prototip" },
  { no: 3, name: "MVP", goal: "Birinchi real mahsulot" },
  { no: 4, name: "LAUNCHED", goal: "Bozorga chiqish" },
];

function StageDetail({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div>
        <p className="text-sm text-[var(--ink)]/60">
          <b className="text-[var(--ink)]">Maqsad:</b> Platformaning
          konsepsiyasini ishlab chiqish.
        </p>
        <blockquote className="mt-4 border-l-4 border-[#0EBE15] pl-4 u-font-display text-lg font-semibold leading-snug text-[var(--ink)]">
          Dunyo miqyosida foydalanish mumkin bo'lgan, ta'lim olish, bilimni
          tekshirish, rivojlanishni kuzatish va sertifikat olish jarayonlarini
          yagona tizimga birlashtiruvchi platforma yaratish.
        </blockquote>
        <p className="mt-4">
          <Chip active>Holat: Idea</Chip>
        </p>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="space-y-5">
        <p className="text-sm text-[var(--ink)]/60">
          Platformaning asosiy UX/UI prototipi yaratiladi.
        </p>
        <div>
          <Eyebrow>Asosiy sahifalar</Eyebrow>
          <div className="mt-2 flex flex-wrap gap-2">
            {PROTOTYPE_PAGES.map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow>AI Test Generator prototipi</Eyebrow>
          <FlowChain items={PROTOTYPE_AI_FLOW} activeIndex={-1} className="mt-2" />
        </div>
        <p className="text-sm text-[var(--ink)]/70">
          <b className="text-[var(--ink)]">Natija:</b> platformaning ishlash
          modeli ko'rsatiladigan prototype.
        </p>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="space-y-5">
        <p className="text-sm text-[var(--ink)]/60">
          Birinchi real ishlaydigan mahsulot.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MVP_GROUPS.map((g) => (
            <div key={g.title} className="rounded-lg border border-[var(--ink)]/10 p-4">
              <p className="u-font-display text-sm font-semibold text-[#0EBE15]">
                {g.title}
              </p>
              <ul className="mt-2 space-y-1.5">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2 text-xs text-[var(--ink)]/75">
                    <Check size={12} className="mt-0.5 shrink-0 text-[#0EBE15]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--ink)]/70">
          <b className="text-[var(--ink)]">Natija:</b> birinchi real
          foydalanuvchilar foydalanishi mumkin bo'lgan USTUVON MVP.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <p className="text-sm text-[var(--ink)]/60">
        MVP muvaffaqiyatli testdan o'tgach, platforma real bozorda ishga
        tushiriladi.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Chip active>Dastlab: O'zbekiston</Chip>
        <span className="u-font-mono text-sm text-[#0EBE15]">→</span>
        {EXPANSION_AFTER_UZ.map((e, i) => (
          <span key={e} className="flex items-center gap-2">
            <Chip>{e}</Chip>
            {i < EXPANSION_AFTER_UZ.length - 1 && (
              <span className="u-font-mono text-sm text-[#0EBE15]">→</span>
            )}
          </span>
        ))}
      </div>
      <div>
        <Eyebrow>Platformaning asosiy tillari</Eyebrow>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {LANGUAGES.map((l) => (
            <span
              key={l.code}
              className="rounded-md bg-[var(--ink)] px-2 py-1 u-font-mono text-xs font-semibold text-white"
            >
              {l.code} · {l.name}
            </span>
          ))}
          <span className="text-xs text-[var(--ink)]/55">
            Keyinchalik yangi tillar qo'shiladi.
          </span>
        </div>
      </div>
    </div>
  );
}

export function RoadmapSection() {
  const s = useStepper<HTMLDivElement>(STAGES.length, 6000);
  return (
    <Section id="yol-xaritasi" tone="tint">
      <SectionHead
        no="06"
        eyebrow="Yo'l xaritasi"
        title="G'oyadan bozorga: to'rt bosqich"
      />
      <div ref={s.ref}>
        <div className="mb-4 flex justify-end">
          <ResumeButton manual={s.manual} onResume={s.resume} />
        </div>

        <div className="relative">
          <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-[var(--ink)]/10">
            <div
              className="h-full bg-[#0EBE15] transition-all duration-700"
              style={{ width: `${(s.index / (STAGES.length - 1)) * 100}%` }}
            />
          </div>
          <div className="relative grid grid-cols-4">
            {STAGES.map((st, i) => {
              const active = i === s.index;
              const done = i < s.index;
              return (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => s.select(i)}
                  className="flex flex-col items-center px-1 text-center"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 u-font-mono text-sm font-semibold transition-all ${
                      active
                        ? "scale-110 border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)] shadow-lg shadow-[#0EBE15]/30"
                        : done
                          ? "border-[#0EBE15] bg-white text-[#0EBE15]"
                          : "border-[var(--ink)]/20 bg-white text-[var(--ink)]/40"
                    }`}
                  >
                    {done ? <Check size={16} /> : st.no}
                  </span>
                  <span
                    className={`mt-2 u-font-mono text-[10px] font-semibold tracking-wide sm:text-xs ${
                      active ? "text-[var(--ink)]" : "text-[var(--ink)]/45"
                    }`}
                  >
                    {st.name}
                  </span>
                  <span className="mt-0.5 hidden text-xs text-[var(--ink)]/50 sm:block">
                    {st.goal}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
          <div className="relative mb-5 flex items-center gap-3 pb-4">
            <span className="rounded-md bg-[var(--ink)] px-2 py-1 u-font-mono text-xs font-semibold text-white">
              {s.index + 1}-BOSQICH
            </span>
            <p className="u-font-display text-lg font-bold text-[var(--ink)]">
              {STAGES[s.index].name}
            </p>
            <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--ink)]/10" />
            <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
          </div>
          <div key={s.index} className="demo-fade min-h-[14rem]">
            <StageDetail index={s.index} />
          </div>
        </div>
      </div>
    </Section>
  );
}
