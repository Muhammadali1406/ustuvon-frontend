import { Link } from "react-router-dom";
import type { Subject } from "../hook/types";

export function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F]">
        {icon}
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export function percentTone(percent: number) {
  if (percent >= 80) return "text-emerald-600";
  if (percent >= 50) return "text-amber-600";
  return "text-rose-600";
}

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Link
      to="/app/subjects"
      className="group rounded-xl border border-black/8 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/40 hover:shadow-md hover:shadow-[#0EBE15]/10"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F] transition-colors group-hover:bg-[#0EBE15] group-hover:text-white">
        <Icon size={18} />
      </span>
      <p className="mt-3 text-sm font-semibold text-slate-900">
        {subject.name}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">{subject.category}</p>
      <p className="mt-2 text-xs font-medium text-[#0B8E0F]">
        {subject.testCount} ta test
      </p>
    </Link>
  );
}
