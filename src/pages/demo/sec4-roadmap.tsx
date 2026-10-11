import { Check } from "lucide-react";
import { EXPANSION_AFTER_UZ, LANGUAGES, MVP_GROUPS, PROTOTYPE_AI_FLOW, PROTOTYPE_PAGES } from "./demo-data";
import { useStepper } from "./demo-hooks";
import { Chip, Eyebrow, FlowChain, ResumeButton, Section, SectionHead, StepProgress } from "./demo-ui";

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
    <Section id="yol-xaritasi">
      <SectionHead
        no="04"
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
