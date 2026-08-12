import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { buildActivity } from "./build";
import { useMemo } from "react";
import {
  activityIcon,
  activityIconTone,
} from "./activity-confident-quick-metric";

export default function RecentActivity() {
  const activity = useMemo(buildActivity, []);
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">So'nggi faoliyat</p>
        <Link
          to="/admin/statistics"
          className="flex items-center gap-1 text-xs font-medium text-[#1A5FA8] hover:underline"
        >
          Statistikaga o'tish
          <ArrowRight size={12} />
        </Link>
      </div>

      <ul className="space-y-4">
        {activity.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityIconTone(
                item.type,
              )}`}
            >
              {activityIcon(item.type)}
            </span>
            <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <p className="truncate text-sm text-slate-800">{item.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">
                {item.meta} · {item.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
