import { useMemo } from "react";
import { buildReviewQueue } from "./build";
import { ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { confidenceTone } from "./activity-confident-quick-metric";


export default function AiReview() {
    const reviewQueue = useMemo(buildReviewQueue, []);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bot size={16} className="text-[#1A5FA8]" />
              <p className="text-sm font-medium text-slate-700">
                AI tekshiruvini kutayotgan testlar
              </p>
            </div>
            <ul className="space-y-3">
              {reviewQueue.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-slate-100 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {item.subject}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.questionsCount} ta savol · {item.uploadedAt}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${confidenceTone(
                      item.confidence,
                    )}`}
                  >
                    {item.confidence}%
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/admin/tests"
              className="mt-4 flex items-center justify-center gap-1 rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Barchasini tekshirish
              <ArrowRight size={12} />
            </Link>
          </div>
  )
}
