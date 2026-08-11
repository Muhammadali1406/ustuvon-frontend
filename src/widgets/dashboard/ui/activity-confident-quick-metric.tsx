import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ActivityType } from "../hook/dahsboard-type";

export function MetricCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "default" | "warning";
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-md ${
            tone === "warning"
              ? "bg-amber-50 text-amber-600"
              : "bg-[#1A5FA8]/10 text-[#1A5FA8]"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export function QuickActionCard({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-[#1A5FA8]/40 hover:bg-[#1A5FA8]/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#1A5FA8]/10 text-[#1A5FA8]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="truncate text-sm text-slate-500">{description}</p>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1A5FA8]"
      />
    </Link>
  );
}

export function activityIcon(type: ActivityType) {
  switch (type) {
    case "registration":
      return <UserPlus size={15} />;
    case "result":
      return <FileCheck2 size={15} />;
    case "test_created":
      return <Sparkles size={15} />;
    case "payment":
      return <ClipboardList size={15} />;
  }
}

export function activityIconTone(type: ActivityType) {
  switch (type) {
    case "registration":
      return "bg-sky-50 text-sky-600";
    case "result":
      return "bg-emerald-50 text-emerald-600";
    case "test_created":
      return "bg-violet-50 text-violet-600";
    case "payment":
      return "bg-amber-50 text-amber-600";
  }
}

export function confidenceTone(confidence: number) {
  if (confidence >= 90) return "text-emerald-600 bg-emerald-50";
  if (confidence >= 80) return "text-amber-600 bg-amber-50";
  return "text-rose-600 bg-rose-50";
}
