import { ArrowRight, Check, Play, Sparkles } from "lucide-react";
import { CHAIN, DIRECTIONS, LANGUAGES, MARKET_PATH } from "./demo-data";
import { scrollToSection, useStepper } from "./demo-hooks";
import { Chip, Eyebrow } from "./demo-ui";

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

      <div className="absolute -bottom-28 -left-8 hidden w-44 rounded-xl border border-[var(--ink)]/10 bg-white p-4 shadow-xl shadow-[var(--ink)]/10 sm:block">
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
              onClick={() => scrollToSection("muammo-yechim")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0EBE15] px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm shadow-[var(--brand)]/25 transition-colors hover:bg-[#03ba09] hover:text-white"
            >
              Taqdimotni boshlash <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("demo-video")}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--ink)]/15 px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]/30"
            >
              <Play size={14} /> Demo-videoni ko'rish
            </button>
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
