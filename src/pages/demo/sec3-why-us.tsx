import { Fragment } from "react";
import { Check, X } from "lucide-react";
import { Reveal } from "../landing/reveal";
import { BUILDERS, CHAIN, PILLAR_MAP } from "./demo-data";
import { useStepper } from "./demo-hooks";
import { Chip, Eyebrow, ResumeButton, Section, SectionHead } from "./demo-ui";

function Pillars() {
  return (
    <Reveal>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {PILLAR_MAP.map((p, i) => (
          <Fragment key={p.name}>
            <div className="rounded-xl border border-[var(--ink)]/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/50 hover:shadow-md hover:shadow-[var(--brand)]/5">
              <p className="u-font-mono text-xs font-semibold text-[#0EBE15]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 u-font-display text-2xl font-bold text-[var(--ink)]">
                {p.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/60">
                {p.covers}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.roles.map((r) => (
                  <Chip key={r} active>
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
            {i < PILLAR_MAP.length - 1 && (
              <span
                aria-hidden
                className="hidden self-center u-font-mono text-2xl font-semibold text-[#0EBE15] lg:block"
              >
                +
              </span>
            )}
          </Fragment>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[var(--ink)]/20 px-5 py-4">
        <span className="text-sm font-semibold text-[var(--ink)]">
          Hammasini amalga oshiradi:
        </span>
        {BUILDERS.map((b) => (
          <Chip key={b}>{b}</Chip>
        ))}
      </div>
    </Reveal>
  );
}

function Staircase() {
  const s = useStepper<HTMLDivElement>(CHAIN.length, 1700);
  return (
    <div ref={s.ref} className="grid items-center gap-8 lg:grid-cols-5">
      <div className="space-y-3 lg:col-span-2">
        <Eyebrow>Bosqichma-bosqich yondashuv</Eyebrow>
        <div className="flex gap-3 rounded-xl border border-[var(--ink)]/10 bg-white/60 p-4">
          <X size={18} className="mt-0.5 shrink-0 text-[#D9480F]" />
          <p className="text-sm leading-relaxed text-[var(--ink)]/60">
            Butun dunyoga mo'ljallangan juda katta tizimni <b>birdan</b>{" "}
            yaratish o'rniga…
          </p>
        </div>
        <div className="flex gap-3 rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-4">
          <Check size={18} className="mt-0.5 shrink-0 text-[#0EBE15]" />
          <p className="text-sm leading-relaxed text-[var(--ink)]/80">
            …eng muhim muammo — <b>professional online assessment</b> — hal
            qilinadi. Keyin zanjirga yangi qatlamlar qo'shiladi.
          </p>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="mb-3 flex items-center justify-end">
          <ResumeButton manual={s.manual} onResume={s.resume} />
        </div>
        <div className="space-y-2">
          {CHAIN.map((c, i) => {
            const on = i <= s.index;
            const cur = i === s.index;
            return (
              <button
                key={c}
                type="button"
                onClick={() => s.select(i)}
                className="block w-full text-left"
              >
                <span
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-semibold transition-all duration-500 ${
                    cur
                      ? "border-[#0EBE15] bg-[#0EBE15] text-[var(--ink)] shadow-md shadow-[#0EBE15]/30"
                      : on
                        ? "border-[#0EBE15]/50 bg-[#0EBE15]/10 text-[var(--ink)]"
                        : "border-[var(--ink)]/10 bg-white text-[var(--ink)]/45"
                  }`}
                  style={{ width: `${46 + i * 10.8}%` }}
                >
                  <span className="u-font-mono text-xs">
                    {i === 0 ? "ASOS" : `+${i}`}
                  </span>
                  <span className="whitespace-nowrap">{c}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GeneratorAdvantage() {
  const s = useStepper<HTMLDivElement>(2, 2400);
  const after = s.index === 1;
  return (
    <div
      ref={s.ref}
      className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5"
    >
      <div className="flex items-center justify-between">
        <Eyebrow>Asosiy ustunlik: AI Test Generator</Eyebrow>
        <ResumeButton manual={s.manual} onResume={s.resume} />
      </div>
      <div className="mt-5 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <button
          type="button"
          onClick={() => s.select(0)}
          className={`rounded-xl border p-5 text-left transition-colors ${
            !after
              ? "border-[#0EBE15] bg-[#0EBE15]/10"
              : "border-[var(--ink)]/10"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
            Mavjud test bazalari
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["PDF", "DOCX", "XLSX", "Text"].map((f) => (
              <span
                key={f}
                className="rounded bg-[var(--ink)]/5 px-2 py-1 u-font-mono text-xs font-semibold text-[var(--ink)]/70"
              >
                {f}
              </span>
            ))}
          </div>
        </button>
        <span
          aria-hidden
          className={`text-center u-font-mono text-xl transition-colors ${
            after ? "text-[#0EBE15]" : "text-[var(--ink)]/25"
          }`}
        >
          →
        </span>
        <button
          type="button"
          onClick={() => s.select(1)}
          className={`rounded-xl border p-5 text-left transition-colors ${
            after ? "border-[#0EBE15] bg-[#0EBE15]/10" : "border-[var(--ink)]/10"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink)]/40">
            USTUVON online testlari
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
            <Check size={16} className="text-[#0EBE15]" />
            Turli imtihon formatlariga moslangan
          </p>
        </button>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-[var(--ink)]/70">
        AI Test Generator orqali mavjud test bazalarini tezlik bilan
        raqamlashtirish va turli imtihon formatlariga moslashtirish —
        platformaga <b>katta hajmdagi test kontentini tezroq kiritish</b>{" "}
        imkonini beradi.
      </p>
    </div>
  );
}

export function WhyUsSection() {
  return (
    <Section id="nega-biz" tone="tint">
      <SectionHead
        no="03"
        eyebrow="Nega aynan biz"
        title="Muammoni to'rt tomondan hal qiladigan jamoa"
        intro="USTUVON jamoasi muammoni faqat texnologik nuqtayi nazardan emas, ta'lim + baholash + AI + biznes nuqtayi nazaridan hal qilishni maqsad qiladi."
      />
      <Pillars />
      <div className="mt-16">
        <Staircase />
      </div>
      <Reveal className="mt-16">
        <GeneratorAdvantage />
      </Reveal>
    </Section>
  );
}
