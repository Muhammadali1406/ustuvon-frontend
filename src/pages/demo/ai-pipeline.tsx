import { Check, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { ADMIN_FLOW, AI_PIPELINE, EXAM_FORMATS } from "./demo-data";
import { useStepper } from "./demo-hooks";
import { Card, Chip, Eyebrow, ResumeButton, StepProgress } from "./demo-ui";

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

export function AiPipeline() {
  const s = useStepper<HTMLDivElement>(AI_PIPELINE.length, 2600);
  return (
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
  );
}

export function AdminFlowCard() {
  return (
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
  );
}

export function ReviewCallout() {
  return (
    <div className="h-full rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-5">
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
  );
}

export function ExamFormatsCard() {
  return (
    <Card>
      <Eyebrow>Kelajak: har bir imtihon uchun alohida format va qoidalar</Eyebrow>
      <div className="mt-4 flex flex-wrap gap-2">
        {EXAM_FORMATS.map((f) => (
          <Chip key={f}>{f}</Chip>
        ))}
      </div>
    </Card>
  );
}
