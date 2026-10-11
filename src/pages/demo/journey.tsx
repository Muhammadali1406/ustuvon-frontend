import { useEffect, useState } from "react";
import { Check, Clock, X } from "lucide-react";
import { JOURNEY, TOPIC_SCORES } from "./demo-data";
import { useStepper } from "./demo-hooks";
import { CertificateCard, Chip, Eyebrow, ResumeButton, StepProgress, TopicBars } from "./demo-ui";

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

export function Journey() {
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
