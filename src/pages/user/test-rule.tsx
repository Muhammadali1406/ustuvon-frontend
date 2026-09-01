import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { RULES } from "@/widgets/test-rule/hook/test-rule-data";

export default function TestRules() {
  const [truthRule, setTruthRule] = useState(false);
  const { subjectId, testId } = useParams<{
    subjectId: string;
    testId: string;
  }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Link
        to={`/app/subjects/${subjectId}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={14} />
        Ortga qaytish
      </Link>

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
            {RULES.map((rule) => {
              return (
                <li
                  key={rule}
                  className={`flex items-start gap-3 rounded-lg border px-3.5 py-3 text-sm leading-relaxed transition-colors duration-300 border-black/5 bg-white text-slate-700`}
                >
                  {rule}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Player card */}
        <div className="h-fit space-y-4 rounded-xl border border-black/8 bg-white p-5 lg:sticky lg:top-24">
          <div>
            <input type="checkbox" onChange={() => setTruthRule(!truthRule)} />
            <p>Test qoidalari bilan tanishib chiqdim</p>
          </div>
          <div className="border-t border-black/5 pt-4">
            <button
              type="button"
              disabled={!truthRule}
              onClick={() =>
                navigate(`/app/subjects/${subjectId}/tests/${testId}/run`)
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
