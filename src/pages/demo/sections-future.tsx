import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, QrCode, Repeat } from "lucide-react";
import { Reveal } from "../landing/reveal";
import {
  ADVANTAGE,
  AI_RECOMMENDATION,
  CERT_FIELDS,
  COURSE_STRUCTURE,
  DUBBING,
  ECOSYSTEM,
  EXPANSION,
  GLOBAL_CAPS,
  LEARNING_LOOP,
  PEDAGOGY,
  TOPIC_SCORES,
} from "./demo-data";
import { useInView, useStepper } from "./demo-hooks";
import {
  Arrow,
  Card,
  CertificateCard,
  Chip,
  Eyebrow,
  ResumeButton,
  Section,
  SectionHead,
  TopicBars,
} from "./demo-ui";

/* ================================================================== */
/* 07 — Kurslar va AI                                                  */
/* ================================================================== */

function DubbingCard() {
  const heights = [40, 75, 55, 90, 45, 80, 60, 95, 50, 70, 35, 85];
  return (
    <Card>
      <Eyebrow>Ko'p tilli ta'lim</Eyebrow>
      <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
        Kurs kontenti bir marta professional ssenariy asosida tayyorlanadi va
        boshqa tillarga <b>professional dublyaj</b> orqali moslashtiriladi.
      </p>
      <div className="mt-4 rounded-lg border border-[#0EBE15]/40 bg-[#0EBE15]/10 px-4 py-2.5 text-center text-sm font-semibold text-[var(--ink)]">
        Original kurs
      </div>
      <div className="mx-auto h-4 w-px bg-[#0EBE15]" />
      <div className="grid grid-cols-3 gap-2">
        {DUBBING.map((d, i) => (
          <div
            key={d.code}
            className="rounded-lg border border-[var(--ink)]/10 p-3 text-center"
          >
            <span className="rounded-md bg-[var(--ink)] px-1.5 py-0.5 u-font-mono text-xs font-semibold text-white">
              {d.code}
            </span>
            <div className="mt-3 flex h-8 items-center justify-center gap-0.5">
              {heights.slice(i * 2, i * 2 + 7).map((h, j) => (
                <span
                  key={j}
                  className="demo-wave w-0.5 rounded-full bg-[#0EBE15]"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${j * 90 + i * 150}ms`,
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-tight text-[var(--ink)]/60">
              {d.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function LearnSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4, true);
  const loop = useStepper<HTMLDivElement>(LEARNING_LOOP.length, 1500);

  return (
    <Section id="kurslar-ai" tone="white">
      <SectionHead
        no="07"
        eyebrow="Kengayish"
        title="Testdan ekotizimga: kurslar, til va AI"
        intro="Test platformasi barqaror ishlagach, online ta'lim qismi qo'shiladi. Keyingi bosqichda AI foydalanuvchi natijalarini tahlil qilib, individual tavsiyalar beradi."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <Card>
              <Eyebrow>Online kurslar</Eyebrow>
              <p className="mt-3 text-sm text-[var(--ink)]/70">
                Har bir kurs oldindan ishlab chiqilgan <b>maxsus ta'lim
                ssenariysi</b> asosida tayyorlanadi.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {COURSE_STRUCTURE.map((c, i) => (
                  <span key={c} className="flex items-center gap-2">
                    <Chip active={i === 0 || i === COURSE_STRUCTURE.length - 1}>
                      {c}
                    </Chip>
                    {i < COURSE_STRUCTURE.length - 1 && <Arrow />}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-t border-[var(--ink)]/10 pt-4">
                <Eyebrow>Pedagogik metodika</Eyebrow>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {PEDAGOGY.map((p, i) => (
                    <span key={p} className="flex items-center gap-2">
                      <Chip>{p}</Chip>
                      {i < PEDAGOGY.length - 1 && <Arrow />}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal>
            <DubbingCard />
          </Reveal>
        </div>

        <Reveal>
          <div
            ref={ref}
            className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5"
          >
            <Eyebrow>AI Learning System</Eyebrow>
            <p className="mt-3 u-font-display text-lg font-semibold text-[var(--ink)]">
              Matematika testi — natija
            </p>
            <div className="mt-4">
              <TopicBars scores={TOPIC_SCORES} start={inView} />
            </div>

            <div className="mt-6 rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
                AI tavsiyasi
              </p>
              <p className="mt-1.5 text-sm italic leading-relaxed text-[var(--ink)]/80">
                “{AI_RECOMMENDATION}”
              </p>
            </div>

            <div ref={loop.ref} className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
                  <Repeat size={13} /> Yopiq learning loop
                </p>
                <ResumeButton manual={loop.manual} onResume={loop.resume} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {LEARNING_LOOP.map((l, i) => (
                  <span key={l} className="flex items-center gap-2">
                    <button type="button" onClick={() => loop.select(i)}>
                      <Chip active={i === loop.index}>{l}</Chip>
                    </button>
                    {i < LEARNING_LOOP.length - 1 && <Arrow />}
                  </span>
                ))}
                <span aria-hidden className="u-font-mono text-sm text-[#0EBE15]">
                  ↻
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================== */
/* 08 — Sertifikat va global                                           */
/* ================================================================== */

function CertificateDemo() {
  const [verified, setVerified] = useState(false);
  return (
    <div>
      <CertificateCard verified={verified} />
      <button
        type="button"
        onClick={() => setVerified((v) => !v)}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0EBE15] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[#03ba09] hover:text-white"
      >
        <QrCode size={16} />
        {verified ? "Qayta tekshirish" : "QR orqali tekshirish"}
      </button>
      <p className="mt-2 text-xs text-[var(--ink)]/55">
        QR kod orqali uchinchi tomon sertifikatning haqiqiyligini tekshirishi
        mumkin.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {CERT_FIELDS.map((f) => (
          <Chip key={f}>{f}</Chip>
        ))}
      </div>
    </div>
  );
}

function RingsMap() {
  const s = useStepper<HTMLDivElement>(EXPANSION.length, 1800);
  const cx = 200;
  const cy = 200;
  const r0 = 38;
  const band = 142 / (EXPANSION.length - 1);
  const radii = EXPANSION.map((_, i) => r0 + i * band);

  return (
    <div ref={s.ref}>
      <div className="mb-3 flex items-center justify-between">
        <Eyebrow>Global platformaga aylanish</Eyebrow>
        <ResumeButton manual={s.manual} onResume={s.resume} />
      </div>
      <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-md">
        {[...EXPANSION.keys()].reverse().map((i) => {
          const on = i <= s.index;
          return (
            <circle
              key={EXPANSION[i]}
              cx={cx}
              cy={cy}
              r={radii[i]}
              fill="#0EBE15"
              fillOpacity={on ? 0.08 + (i / EXPANSION.length) * 0.1 : 0.02}
              stroke="#0EBE15"
              strokeOpacity={i === s.index ? 1 : 0.3}
              strokeWidth={i === s.index ? 2.5 : 1}
              style={{ transition: "all .6s ease", cursor: "pointer" }}
              onClick={() => s.select(i)}
            />
          );
        })}
        {EXPANSION.map((name, i) => {
          const y = i === 0 ? cy + 4 : cy - (radii[i - 1] + radii[i]) / 2 + 4;
          const active = i === s.index;
          return (
            <text
              key={name}
              x={cx}
              y={y}
              textAnchor="middle"
              fontSize={i === 0 ? 11 : 10.5}
              fontWeight={active ? 700 : 500}
              fill="#101826"
              fillOpacity={active ? 1 : 0.5}
              style={{ pointerEvents: "none", transition: "all .4s" }}
            >
              {name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export function CertGlobalSection() {
  return (
    <Section id="sertifikat-global">
      <SectionHead
        no="08"
        eyebrow="Ishonch va miqyos"
        title="Tekshiriladigan sertifikat va global miqyos"
        intro="Har bir tegishli kurs yoki imtihon yakunida sertifikat beriladi. Platforma O'zbekistonda sinovdan o'tib, bosqichma-bosqich global bozorga chiqadi."
      />
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <CertificateDemo />
        </Reveal>
        <Reveal>
          <RingsMap />
          <div className="mt-6">
            <Eyebrow>Global bosqichda rivojlantiriladi</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {GLOBAL_CAPS.map((g) => (
                <Chip key={g}>{g}</Chip>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================== */
/* 09 — Ekotizim                                                       */
/* ================================================================== */

function EcosystemLoop() {
  const s = useStepper<HTMLDivElement>(ECOSYSTEM.length, 1800);
  const n = ECOSYSTEM.length;

  return (
    <div ref={s.ref} className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#101826" strokeOpacity="0.12" strokeDasharray="1.5 1.5" />
          <circle cx="50" cy="50" r="26" fill="#0EBE15" fillOpacity="0.06" />
        </svg>

        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `rotate(${(s.index / n) * 360}deg)` }}
          aria-hidden
        >
          <span className="absolute left-1/2 top-[12%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EBE15] shadow-[0_0_14px_#0EBE15]" />
        </div>

        {ECOSYSTEM.map((label, i) => {
          const a = (i / n) * 2 * Math.PI - Math.PI / 2;
          const active = i === s.index;
          return (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => s.select(i)}
              className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 u-font-mono text-xs font-semibold transition-all duration-500 sm:h-10 sm:w-10 ${
                active
                  ? "scale-125 border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)] shadow-lg shadow-[#0EBE15]/40"
                  : i < s.index
                    ? "border-[#0EBE15]/60 bg-white text-[#0EBE15]"
                    : "border-[var(--ink)]/15 bg-white text-[var(--ink)]/45"
              }`}
              style={{
                left: `${50 + 38 * Math.cos(a)}%`,
                top: `${50 + 38 * Math.sin(a)}%`,
              }}
            >
              {i + 1}
            </button>
          );
        })}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[22%] text-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0EBE15] u-font-display text-sm font-bold text-[var(--ink)]">
            U
          </span>
          <p className="mt-2 u-font-display text-sm font-bold text-[var(--ink)]">
            USTUVON
          </p>
          <p key={s.index} className="demo-fade mt-1 text-xs font-medium leading-tight text-[#0EBE15] sm:text-sm">
            {ECOSYSTEM[s.index]}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <Eyebrow>Yakuniy mahsulot konsepsiyasi</Eyebrow>
          <ResumeButton manual={s.manual} onResume={s.resume} />
        </div>
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {ECOSYSTEM.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => s.select(i)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  i === s.index
                    ? "border-[#0EBE15] bg-[#0EBE15]/10 font-semibold text-[var(--ink)]"
                    : "border-transparent text-[var(--ink)]/65 hover:bg-[var(--ink)]/5"
                }`}
              >
                <span className="u-font-mono text-xs font-semibold text-[#0EBE15]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
                {i < s.index && <Check size={14} className="ml-auto text-[#0EBE15]" />}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function EcosystemSection() {
  return (
    <Section id="ekotizim" tone="tint">
      <SectionHead
        no="09"
        eyebrow="Yakuniy konsepsiya"
        title="Kurs platformasi ham, test sayti ham emas — to'liq ekotizim"
        intro="USTUVON oddiy online kurs platformasi yoki oddiy test sayti bo'lishni maqsad qilmaydi. U o'rganishdan kasbiy rivojlanishgacha bo'lgan yo'lni yagona tizimda birlashtiradi."
      />
      <EcosystemLoop />

      <Reveal className="mt-16">
        <Eyebrow>USTUVONning asosiy texnologik ustunligi</Eyebrow>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {ADVANTAGE.map((a, i) => (
            <span key={a} className="flex items-center gap-3">
              <span className="rounded-lg border border-[var(--ink)]/10 bg-white px-4 py-3 u-font-display text-sm font-semibold text-[var(--ink)] shadow-sm">
                {a}
              </span>
              {i < ADVANTAGE.length - 1 && (
                <span className="u-font-mono text-lg text-[#0EBE15]">+</span>
              )}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="u-font-display text-3xl font-bold text-[var(--ink)] md:text-4xl">
          Ta'limning <span className="text-[#0EBE15]">yagona tizimi</span>ni
          birga quramiz
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-lg bg-[#0EBE15] px-8 py-3.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[#03ba09] hover:text-white"
          >
            Platformani sinab ko'rish
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-[var(--ink)]/15 px-8 py-3.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]/30"
          >
            Bosh sahifa
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

export function DemoFooter() {
  return (
    <footer className="border-t border-[var(--ink)]/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-[var(--ink)]/40 sm:flex-row md:px-8">
        <span>© {new Date().getFullYear()} Ustuvon. Barcha huquqlar himoyalangan.</span>
        <span className="u-font-mono">← → tugmalari bilan bo'limlar orasida yuring</span>
      </div>
    </footer>
  );
}
