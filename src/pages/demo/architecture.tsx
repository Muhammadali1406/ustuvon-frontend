import { ArrowDown, Check } from "lucide-react";
import { ARCH_DETAILS, ARCH_LAYERS, ENGINE_DUTIES, EXAM_TREE, TECH_STACK } from "./demo-data";
import { useInView, useStepper } from "./demo-hooks";
import { Card, Chip, Eyebrow, ResumeButton, StepProgress } from "./demo-ui";

export function ExamTree() {
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

export function TechStack() {
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

export function ArchitectureExplorer() {
  const s = useStepper<HTMLDivElement>(ARCH_LAYERS.length, 3000);
  const layer = ARCH_LAYERS[s.index];
  const detail = ARCH_DETAILS[layer];

  return (
    <div ref={s.ref} className="grid items-start gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
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
                  className={`relative flex w-full items-center justify-between overflow-hidden rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
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

      <div className="space-y-6 lg:col-span-3">
        <div className="rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
          <div className="relative mb-5 flex items-center justify-between gap-3 pb-4">
            <p className="u-font-display text-lg font-bold text-[var(--ink)]">
              {layer}
            </p>
            <span className="rounded-full bg-[var(--ink)]/5 px-2.5 py-1 u-font-mono text-[11px] font-medium text-[var(--ink)]/50">
              qatlam {s.index + 1}/{ARCH_LAYERS.length}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--ink)]/10" />
            <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
          </div>
          <div key={s.index} className="demo-fade min-h-[7.5rem]">
            <p className="text-sm leading-relaxed text-[var(--ink)]/70">
              {detail.text}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {detail.tech.map((t) => (
                <Chip key={t} active>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}
