import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileQuestion,
  ShieldAlert,
} from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { TEST_VARIANTS } from "@/widgets/user-subject/hook/test-data";
import TestNotFound from "@/widgets/test-rule/ui/not-found-test";
import {
  RULES,
  type PlaybackStatus,
} from "@/widgets/test-rule/hook/test-rule-data";

export default function TestRules() {
  const [truthRule, setTruthRule] = useState(false);
  const { subjectId, testId } = useParams<{
    subjectId: string;
    testId: string;
  }>();
  const navigate = useNavigate();

  const subject = SUBJECT_CATALOG.find((s) => s.id === subjectId);
  const variant = subjectId
    ? TEST_VARIANTS[subjectId]?.find((v) => v.id === testId)
    : undefined;
  const [activeRuleIndex, setActiveRuleIndex] = useState(-1);

  if (!subject || !variant) {
    return <TestNotFound />;
  }

  return (
    <div className="space-y-6">
      <Link
        to={`/app/subjects/${subject.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={14} />
        {subject.name}ga qaytish
      </Link>

      {/* Test meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-black/8 bg-white p-5">
        <div>
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {subject.category}
          </span>
          <h1 className="mt-1.5 text-lg font-semibold text-slate-900">
            {subject.name} — {variant.title}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FileQuestion size={13} />
            {variant.questionCount} ta savol
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {variant.durationMinutes} daqiqa
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Rules list */}
        <div className="rounded-xl border border-black/8 bg-white p-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-[#0B8E0F]" />
            <p className="text-sm font-semibold text-slate-900">
              Test qoidalari
            </p>
          </div>

          <ol className="mt-4 space-y-3">
            {RULES.map((rule, index) => {
              const isActive =
                status === "playing" && index === activeRuleIndex;
              const isRead =
                status === "finished" ||
                activeRuleIndex > index ||
                (status === "paused" && index < activeRuleIndex);

              return (
                <li
                  key={rule}
                  className={`flex items-start gap-3 rounded-lg border px-3.5 py-3 text-sm leading-relaxed transition-colors duration-300 ${
                    isActive
                      ? "border-[#0EBE15]/50 bg-[#E7F8E8] text-slate-800"
                      : isRead
                        ? "border-black/5 bg-white text-slate-500"
                        : "border-black/5 bg-white text-slate-700"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      isRead || isActive
                        ? "bg-[#0EBE15] text-[#101826]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isRead && !isActive ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  {rule}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Player card */}
        <div className="h-fit space-y-4 rounded-xl border border-black/8 bg-white p-5 lg:sticky lg:top-24">
          <div className="border-t border-black/5 pt-4">
            <button
              type="button"
              disabled={!truthRule}
              onClick={() =>
                navigate(`/app/subjects/${subject.id}/tests/${variant.id}/run`)
              }
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                truthRule
                  ? "bg-[#0EBE15] text-[#101826] hover:bg-[#09720C] hover:text-white"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              Testni boshlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
