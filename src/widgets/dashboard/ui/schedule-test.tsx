import { Bot, CalendarClock } from "lucide-react";
import { useMemo } from "react";
import { buildScheduledTests } from "./build";

export default function ScheduleTest() {
  const scheduledTests = useMemo(buildScheduledTests, []);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock size={16} className="text-[#1A5FA8]" />
        <p className="text-sm font-medium text-slate-700">
          Rejalashtirilgan testlar
        </p>
      </div>
      <ul className="space-y-3">
        {scheduledTests.map((test) => (
          <li key={test.id} className="rounded-md border border-slate-100 p-3">
            <p className="text-sm font-medium text-slate-800">{test.subject}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {test.date} · {test.audience}
            </p>
            <span
              className={`mt-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                test.botNotified
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <Bot size={11} />
              {test.botNotified
                ? "Bot orqali e'lon qilindi"
                : "Bot xabari kutilmoqda"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
