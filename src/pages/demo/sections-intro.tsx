import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Reveal } from "../landing/reveal";
import {
  ADMIN_FLOW,
  AI_PIPELINE,
  CHAIN,
  DIRECTIONS,
  EXAM_ENV,
  EXAM_FORMATS,
  FACTS,
  FRAGMENTS,
  JOURNEY,
  LANGUAGES,
  MARKET_PATH,
  PROBLEMS,
  TOPIC_SCORES,
} from "./demo-data";
import { useCountUp, useInView, useStepper, scrollToSection } from "./demo-hooks";
import {
  Card,
  Chip,
  CertificateCard,
  Eyebrow,
  ResumeButton,
  Section,
  SectionHead,
  StepProgress,
  TopicBars,
} from "./demo-ui";

/* ================================================================== */
/* 00 — Hero                                                           */
/* ================================================================== */

function ChainCard() {
  const s = useStepper<HTMLDivElement>(CHAIN.length, 1800);
  return (
    <div ref={s.ref} className="relative mx-auto w-full max-w-sm">
      <div className="absolute -top-4 right-6 z-10 flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 u-font-mono text-xs font-medium text-white shadow-lg">
        <Sparkles size={12} />
        {String(s.index + 1).padStart(2, "0")} / {String(CHAIN.length).padStart(2, "0")}
      </div>

      <div className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
          USTUVON zanjiri
        </p>
        <div className="mt-4 space-y-2">
          {CHAIN.map((item, i) => {
            const active = i === s.index;
            const done = i < s.index;
            return (
              <button
                key={item}
                type="button"
                onClick={() => s.select(i)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "border-[#0EBE15] bg-[#0EBE15]/10 text-[#0EBE15]"
                    : "border-[var(--ink)]/10 text-[var(--ink)]/70 hover:border-[var(--ink)]/25"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors ${
                    active
                      ? "demo-pop border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)]"
                      : done
                        ? "border-[#0EBE15]/50 text-[#0EBE15]"
                        : "border-[var(--ink)]/25 text-[var(--ink)]/40"
                  }`}
                >
                  {done ? <Check size={11} /> : i + 1}
                </span>
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute -bottom-8 -left-8 hidden w-44 rounded-xl border border-[var(--ink)]/10 bg-white p-4 shadow-xl shadow-[var(--ink)]/10 sm:block">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--ink)]/40">
          Tillar
        </p>
        <div className="mt-2 flex gap-1.5">
          {LANGUAGES.map((l) => (
            <span
              key={l.code}
              className="rounded-md bg-[var(--ink)] px-1.5 py-0.5 u-font-mono text-xs font-semibold text-white"
            >
              {l.code}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-[var(--ink)]/50">
          Keyinchalik yangi tillar
        </p>
      </div>
    </div>
  );
}

export function DemoHero() {
  return (
    <section className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-14 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#0EBE15]/20 bg-[#0EBE15]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
            {DIRECTIONS.join(" · ")}
          </span>

          <h1 className="mt-5 u-font-display text-4xl font-bold leading-[1.08] tracking-tight text-[var(--ink)] md:text-5xl">
            Global raqamli ta'lim va{" "}
            <span className="text-[#0EBE15]">professional baholash</span>{" "}
            platformasi
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--ink)]/65">
            USTUVON — online ta'lim, professional test, AI asosidagi test
            yaratish, real imtihon simulyatsiyasi, natijalarni tahlil qilish
            va sertifikatlashni yagona platformaga birlashtiruvchi global
            EdTech tizim.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("muammo")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0EBE15] px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm shadow-[var(--brand)]/25 transition-colors hover:bg-[#03ba09] hover:text-white"
            >
              Taqdimotni boshlash <ArrowRight size={16} />
            </button>
            <Link
              to="/login"
              className="rounded-lg border border-[var(--ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]/30"
            >
              Platformaga kirish
            </Link>
          </div>

          <div className="mt-10 border-t border-[var(--ink)]/10 pt-6">
            <Eyebrow>Maqsadli bozor</Eyebrow>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {MARKET_PATH.map((m, i) => (
                <span key={m} className="flex items-center gap-2">
                  <Chip active={i === 0}>{m}</Chip>
                  {i < MARKET_PATH.length - 1 && (
                    <span aria-hidden className="u-font-mono text-sm text-[#0EBE15]">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ChainCard />
      </div>
    </section>
  );
}

function FactItem({
  value,
  label,
  note,
  start,
}: {
  value: number;
  label: string;
  note: string;
  start: boolean;
}) {
  const v = useCountUp(value, start);
  return (
    <div className="text-center md:text-left">
      <p className="u-font-mono text-4xl font-semibold text-[var(--ink)]">{v}</p>
      <p className="mt-1 text-sm font-medium text-[var(--ink)]/85">{label}</p>
      <p className="text-xs text-[var(--ink)]/60">{note}</p>
    </div>
  );
}

export function FactsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4, true);
  return (
    <section className="bg-[#0EBE15]/50 py-14">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-8"
      >
        {FACTS.map((f) => (
          <FactItem key={f.label} {...f} start={inView} />
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 01 — Muammo                                                         */
/* ================================================================== */

function FragmentDemo() {
  const [joined, setJoined] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.5, true);

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setJoined(true), 1400);
    return () => window.clearTimeout(id);
  }, [inView]);

  return (
    <div ref={ref} className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
      <div className="flex rounded-lg bg-[var(--ink)]/5 p-1 text-xs font-semibold">
        {[
          { label: "Hozirgi holat", value: false },
          { label: "Ustuvon bilan", value: true },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => setJoined(o.value)}
            className={`flex-1 rounded-md px-3 py-2 transition-colors ${
              joined === o.value
                ? o.value
                  ? "bg-[#0EBE15] text-[var(--ink)] shadow-sm"
                  : "bg-white text-[var(--ink)] shadow-sm"
                : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center">
        {FRAGMENTS.map((f, i) => (
          <div key={f} className="flex w-full flex-col items-center">
            <div
              className={`w-full max-w-[15rem] rounded-lg border px-4 py-2.5 text-center text-sm font-semibold transition-all duration-700 ${
                joined
                  ? "translate-x-0 border-[#0EBE15] bg-[#0EBE15]/10 text-[#0EBE15]"
                  : `${i % 2 ? "translate-x-5" : "-translate-x-5"} border-[var(--ink)]/10 bg-white text-[var(--ink)]/60`
              }`}
            >
              {f}
            </div>
            {i < FRAGMENTS.length - 1 && (
              <div className="relative h-7 w-0.5">
                <span
                  className={`absolute inset-0 transition-all duration-700 ${
                    joined
                      ? "bg-[#0EBE15]"
                      : "border-l-2 border-dashed border-[var(--ink)]/20"
                  }`}
                />
                {joined && (
                  <span className="demo-travel absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#0EBE15]" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-sm text-[var(--ink)]/60">
        {joined
          ? "Barchasi yagona tizimda birlashadi."
          : "Har biri alohida, uzilgan jarayon."}
      </p>
    </div>
  );
}

export function ProblemSection() {
  return (
    <Section id="muammo">
      <SectionHead
        no="01"
        eyebrow="Muammo"
        title="Bilim olish, tekshirish va baholash bir-biridan uzilgan"
        intro="Online ta'lim bozori tez rivojlanayotgan bo'lsa-da, ta'lim olish, bilimni tekshirish va natijani baholash jarayonlari ko'plab platformalarda bir-biridan ajratilgan."
      />
      <div className="grid items-start gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="grid grid-cols-1 border-b border-l border-[var(--ink)]/10 sm:grid-cols-2">
            {PROBLEMS.map((p, i) => (
              <div
                key={p.title}
                className="group border-r border-t border-[var(--ink)]/10 bg-white/60 p-5 transition-colors hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="u-font-mono text-xs font-semibold text-[#0EBE15]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <X
                    size={16}
                    className="text-[var(--ink)]/20 transition-colors group-hover:text-[#D9480F]"
                  />
                </div>
                <p className="mt-2 u-font-display text-base font-semibold text-[var(--ink)]">
                  {p.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/60">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-2">
          <FragmentDemo />
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================== */
/* 02 — Yechim                                                         */
/* ================================================================== */

function PanelCatalog() {
  const rows = [
    { name: "Milliy Sertifikat — Matematika", note: "Rasmiy format" },
    { name: "IELTS", note: "Xalqaro til sertifikati" },
    { name: "DTM", note: "Davlat test markazi formatida" },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div
          key={r.name}
          className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
            i === 0
              ? "border-[#0EBE15] bg-[#0EBE15]/10"
              : "border-[var(--ink)]/10"
          }`}
        >
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">{r.name}</p>
            <p className="text-xs text-[var(--ink)]/55">{r.note}</p>
          </div>
          {i === 0 && (
            <span className="demo-pop rounded-md bg-[#0EBE15] px-3 py-1.5 text-xs font-semibold text-[var(--ink)]">
              Boshlash
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function PanelExam() {
  const [selected, setSelected] = useState("B");
  const [seconds, setSeconds] = useState(14 * 60 + 32);
  useEffect(() => {
    const id = window.setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const options = [
    { letter: "A", text: "3" },
    { letter: "B", text: "5" },
    { letter: "C", text: "7" },
    { letter: "D", text: "10" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <Chip active>1-bo'lim · Algebra</Chip>
          <Chip>2-bo'lim</Chip>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 u-font-mono text-xs font-medium text-white">
          <Clock size={12} />
          {mm}:{ss}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--ink)]">
        17-savol. Agar 3x + 5 = 20 bo'lsa, x ning qiymati nechaga teng?
      </p>
      <div className="mt-3 space-y-2">
        {options.map((o) => {
          const on = selected === o.letter;
          return (
            <button
              key={o.letter}
              type="button"
              onClick={() => setSelected(o.letter)}
              className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                on
                  ? "border-[#0EBE15] bg-[#0EBE15]/10 text-[#0EBE15]"
                  : "border-[var(--ink)]/10 text-[var(--ink)]/70 hover:border-[var(--ink)]/25"
              }`}
            >
              <span
                key={on ? "on" : "off"}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                  on
                    ? "demo-pop border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)]"
                    : "border-[var(--ink)]/25 text-[var(--ink)]/40"
                }`}
              >
                {o.letter}
              </span>
              {o.text}
            </button>
          );
        })}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--ink)]/50">
        <Check size={12} className="text-[#0EBE15]" /> Javob avtomatik saqlandi
        · 17 / 30
      </p>
    </div>
  );
}

function PanelResult() {
  return (
    <div className="flex flex-col items-center gap-5 py-2 sm:flex-row sm:gap-8">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#101826" strokeOpacity="0.08" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#1E8E5A"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${0.87 * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
            className="demo-ring"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="u-font-mono text-3xl font-semibold text-[var(--success)]">87%</p>
          <p className="text-[11px] text-[var(--ink)]/50">26 / 30</p>
        </div>
      </div>
      <div>
        <Eyebrow>Natija</Eyebrow>
        <p className="mt-1 u-font-display text-xl font-bold text-[var(--ink)]">
          Test tugashi bilan natija shu zahoti hisoblanadi
        </p>
        <p className="mt-2 text-sm text-[var(--ink)]/60">
          26 / 30 to'g'ri javob · avtomatik hisoblash va saqlash
        </p>
      </div>
    </div>
  );
}

function PanelMistakes() {
  const rows = [
    { q: "9-savol", ok: false, yours: "C", right: "B" },
    { q: "14-savol", ok: true },
    { q: "21-savol", ok: false, yours: "A", right: "D" },
    { q: "22-savol", ok: true },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.q}
          className="flex items-center justify-between rounded-lg border border-[var(--ink)]/10 px-4 py-2.5 text-sm"
        >
          <span className="flex items-center gap-2 font-medium text-[var(--ink)]">
            {r.ok ? (
              <Check size={15} className="text-[#0EBE15]" />
            ) : (
              <X size={15} className="text-[#D9480F]" />
            )}
            {r.q}
          </span>
          {r.ok ? (
            <span className="text-xs text-[var(--ink)]/50">To'g'ri</span>
          ) : (
            <span className="u-font-mono text-xs text-[var(--ink)]/70">
              Sizniki: {r.yours} · To'g'ri:{" "}
              <b className="text-[#0EBE15]">{r.right}</b>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function PanelAnalysis() {
  return (
    <div>
      <Eyebrow>Matematika testi</Eyebrow>
      <div className="mt-4">
        <TopicBars scores={TOPIC_SCORES} />
      </div>
    </div>
  );
}

function PanelPlan() {
  const tasks = [
    "Ehtimollik bo'yicha darslarni o'rganish",
    "Ehtimollik testlarini qayta ishlash",
    "Qayta test topshirish",
  ];
  return (
    <div>
      <Eyebrow>Rivojlanish yo'nalishi</Eyebrow>
      <div className="mt-3 space-y-2.5">
        {tasks.map((t, i) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-lg border border-[var(--ink)]/10 px-4 py-3 text-sm text-[var(--ink)]"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--ink)]/25 u-font-mono text-[11px] text-[var(--ink)]/50">
              {i + 1}
            </span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyPanel({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <PanelCatalog />;
    case 1:
      return <PanelExam />;
    case 2:
      return <PanelResult />;
    case 3:
      return <PanelMistakes />;
    case 4:
      return <PanelAnalysis />;
    case 5:
      return <PanelPlan />;
    default:
      return (
        <div className="mx-auto max-w-sm">
          <CertificateCard verified />
        </div>
      );
  }
}

function Journey() {
  const s = useStepper<HTMLDivElement>(JOURNEY.length, 5000);
  return (
    <div ref={s.ref} className="grid items-start gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <Eyebrow>Foydalanuvchi yo'li</Eyebrow>
          <ResumeButton manual={s.manual} onResume={s.resume} />
        </div>
        <div className="space-y-1.5">
          {JOURNEY.map((label, i) => {
            const active = i === s.index;
            return (
              <button
                key={label}
                type="button"
                onClick={() => s.select(i)}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  active
                    ? "border-[#0EBE15] bg-[#0EBE15]/10 text-[var(--ink)]"
                    : "border-[var(--ink)]/10 bg-white/60 text-[var(--ink)]/65 hover:border-[var(--ink)]/25"
                }`}
              >
                <span
                  className={`u-font-mono text-xs font-semibold ${
                    active ? "text-[#0EBE15]" : "text-[var(--ink)]/35"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
                {active && (
                  <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="min-h-[24rem] rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
          <div className="mb-5 flex items-center justify-between border-b border-[var(--ink)]/10 pb-4">
            <p className="u-font-display text-base font-semibold text-[var(--ink)]">
              {JOURNEY[s.index]}
            </p>
            <span className="rounded-full bg-[var(--ink)]/5 px-2.5 py-1 u-font-mono text-[11px] font-medium text-[var(--ink)]/50">
              namuna · {s.index + 1}/{JOURNEY.length}
            </span>
          </div>
          <div key={s.index} className="demo-fade">
            <JourneyPanel step={s.index} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SolutionSection() {
  return (
    <Section id="yechim" tone="tint">
      <SectionHead
        no="02"
        eyebrow="Yechim"
        title="Bitta platforma: o'rganish, baholash va sertifikat"
        intro="Platformaning dastlabki asosiy yo'nalishi — professional test va real imtihon muhiti. Foydalanuvchi shunday yo'l bosib o'tadi:"
      />
      <Journey />

      <Reveal className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
          Real imtihon muhiti
        </p>
        <h3 className="mt-2 u-font-display text-2xl font-bold text-[var(--ink)]">
          USTUVON oddiy test platformasi emas
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink)]/60">
          Imtihon turiga qarab quyidagi imkoniyatlar yaratiladi:
        </p>
        <div className="mt-6 grid grid-cols-1 border-b border-l border-[var(--ink)]/10 bg-white/60 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_ENV.map((e) => (
            <div
              key={e.label}
              className="flex items-start gap-3 border-r border-t border-[var(--ink)]/10 p-5"
            >
              <e.icon size={20} className="mt-0.5 shrink-0 text-[#0EBE15]" />
              <p className="text-sm font-medium leading-snug text-[var(--ink)]">
                {e.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-[var(--ink)]/20 px-5 py-4">
          <ShieldCheck size={20} className="shrink-0 text-[var(--brand)]" />
          <p className="text-sm text-[var(--ink)]/75">
            <span className="mr-2 rounded-full bg-[var(--brand)]/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)]">
              Kelajakda
            </span>
            Anti-cheating va proctoring texnologiyalari qo'shiladi.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ================================================================== */
/* 03 — AI Test Generator                                              */
/* ================================================================== */

const JSON_ROWS: [string, string][] = [
  ["exam", '"Milliy Sertifikat"'],
  ["section", '"Matematika"'],
  ["question", '"Agar 3x + 5 = 20 bo\'lsa, x = ?"'],
  ["options", '["3", "5", "7", "10"]'],
  ["answer", '"B"'],
  ["status", '"admin_review"'],
];

function SourceDoc({ step }: { step: number }) {
  const textVisible = step >= 2;
  const scanning = step === 1 || step === 2;
  const hl = (on: boolean) =>
    on
      ? "rounded bg-[#0EBE15]/15 text-[var(--ink)] ring-1 ring-[#0EBE15]/40"
      : "";
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-[var(--ink)]">
        <FileText size={16} className="text-[var(--brand)]" />
        matematika_test.pdf
        {step === 0 && (
          <span className="demo-pop ml-auto flex gap-1">
            {["PDF", "DOCX", "XLSX", "TXT"].map((f) => (
              <span
                key={f}
                className="rounded bg-[var(--ink)]/5 px-1.5 py-0.5 u-font-mono text-[10px] font-semibold text-[var(--ink)]/60"
              >
                {f}
              </span>
            ))}
          </span>
        )}
      </div>

      <div className="relative mt-4 overflow-hidden rounded-lg border border-[var(--ink)]/10 bg-[var(--paper)] p-4">
        {scanning && (
          <span className="demo-scan absolute inset-x-0 z-10 h-0.5 bg-[#0EBE15] shadow-[0_0_12px_#0EBE15]" />
        )}
        {textVisible ? (
          <div className="demo-fade space-y-2 text-sm leading-relaxed text-[var(--ink)]/80">
            {step === 3 && (
              <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--brand)]">
                <Sparkles size={12} /> AI mazmunni tahlil qilmoqda…
              </p>
            )}
            <p className={`px-1 py-0.5 transition-all ${hl(step === 4)}`}>
              17-savol. Agar 3x + 5 = 20 bo'lsa, x ning qiymati nechaga teng?
              {step === 4 && (
                <b className="ml-2 text-[11px] text-[#0EBE15]">← Savol</b>
              )}
            </p>
            <div className="grid grid-cols-2 gap-x-6 px-1">
              <span>A) 3</span>
              <span className={`${hl(step === 5)}`}>
                B) 5
                {step === 5 && (
                  <b className="ml-2 text-[11px] text-[#0EBE15]">← To'g'ri</b>
                )}
              </span>
              <span>C) 7</span>
              <span>D) 10</span>
            </div>
            {step === 6 && (
              <p className="demo-pop inline-block rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                Format: Milliy Sertifikat · 4 variantli test
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2.5 py-1">
            {[90, 70, 55, 80, 40].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-[var(--ink)]/10"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-[var(--ink)]/50">
        {step === 0 && "Fayl yuklandi."}
        {step === 1 && "Hujjat tuzilmasi qayta ishlanmoqda."}
        {step === 2 && "Matn ajratib olindi."}
        {step === 3 && "Savollar tahlil qilinmoqda."}
        {step === 4 && "Savollar aniqlandi."}
        {step === 5 && "To'g'ri javoblar aniqlandi."}
        {step === 6 && "Imtihon formati aniqlandi."}
      </p>
    </div>
  );
}

function AiPreview({ step }: { step: number }) {
  if (step <= 6) return <SourceDoc step={step} />;

  if (step === 7) {
    return (
      <div className="demo-fade">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
          Structured JSON
        </p>
        <div className="rounded-lg border border-[var(--ink)]/10 bg-[var(--paper)] p-4 u-font-mono text-[13px] leading-7">
          <span className="text-[var(--ink)]/40">{"{"}</span>
          {JSON_ROWS.map(([k, v]) => (
            <div key={k} className="pl-4">
              <span className="text-[var(--brand)]">"{k}"</span>
              <span className="text-[var(--ink)]/40">: </span>
              <span className="text-[var(--success)]">{v}</span>
              <span className="text-[var(--ink)]/40">,</span>
            </div>
          ))}
          <span className="text-[var(--ink)]/40">{"}"}</span>
        </div>
      </div>
    );
  }

  if (step === 8) {
    return (
      <div className="demo-fade">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
          Admin Review
        </p>
        <div className="rounded-lg border border-[var(--ink)]/10 p-4">
          <p className="text-sm font-medium text-[var(--ink)]">
            17-savol. Agar 3x + 5 = 20 bo'lsa, x ning qiymati nechaga teng?
          </p>
          <p className="mt-2 text-xs text-[var(--ink)]/55">
            To'g'ri javob: B) 5 · Format: Milliy Sertifikat
          </p>
          <div className="mt-4 flex gap-2">
            <span className="rounded-md bg-[#0EBE15] px-4 py-2 text-xs font-semibold text-[var(--ink)]">
              Tasdiqlash
            </span>
            <span className="rounded-md border border-[var(--ink)]/15 px-4 py-2 text-xs font-semibold text-[var(--ink)]/70">
              Tahrirlash
            </span>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-[var(--ink)]/55">
          <ShieldCheck size={13} className="text-[#0EBE15]" />
          Tasdiqlanmaguncha foydalanuvchilarga chiqmaydi.
        </p>
      </div>
    );
  }

  return (
    <div className="demo-fade flex flex-col items-center py-10 text-center">
      <span className="demo-pop flex h-14 w-14 items-center justify-center rounded-full bg-[#0EBE15] text-[var(--ink)]">
        <Check size={28} />
      </span>
      <p className="mt-4 u-font-display text-xl font-bold text-[var(--ink)]">
        Test nashr etildi
      </p>
      <p className="mt-1 text-sm text-[var(--ink)]/60">
        Tayyor test foydalanuvchilarga taqdim etiladi.
      </p>
    </div>
  );
}

export function AiGeneratorSection() {
  const s = useStepper<HTMLDivElement>(AI_PIPELINE.length, 2600);
  return (
    <Section id="ai-generator">
      <SectionHead
        no="03"
        eyebrow="AI Test Generator"
        title="Fayldan tayyor imtihongacha — daqiqalarda"
        intro="Mavjud test bazalarini tezlik bilan raqamlashtirish va turli imtihon formatlariga moslashtirish — USTUVONning asosiy texnologik ustunliklaridan biri."
      />

      <div ref={s.ref} className="grid items-start gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <Eyebrow>10 bosqichli pipeline</Eyebrow>
            <ResumeButton manual={s.manual} onResume={s.resume} />
          </div>
          <ol className="space-y-1">
            {AI_PIPELINE.map((p, i) => {
              const active = i === s.index;
              const done = i < s.index;
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    onClick={() => s.select(i)}
                    className={`relative flex w-full items-center gap-3 overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors ${
                      active
                        ? "border-[#0EBE15] bg-[#0EBE15]/10"
                        : "border-transparent hover:bg-[var(--ink)]/5"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border u-font-mono text-[11px] font-semibold ${
                        active
                          ? "border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)]"
                          : done
                            ? "border-[#0EBE15]/50 text-[#0EBE15]"
                            : "border-[var(--ink)]/20 text-[var(--ink)]/40"
                      }`}
                    >
                      {done ? <Check size={12} /> : i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[var(--ink)]">
                        {p.title}
                      </span>
                      {active && (
                        <span className="block text-xs text-[var(--ink)]/55">
                          {p.sub}
                        </span>
                      )}
                    </span>
                    {active && (
                      <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="lg:col-span-3">
          <div className="min-h-[22rem] rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
            <AiPreview step={s.index} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <Eyebrow>Administrator jarayoni</Eyebrow>
            <ol className="mt-4 space-y-3">
              {ADMIN_FLOW.map((t, i) => (
                <li key={t} className="flex gap-3 text-sm text-[var(--ink)]/75">
                  <span className="u-font-mono text-xs font-semibold text-[#0EBE15]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        <Reveal className="space-y-6">
          <div className="rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-5">
            <p className="flex items-center gap-2 u-font-display text-base font-semibold text-[var(--ink)]">
              <ShieldCheck size={18} className="text-[#0EBE15]" />
              Muhim jihat
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">
              AI yaratgan test <b>to'g'ridan-to'g'ri foydalanuvchiga
              chiqarilmaydi</b>. Avval administrator yoki vakolatli mutaxassis
              tekshiradi. Bu noto'g'ri savol yoki javoblar xavfini kamaytiradi.
            </p>
          </div>
          <Card>
            <Eyebrow>Kelajak: har bir imtihon uchun alohida format va qoidalar</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAM_FORMATS.map((f) => (
                <Chip key={f}>{f}</Chip>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
