import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function AnswerSheetMockup() {
  const options = [
    { letter: "A", text: "3", filled: false },
    { letter: "B", text: "5", filled: true },
    { letter: "C", text: "7", filled: false },
    { letter: "D", text: "10", filled: false },
  ];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -top-4 right-6 z-10 flex items-center gap-1.5 rounded-full bg-[var(--ink)] px-3 py-1.5 u-font-mono text-xs font-medium text-white shadow-lg">
        <Clock size={12} />
        14:32
      </div>

      <div className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
          Milliy Sertifikat · Matematika
        </p>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink)]">
          17-savol. Agar 3x + 5 = 20 bo'lsa, x ning qiymati nechaga teng?
        </p>

        <div className="mt-4 space-y-2">
          {options.map((opt) => (
            <div
              key={opt.letter}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                opt.filled
                  ? "border-[#0EBE15] bg-[#0EBE15]/10 text-[#0EBE15]"
                  : "border-[var(--ink)]/10 text-[var(--ink)]/70"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                  opt.filled
                    ? "bubble-fill border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)]"
                    : "border-[var(--ink)]/25 text-[var(--ink)]/40"
                }`}
              >
                {opt.letter}
              </span>
              {opt.text}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-8 -left-8 hidden w-44 rounded-xl border border-[var(--ink)]/10 bg-white p-4 shadow-xl shadow-[var(--ink)]/10 sm:block">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--ink)]/40">
          Natija
        </p>
        <p className="mt-1 u-font-mono text-2xl font-semibold text-[var(--success)]">
          87%
        </p>
        <p className="mt-0.5 text-[11px] text-[var(--ink)]/50">
          26 / 30 to'g'ri javob
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0EBE15]/20 bg-[#0EBE15]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
            DTM · IELTS · Milliy Sertifikat · SAT
          </span>
 
          <h1 className="mt-5 u-font-display text-4xl font-bold leading-[1.08] tracking-tight text-[var(--ink)] md:text-5xl">
            Imtihon kuni <span className="text-[#0EBE15]">kutilmagan</span>{" "}
            narsa bo'lmasin
          </h1>
 
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--ink)]/65">
            Rasmiy manbalar asosida tuzilgan testlarni haqiqiy imtihon
            sharoitida ishlang, natijangizni darhol ko'ring va har bir
            urinishda qanday o'sib borayotganingizni kuzating.
          </p>
 
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-[#0EBE15] px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm shadow-[var(--brand)]/25 transition-colors hover:bg-[#03ba09] hover:text-white"
            >
              Bepul boshlash
            </Link>
            <a
              href="#fanlar"
              className="rounded-lg border border-[var(--ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]/30"
            >
              Fanlarni ko'rish
            </a>
          </div>
 
          <div className="mt-10 flex items-center gap-6 border-t border-[var(--ink)]/10 pt-6 text-sm text-[var(--ink)]/70">
            <div>
              <span className="u-font-mono text-lg font-semibold text-[var(--ink)]">
                17
              </span>{" "}
              foydalanuvchi
            </div>
            <div className="h-8 w-px bg-[var(--ink)]/10" />
            <div>
              <span className="u-font-mono text-lg font-semibold text-[var(--ink)]">
                350+
              </span>{" "}
              ishlangan test
            </div>
          </div>
        </div>
 
        <AnswerSheetMockup />
      </div>
    </section>
  );
}