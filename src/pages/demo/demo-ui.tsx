import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Check, Play } from "lucide-react";
import { Reveal } from "../landing/reveal";

/* ------------------------------------------------------------------ */
/* Bo'lim qobig'i                                                      */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  tone = "paper",
  children,
}: {
  id: string;
  tone?: "paper" | "tint" | "white";
  children: ReactNode;
}) {
  const bg =
    tone === "tint" ? "bg-[#0EBE15]/5" : tone === "white" ? "bg-white" : "";
  return (
    <section id={id} className={`relative scroll-mt-[6.75rem] overflow-x-clip ${bg}`}>
      <div className="mx-auto flex min-h-[calc(100svh-6.75rem)] max-w-6xl flex-col justify-center px-4 py-16 md:px-8 md:py-20">
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  no,
  eyebrow,
  title,
  intro,
}: {
  no: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="relative mb-10">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 right-0 select-none u-font-display text-[7rem] font-bold leading-none text-[var(--ink)]/[0.04] md:text-[11rem]"
      >
        {no}
      </span>
      <Reveal className="relative max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-[var(--ink)] px-2 py-1 u-font-mono text-xs font-semibold text-white">
            {no}
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
            {eyebrow}
          </p>
        </div>
        <h2 className="mt-3 u-font-display text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] md:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink)]/65">
            {intro}
          </p>
        )}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kichik elementlar                                                   */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--ink)]/10 bg-white p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
      {children}
    </p>
  );
}

export function Chip({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-[#0EBE15] bg-[#0EBE15]/10 text-[#0EBE15]"
          : "border-[var(--ink)]/10 bg-white text-[var(--ink)]/70"
      }`}
    >
      {children}
    </span>
  );
}

export function Arrow() {
  return (
    <span aria-hidden className="u-font-mono text-sm text-[#0EBE15]">
      →
    </span>
  );
}

/** Zanjir: A → B → C */
export function FlowChain({
  items,
  activeIndex,
  className = "",
}: {
  items: string[];
  activeIndex?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-2 ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          <Chip active={activeIndex === undefined ? i === 0 : i === activeIndex}>
            {item}
          </Chip>
          {i < items.length - 1 && <Arrow />}
        </span>
      ))}
    </div>
  );
}

/** Avtomatik rejimni qayta yoqish tugmasi (qo'lda boshqarilganda ko'rinadi) */
export function ResumeButton({
  manual,
  onResume,
}: {
  manual: boolean;
  onResume: () => void;
}) {
  if (!manual) return null;
  return (
    <button
      type="button"
      onClick={onResume}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--ink)]/15 px-3 py-1 text-xs font-semibold text-[var(--ink)]/70 transition-colors hover:border-[#0EBE15] hover:text-[#0EBE15]"
    >
      <Play size={11} /> Avtomatik rejim
    </button>
  );
}

/** Faol bosqich ostidagi progress chizig'i */
export function StepProgress({
  running,
  interval,
  stepKey,
}: {
  running: boolean;
  interval: number;
  stepKey: number;
}) {
  if (!running) return null;
  return (
    <span
      key={stepKey}
      aria-hidden
      className="demo-progress absolute inset-x-0 bottom-0 h-0.5 bg-[#0EBE15]"
      style={{ "--demo-dur": `${interval}ms` } as CSSProperties}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Mavzular bo'yicha natija chiziqlari                                 */
/* ------------------------------------------------------------------ */

export function TopicBars({
  scores,
  start = true,
}: {
  scores: { topic: string; value: number }[];
  start?: boolean;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!start) return;
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, [start]);

  return (
    <div className="space-y-4">
      {scores.map((s) => {
        const weak = s.value < 50;
        return (
          <div key={s.topic}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium text-[var(--ink)]">{s.topic}</span>
              <span
                className={`u-font-mono font-semibold ${
                  weak ? "text-[#D9480F]" : "text-[var(--ink)]"
                }`}
              >
                {s.value}%
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--ink)]/8">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  weak ? "bg-[#D9480F]" : "bg-[#0EBE15]"
                }`}
                style={{ width: on ? `${s.value}%` : "0%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* QR-ga o'xshash naqsh (namuna) va sertifikat                         */
/* ------------------------------------------------------------------ */

export function QrPattern({ size = 21 }: { size?: number }) {
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    cells.push(seed % 100 < 48);
  }
  const finder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) =>
      x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
    const boxes: [number, number][] = [
      [0, 0],
      [size - 7, 0],
      [0, size - 7],
    ];
    for (const [ox, oy] of boxes) {
      if (inBox(ox, oy)) {
        const dx = x - ox;
        const dy = y - oy;
        const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
        return edge || core ? true : false;
      }
    }
    return null;
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
      {cells.map((on, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        const f = finder(x, y);
        const fill = f === null ? on : f;
        return fill ? (
          <rect key={i} x={x} y={y} width="1.02" height="1.02" fill="#101826" />
        ) : null;
      })}
    </svg>
  );
}

export function CertificateCard({ verified }: { verified?: boolean }) {
  return (
    <div className="relative rounded-xl border border-[var(--ink)]/10 bg-white p-5 shadow-lg shadow-[var(--ink)]/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0EBE15] u-font-display text-[11px] font-bold text-[var(--ink)]">
            U
          </span>
          <span className="u-font-display text-sm font-semibold text-[var(--ink)]">
            Ustuvon
          </span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--ink)]/40">
          Sertifikat · namuna
        </span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-[var(--ink)]/40">
            Foydalanuvchi ismi
          </p>
          <p className="u-font-display text-xl font-bold text-[var(--ink)]">
            Ism Familiya
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-wide text-[var(--ink)]/40">
            Kurs / imtihon nomi
          </p>
          <p className="text-sm font-medium text-[var(--ink)]">
            Milliy Sertifikat · Matematika
          </p>
          <div className="mt-3 flex gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--ink)]/40">
                Natija
              </p>
              <p className="u-font-mono text-sm font-semibold text-[var(--success)]">
                87%
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-[var(--ink)]/40">
                Berilgan sana
              </p>
              <p className="u-font-mono text-sm font-semibold text-[var(--ink)]">
                01.01.2026
              </p>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <div className="h-20 w-20 rounded-md border border-[var(--ink)]/10 p-1.5">
            <QrPattern />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--ink)]/10 pt-3">
        <p className="u-font-mono text-[11px] text-[var(--ink)]/50">
          ID: UST-XXXX-XXXX
        </p>
        {verified && (
          <span className="demo-pop inline-flex items-center gap-1 rounded-full bg-[#0EBE15]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0EBE15]">
            <Check size={12} /> Haqiqiy
          </span>
        )}
      </div>
    </div>
  );
}
