import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Lightbulb,
  Loader2,
  MinusCircle,
  RefreshCw,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import type { AiItemStatus, AiReviewItem, AiReviewReport } from "./ai-review-types";
import type { AiReviewState } from "./useAiReview";

const LOADING_STEPS = [
  "Javoblaringiz tekshirilmoqda...",
  "Xatolar sabablari tahlil qilinmoqda...",
  "Tushuntirishlar va tavsiyalar tayyorlanmoqda...",
];

type Filter = "all" | AiItemStatus;

const STATUS_STYLE: Record<AiItemStatus, { badge: string; label: string }> = {
  correct: { badge: "bg-[#E7F8E8] text-[#0B8E0F]", label: "To'g'ri" },
  incorrect: { badge: "bg-[#B3423B]/10 text-[#B3423B]", label: "Noto'g'ri" },
  skipped: { badge: "bg-slate-100 text-slate-500", label: "Javobsiz" },
};

function StatusIcon({ status, size = 18 }: { status: AiItemStatus; size?: number }) {
  if (status === "correct") return <CheckCircle2 size={size} className="shrink-0 text-[#0B8E0F]" />;
  if (status === "incorrect") return <XCircle size={size} className="shrink-0 text-[#B3423B]" />;
  return <MinusCircle size={size} className="shrink-0 text-slate-400" />;
}

/* ------------------------------------------------------------------ */
/* Idle: the button                                                    */
/* ------------------------------------------------------------------ */
function AnalyzeButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-8 w-full">
      <button
        onClick={onClick}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B8E0F]/30 bg-[#E7F8E8] px-6 py-3 text-sm font-semibold text-[#0B8E0F] transition hover:border-[#0B8E0F] hover:bg-[#d9f2db]"
      >
        <Sparkles size={16} className="transition group-hover:rotate-12" />
        AI bilan tahlil qilish
      </button>
      <p className="mt-2 text-xs text-slate-400">
        Har bir javobingiz nima uchun to'g'ri yoki noto'g'ri ekanini tushuntirib beramiz.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */
function LoadingCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-8 flex w-full flex-col items-center rounded-2xl border border-[#0B8E0F]/20 bg-[#F4FBF4] px-6 py-8"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F8E8] text-[#0B8E0F]">
        <Sparkles size={20} className="animate-pulse" />
        <Loader2 size={48} strokeWidth={1.25} className="absolute animate-spin text-[#0B8E0F]/40" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-900">{LOADING_STEPS[step]}</p>
      <p className="mt-1 text-xs text-slate-500">Bu 10-40 soniya vaqt olishi mumkin. Sahifani yopmang.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Error                                                               */
/* ------------------------------------------------------------------ */
function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mt-8 flex w-full flex-col items-center rounded-2xl border border-[#B3423B]/20 bg-[#B3423B]/5 px-6 py-6">
      <AlertCircle size={24} className="text-[#B3423B]" />
      <p className="mt-2 text-sm font-medium text-[#B3423B]">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0B8E0F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#097a0c]"
      >
        <RefreshCw size={14} />
        Qayta urinish
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */
function BulletList({ items, tone }: { items: string[]; tone: "good" | "bad" }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2 text-sm text-slate-700">
          {tone === "good" ? (
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#0B8E0F]" />
          ) : (
            <Target size={15} className="mt-0.5 shrink-0 text-[#B3423B]" />
          )}
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function SummaryCard({ report }: { report: AiReviewReport }) {
  const { summary, score } = report;
  return (
    <div className="rounded-2xl border border-[#0B8E0F]/20 bg-[#F4FBF4] p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F8E8] text-[#0B8E0F]">
            <Sparkles size={16} />
          </span>
          <h2 className="text-base font-semibold text-slate-900">AI tahlil</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
          {score.correct} / {score.total} to'g'ri
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">{summary.overall_feedback}</p>

      {(summary.strengths.length > 0 || summary.weak_areas.length > 0) && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {summary.strengths.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0B8E0F]">Kuchli tomonlar</p>
              <BulletList items={summary.strengths} tone="good" />
            </div>
          )}
          {summary.weak_areas.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#B3423B]">Yaxshilash kerak</p>
              <BulletList items={summary.weak_areas} tone="bad" />
            </div>
          )}
        </div>
      )}

      {summary.study_plan.length > 0 && (
        <div className="mt-5 border-t border-[#0B8E0F]/15 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">O'qish rejasi</p>
          <ol className="mt-2 flex flex-col gap-2">
            {summary.study_plan.map((step, index) => (
              <li key={step} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0B8E0F] text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function OptionRow({ option }: { option: AiReviewItem["options"][number] }) {
  const wrongPick = option.is_selected && !option.is_correct;
  const tone = option.is_correct
    ? "border-[#0B8E0F] bg-[#E7F8E8] text-[#0B8E0F]"
    : wrongPick
      ? "border-[#B3423B]/60 bg-[#B3423B]/5 text-[#B3423B]"
      : "border-slate-200 text-slate-600";
  const tag = option.is_selected && option.is_correct
    ? "Sizning javobingiz · To'g'ri"
    : option.is_correct
      ? "To'g'ri javob"
      : wrongPick
        ? "Sizning javobingiz"
        : null;

  return (
    <div className={`flex items-start justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${tone}`}>
      <span>{option.text}</span>
      {tag && <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide">{tag}</span>}
    </div>
  );
}

function ItemCard({ item }: { item: AiReviewItem }) {
  const [open, setOpen] = useState(item.status !== "correct");
  const style = STATUS_STYLE[item.status];

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 p-4 text-left"
      >
        <StatusIcon status={item.status} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-400">{item.n}-savol</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${style.badge}`}>{style.label}</span>
            {item.concept && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                {item.concept}
              </span>
            )}
          </div>
          <p className={`mt-1 text-sm font-medium text-slate-900 ${open ? "" : "line-clamp-2"}`}>{item.question}</p>
        </div>
        <ChevronDown size={16} className={`mt-1 shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="flex flex-col gap-4 border-t border-slate-100 p-4 pt-4">
          <div className="flex flex-col gap-1.5">
            {item.options.map((option) => (
              <OptionRow key={option.id} option={option} />
            ))}
          </div>

          <p className="text-sm leading-relaxed text-slate-700">{item.explanation}</p>

          {item.better_version && (
            <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
              <Lightbulb size={16} className="mt-0.5 shrink-0 text-[#0B8E0F]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Yaxshiroq variant</p>
                <p className="mt-0.5 text-sm text-slate-700">{item.better_version}</p>
              </div>
            </div>
          )}

          {item.resources.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Batafsil o'qish</p>
              <div className="mt-1.5 flex flex-col gap-1">
                {item.resources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
                  >
                    <ExternalLink size={13} className="shrink-0" />
                    <span className="truncate">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {!item.ai_generated && (
            <p className="text-xs text-slate-400">Bu savol uchun AI izohi tayyorlanmadi.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ReportView({ report }: { report: AiReviewReport }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: report.items.length,
      incorrect: report.items.filter((i) => i.status === "incorrect").length,
      skipped: report.items.filter((i) => i.status === "skipped").length,
      correct: report.items.filter((i) => i.status === "correct").length,
    }),
    [report.items],
  );

  const visible = filter === "all" ? report.items : report.items.filter((i) => i.status === filter);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Barchasi", count: counts.all },
    { key: "incorrect", label: "Noto'g'ri", count: counts.incorrect },
    { key: "skipped", label: "Javobsiz", count: counts.skipped },
    { key: "correct", label: "To'g'ri", count: counts.correct },
  ];

  return (
    <div className="mt-8 flex w-full flex-col gap-4 text-left">
      <SummaryCard report={report} />

      <div className="flex flex-wrap gap-2">
        {tabs
          .filter((tab) => tab.key === "all" || tab.count > 0)
          .map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === tab.key ? "bg-[#0B8E0F] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label} · {tab.count}
            </button>
          ))}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((item) => (
          <ItemCard key={`${filter}-${item.question_id}`} item={item} />
        ))}
      </div>

      <p className="text-center text-xs text-slate-400">
        AI xato qilishi mumkin. Muhim mavzularni darslik bilan solishtirib ko'ring.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
export function AiReviewSection({ review }: { review: AiReviewState }) {
  if (review.status === "loading") return <LoadingCard />;
  if (review.status === "error") {
    return <ErrorCard message={review.errorMessage ?? "Xatolik yuz berdi."} onRetry={review.start} />;
  }
  if (review.status === "done" && review.report) return <ReportView report={review.report} />;
  return <AnalyzeButton onClick={review.start} />;
}
