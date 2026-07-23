import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; direction: "up" | "down" };
  icon: ReactNode;
}

export function StatCard({ label, value, delta, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1A5FA8]/10 text-[#1A5FA8]">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      {delta && (
        <p
          className={`mt-1 flex items-center gap-1 text-xs font-medium ${
            delta.direction === "up" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {delta.direction === "up" ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {delta.value}
          <span className="font-normal text-slate-400">
            kechagi kunga nisbatan
          </span>
        </p>
      )}
    </div>
  );
}
