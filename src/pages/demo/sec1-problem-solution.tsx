import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ShieldCheck, X } from "lucide-react";
import { Reveal } from "../landing/reveal";
import { EXAM_ENV, FRAGMENTS, PROBLEMS } from "./demo-data";
import { scrollToSection, useInView } from "./demo-hooks";
import { Section, SectionHead, SubHead, SubNav } from "./demo-ui";
import { AdminFlowCard, ReviewCallout } from "./ai-pipeline";
import { Journey } from "./journey";

export function FragmentDemo() {
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

function Bridge() {
  return (
    <Reveal className="my-16 flex flex-col items-center">
      <span className="h-10 w-px bg-gradient-to-b from-transparent to-[#0EBE15]" />
      <span className="flex items-center gap-2 rounded-full bg-[#0EBE15] py-2 pl-2 pr-5 u-font-display text-sm font-bold text-[var(--ink)] shadow-lg shadow-[#0EBE15]/25">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--ink)] text-xs text-white">
          U
        </span>
        USTUVON
      </span>
      <ArrowDown size={18} className="mt-2 text-[#0EBE15]" />
    </Reveal>
  );
}

export function ProblemSolutionSection() {
  return (
    <Section id="muammo-yechim">
      <SectionHead
        no="01"
        eyebrow="Muammo → Yechim"
        title="Uzilgan jarayondan yagona tizimgacha"
        intro="Online ta'lim bozori tez rivojlanayotgan bo'lsa-da, ta'lim olish, bilimni tekshirish va natijani baholash jarayonlari ko'plab platformalarda bir-biridan ajratilgan. USTUVON ularni bitta platformada birlashtiradi."
      />
      <SubNav
        items={[
          { id: "muammo", no: "1.1", label: "Muammo" },
          { id: "yechim", no: "1.2", label: "Yechim" },
        ]}
      />

      <SubHead
        first
        id="muammo"
        no="1.1"
        title="Muammo"
        text="Bugungi kunda quyidagi asosiy muammolar mavjud:"
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

      <Bridge />

      <SubHead
        first
        id="yechim"
        no="1.2"
        title="Yechim"
        text="USTUVON — online ta'lim, professional test, AI asosidagi test yaratish, real imtihon simulyatsiyasi, natijalarni tahlil qilish va sertifikatlashni yagona platformaga birlashtiruvchi global EdTech tizim. Dastlabki asosiy yo'nalish — professional test va real imtihon muhiti."
      />
      <Journey />

      <Reveal className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
          Real imtihon muhiti
        </p>
        <h4 className="mt-2 u-font-display text-xl font-bold text-[var(--ink)] md:text-2xl">
          USTUVON oddiy test platformasi emas
        </h4>
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

      <Reveal className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
          AI Test Generator
        </p>
        <h4 className="mt-2 u-font-display text-xl font-bold text-[var(--ink)] md:text-2xl">
          USTUVONning asosiy texnologik imkoniyatlaridan biri
        </h4>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink)]/60">
          Administrator PDF, Word yoki Excel'dagi testni yuklaydi — AI uni
          online imtihonga aylantiradi, administrator esa tekshirib tasdiqlaydi.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AdminFlowCard />
          <ReviewCallout />
        </div>
        <button
          type="button"
          onClick={() => scrollToSection("ai-vositalari")}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EBE15] transition-colors hover:text-[#03ba09]"
        >
          Jarayonni jonli ko'rish (5.3) <ArrowRight size={14} />
        </button>
      </Reveal>
    </Section>
  );
}
